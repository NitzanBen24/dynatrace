import { NextResponse } from "next/server";

import type { EmployeeStatus } from "@/app/server/domain/employee";
import { deleteEmployeeAction, updateEmployeeAction } from "@/app/server/actions/employees";

const ALLOWED_STATUSES: EmployeeStatus[] = ["Working", "OnVacation", "LunchTime", "BusinessTrip"];

function isEmployeeStatus(value: unknown): value is EmployeeStatus {
  return typeof value === "string" && ALLOWED_STATUSES.includes(value as EmployeeStatus);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = (await request.json()) as {
      name?: string;
      status?: EmployeeStatus;
    };

    if (!params.id) {
      return NextResponse.json({ error: "Employee id is required." }, { status: 400 });
    }

    if (body.status && !isEmployeeStatus(body.status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    if (!body.name && !body.status) {
      return NextResponse.json({ error: "No changes provided." }, { status: 400 });
    }

    const employee = await updateEmployeeAction({
      id: params.id,
      name: body.name,
      status: body.status
    });

    return NextResponse.json({ data: employee });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: "Employee id is required." }, { status: 400 });
    }

    await deleteEmployeeAction(params.id);

    return NextResponse.json({ data: { id: params.id } });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
