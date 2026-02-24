import type { EmployeeStatus } from "./types";

export const STATUS_OPTIONS: {
  value: EmployeeStatus;
  label: string;
  tone: string;
  dot: string;
}[] = [
  { value: "Working", label: "Working", tone: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  { value: "OnVacation", label: "On Vacation", tone: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  { value: "LunchTime", label: "Lunch Time", tone: "bg-sky-100 text-sky-800", dot: "bg-sky-500" },
  { value: "BusinessTrip", label: "Business Trip", tone: "bg-violet-100 text-violet-800", dot: "bg-violet-500" }
];

export const STATUS_LABELS = new Map(STATUS_OPTIONS.map((option) => [option.value, option]));
