import { EmployeesProvider } from "@/features/employees/context/employees-context";
import { EmployeesDashboard } from "@/features/employees/components/employees-dashboard";

export default function Home() {
  return (
    <EmployeesProvider>
      <EmployeesDashboard />
    </EmployeesProvider>
  );
}
