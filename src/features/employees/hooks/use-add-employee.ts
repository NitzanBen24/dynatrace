import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addEmployee } from "../api/client";
import { employeeKeys } from "../api/keys";

export function useAddEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.list() });
    }
  });
}
