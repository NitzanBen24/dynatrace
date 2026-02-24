import "server-only";

import { prisma } from "@/lib/prisma";
import type { Employee, EmployeeCreate, EmployeeUpdate } from "@/app/server/domain/employee";

function toEmployee(record: { id: string; name: string; status: string; created_at: Date }): Employee {
  return {
    id: record.id,
    name: record.name,
    status: record.status as Employee["status"],
    created_at: record.created_at.toISOString()
  };
}

export async function listEmployees(): Promise<Employee[]> {
  const data = await prisma.employee.findMany({
    orderBy: { created_at: "desc" }
  });

  return data.map(toEmployee);
}

export async function createEmployee(input: EmployeeCreate): Promise<Employee> {
  const data = await prisma.employee.create({
    data: {
      name: input.name,
      status: input.status
    }
  });

  return toEmployee(data);
}

export async function updateEmployee(input: EmployeeUpdate): Promise<Employee> {
  const { id, ...changes } = input;

  const data = await prisma.employee.update({
    where: { id },
    data: {
      name: changes.name,
      status: changes.status
    }
  });

  return toEmployee(data);
}

export async function deleteEmployee(id: string): Promise<void> {
  await prisma.employee.delete({ where: { id } });
}
