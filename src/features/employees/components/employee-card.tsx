"use client";

import type { Employee } from "../types";
import { STATUS_LABELS } from "../status";

type EmployeeCardProps = {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
};

export function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  const statusMeta = STATUS_LABELS.get(employee.status);
  const initials = employee.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <article
      className="group relative flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      role="button"
      tabIndex={0}
      onClick={() => onEdit(employee)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onEdit(employee);
        }
      }}
    >
      

      <div className="flex items-center gap-4">
        {/* <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50 text-sm font-semibold text-slate-600">
          {initials || "?"}
        </div> */}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-900">{employee.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${statusMeta?.dot ?? "bg-slate-400"}`} />
              {statusMeta?.label ?? employee.status}
            </span>
          </div>
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(employee.id);
            }}
            className="rounded-full border border-rose-200 px-2 py-1 text-[10px] font-semibold text-rose-600 transition hover:bg-rose-50"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
