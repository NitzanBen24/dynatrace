"use client";

import { useEffect, useState } from "react";

import type { Employee, EmployeeStatus } from "../types";
import { STATUS_OPTIONS } from "../status";

type EmployeeModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialEmployee?: Employee | null;
  isSubmitting?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (values: { name: string; status: EmployeeStatus }) => Promise<void>;
};

export function EmployeeModal({
  isOpen,
  mode,
  initialEmployee,
  isSubmitting,
  error,
  onClose,
  onSubmit
}: EmployeeModalProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<EmployeeStatus>("Working");

  useEffect(() => {
    if (!isOpen) return;
    if (mode === "edit" && initialEmployee) {
      setName(initialEmployee.name ?? "");
      setStatus(initialEmployee.status ?? "Working");
    } else {
      setName("");
      setStatus("Working");
    }
  }, [isOpen, mode, initialEmployee]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-base font-semibold text-slate-900">
            {mode === "edit" ? "Edit Employee" : "Create New Employee"}
          </h3>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit({ name, status });
          }}
          className="px-6 py-5"
        >
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Employee name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border-b border-slate-200 pb-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              placeholder="Lora Ben Ishai"
            />
          </label>
          <label className="mt-5 grid gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as EmployeeStatus)}
              className="border-b border-slate-200 pb-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {error && (
            <p className="mt-4 rounded bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>
          )}

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : mode === "edit" ? "Save" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
