import { useMutation } from "@tanstack/react-query";
import { api, type InsertResponse } from "@shared/routes";

export function useCreateResponse() {
  return useMutation({
    mutationFn: async (data: InsertResponse) => {
      const validated = api.responses.create.input.parse(data);
      const res = await fetch(api.responses.create.path, {
        method: api.responses.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        throw new Error("Failed to save response");
      }
      
      return api.responses.create.responses[201].parse(await res.json());
    },
  });
}
