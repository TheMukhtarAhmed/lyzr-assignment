import { v4 as uuidv4 } from "uuid";

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  data?: any
) {
  let sessionId = sessionStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem("session_id", sessionId);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Session-ID": sessionId,
  };

  const response = await fetch(`https://api.mukhtarahmed.com${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(
      result?.detail || "Something went wrong, please try again later."
    );
  return result;
}
