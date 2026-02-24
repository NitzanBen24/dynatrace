export type EmployeeStatus = "Working" | "OnVacation" | "LunchTime" | "BusinessTrip";

export type Employee = {
  id: string;
  name: string;
  status: EmployeeStatus;
  created_at?: string;
};

export type EmployeeCreate = {
  name: string;
  status: EmployeeStatus;
};

export type EmployeeUpdate = {
  id: string;
  name?: string;
  status?: EmployeeStatus;
};
