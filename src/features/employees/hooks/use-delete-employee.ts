import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEmployee } from "../api/client";
import { employeeKeys } from "../api/keys";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.list() });
    }
  });
}
