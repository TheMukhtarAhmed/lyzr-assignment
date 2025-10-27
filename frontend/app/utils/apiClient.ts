export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  data?: any
) {
  const sessionId = localStorage.getItem("session_id");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (sessionId) headers["X-Session-ID"] = sessionId;

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
