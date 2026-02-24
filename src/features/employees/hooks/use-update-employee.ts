import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEmployee } from "../api/client";
import { employeeKeys } from "../api/keys";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.list() });
    }
  });
}
