import { apiFetch } from "@/lib/http";

import type { Employee, EmployeeCreate, EmployeeUpdate } from "../types";

const BASE_URL = "/api/employees";

export function getEmployees() {
  return apiFetch<Employee[]>(BASE_URL);
}

export function addEmployee(input: EmployeeCreate) {
  return apiFetch<Employee>(BASE_URL, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function updateEmployee(input: EmployeeUpdate) {
  return apiFetch<Employee>(`${BASE_URL}/${input.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: input.name,
      status: input.status
    })
  });
}

export function deleteEmployee(id: string) {
  return apiFetch<{ id: string }>(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
}
