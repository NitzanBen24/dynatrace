import { NextResponse } from "next/server";

import type { EmployeeCreate, EmployeeStatus } from "@/app/server/domain/employee";
import { addEmployee } from "@/app/server/actions/employees";
import { listEmployees } from "@/app/server/repositories/employees";

const ALLOWED_STATUSES: EmployeeStatus[] = ["Working", "OnVacation", "LunchTime", "BusinessTrip"];

function isEmployeeStatus(value: unknown): value is EmployeeStatus {
  return typeof value === "string" && ALLOWED_STATUSES.includes(value as EmployeeStatus);
}

export async function GET() {
  try {
    const employees = await listEmployees();
    return NextResponse.json({ data: employees });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<EmployeeCreate>;

    if (!body?.name || !body?.status) {
      return NextResponse.json({ error: "name and status are required." }, { status: 400 });
    }

    if (!isEmployeeStatus(body.status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    const employee = await addEmployee({
      name: body.name,
      status: body.status
    });

    return NextResponse.json({ data: employee }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
