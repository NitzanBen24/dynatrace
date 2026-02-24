import "server-only";

import { supabase } from "@/app/server/lib/supabase";
import type { Employee, EmployeeCreate, EmployeeUpdate } from "@/app/server/domain/employee";

const EMPLOYEES_TABLE = "employees";

export async function listEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from(EMPLOYEES_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Employee[];
}

export async function createEmployee(input: EmployeeCreate): Promise<Employee> {
  const { data, error } = await supabase
    .from(EMPLOYEES_TABLE)
    .insert(input)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Employee;
}

export async function updateEmployee(input: EmployeeUpdate): Promise<Employee> {
  const { id, ...changes } = input;

  const { data, error } = await supabase
    .from(EMPLOYEES_TABLE)
    .update(changes)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Employee;
}

export async function deleteEmployee(id: string): Promise<void> {
  const { error } = await supabase.from(EMPLOYEES_TABLE).delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
