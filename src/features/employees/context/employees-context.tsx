"use client";

import { createContext, useContext } from "react";

import { useEmployeesViewModel } from "../view-models/use-employees-view-model";

const EmployeesContext = createContext<ReturnType<typeof useEmployeesViewModel> | null>(null);

export function EmployeesProvider({ children }: { children: React.ReactNode }) {
  const value = useEmployeesViewModel();
  return <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>;
}

export function useEmployeesContext() {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployeesContext must be used within EmployeesProvider");
  }
  return context;
}
