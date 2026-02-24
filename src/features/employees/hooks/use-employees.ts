import { useQuery } from "@tanstack/react-query";

import { getEmployees } from "../api/client";
import { employeeKeys } from "../api/keys";

export function useEmployees() {
  return useQuery({
    queryKey: employeeKeys.list(),
    queryFn: getEmployees
  });
}
