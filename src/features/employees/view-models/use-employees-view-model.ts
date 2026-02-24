"use client";

import { useMemo } from "react";

import type { EmployeeCreate, EmployeeStatus, EmployeeUpdate } from "../types";
import { useAddEmployee } from "../hooks/use-add-employee";
import { useDeleteEmployee } from "../hooks/use-delete-employee";
import { useEmployees } from "../hooks/use-employees";
import { useUpdateEmployee } from "../hooks/use-update-employee";

const STATUS_ORDER: EmployeeStatus[] = ["Working", "OnVacation", "LunchTime", "BusinessTrip"];

export function useEmployeesViewModel() {
  const employeesQuery = useEmployees();
  const addMutation = useAddEmployee();
  const updateMutation = useUpdateEmployee();
  const deleteMutation = useDeleteEmployee();

  const employees = useMemo(() => {
    const list = employeesQuery.data ?? [];
    return [...list].sort((a, b) => {
      const aIndex = STATUS_ORDER.indexOf(a.status);
      const bIndex = STATUS_ORDER.indexOf(b.status);
      if (aIndex !== bIndex) return aIndex - bIndex;
      return a.name.localeCompare(b.name);
    });
  }, [employeesQuery.data]);

  return {
    employees,
    isLoading: employeesQuery.isLoading,
    error: employeesQuery.error,
    isMutating: addMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    addEmployee: (input: EmployeeCreate) => addMutation.mutateAsync(input),
    updateEmployee: (input: EmployeeUpdate) => updateMutation.mutateAsync(input),
    deleteEmployee: (id: string) => deleteMutation.mutateAsync(id),
    refetch: () => employeesQuery.refetch()
  };
}
