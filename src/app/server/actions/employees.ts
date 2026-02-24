"use server";

import { revalidatePath } from "next/cache";

import type { Employee, EmployeeCreate, EmployeeUpdate } from "@/app/server/domain/employee";
import { createEmployee, deleteEmployee, updateEmployee } from "@/app/server/repositories/employees";

function assertNonEmpty(value: string, field: string): void {
  if (!value.trim()) {
    throw new Error(`${field} is required.`);
  }
}

function withOptionalRevalidate(path?: string): void {
  if (path) {
    revalidatePath(path);
  }
}

export async function addEmployee(input: EmployeeCreate, revalidatePathname?: string): Promise<Employee> {
  assertNonEmpty(input.name, "Name");

  const employee = await createEmployee(input);
  withOptionalRevalidate(revalidatePathname);
  return employee;
}

export async function updateEmployeeAction(
  input: EmployeeUpdate,
  revalidatePathname?: string
): Promise<Employee> {
  assertNonEmpty(input.id, "Employee id");

  const employee = await updateEmployee(input);
  withOptionalRevalidate(revalidatePathname);
  return employee;
}

export async function deleteEmployeeAction(id: string, revalidatePathname?: string): Promise<void> {
  assertNonEmpty(id, "Employee id");

  await deleteEmployee(id);
  withOptionalRevalidate(revalidatePathname);
}
