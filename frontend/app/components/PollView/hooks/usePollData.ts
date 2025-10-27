import { usePollStore } from "@/app/stores/poll";
import { Poll } from "@/app/types/Poll";
import { apiRequest } from "@/app/utils/apiClient";
import { useCallback, useEffect, useState } from "react";

export const usePollData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setPolls = usePollStore((state) => state.setPolls);

  const fetchPolls = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result: Poll[] = await apiRequest("/questions/", "GET");
      setPolls(result as Poll[]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [setPolls]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  return {
    isLoading,
    error,
  };
};
