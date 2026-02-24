"use client";

import { useState } from "react";

import type { Employee, EmployeeStatus } from "../types";
import { useEmployeesContext } from "../context/employees-context";
import { EmployeeCard } from "./employee-card";
import { EmployeeModal } from "./employee-modal";

export function EmployeesDashboard() {
  const { employees, isLoading, error, isMutating, addEmployee, updateEmployee, deleteEmployee } =
    useEmployeesContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const total = employees.length;

  function openCreateModal() {
    setMode("create");
    setActiveEmployee(null);
    setLocalError(null);
    setIsModalOpen(true);
  }

  function openEditModal(employee: Employee) {
    setMode("edit");
    setActiveEmployee(employee);
    setLocalError(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  async function handleSubmit(values: { name: string; status: EmployeeStatus }) {
    setLocalError(null);

    if (!values.name.trim()) {
      setLocalError("Name is required.");
      return;
    }

    try {
      if (mode === "create") {
        await addEmployee({ name: values.name.trim(), status: values.status });
      } else if (activeEmployee) {
        await updateEmployee({ id: activeEmployee.id, name: values.name.trim(), status: values.status });
      }
      setIsModalOpen(false);
    } catch (err) {
      setLocalError((err as Error).message);
    }
  }

  async function handleDelete(id: string) {
    setLocalError(null);
    try {
      await deleteEmployee(id);
    } catch (err) {
      setLocalError((err as Error).message);
    }
  }

  return (
    <section className="app-shell min-h-screen px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col items-start gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Employees</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage work status and keep your roster current.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
          >
            <PlusIcon />
            Create
          </button>
        </header>

        {localError && !isModalOpen && (
          <p className="rounded-2xl bg-rose-50 px-4 py-2 text-sm text-rose-600">{localError}</p>
        )}

        {isLoading ? (
          <p className="text-sm text-slate-500">Loading employees...</p>
        ) : error ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-2 text-sm text-rose-600">
            {(error as Error).message}
          </p>
        ) : total === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-sm text-slate-500 shadow-sm">
            No employees yet. Create the first profile.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        mode={mode}
        initialEmployee={activeEmployee}
        isSubmitting={isMutating}
        error={localError}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}
