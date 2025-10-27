let ws: WebSocket | null = null;

export const connectWebSocket = (
  url: string,
  onMessage: (data: any) => void
) => {
  if (ws) return ws;

  ws = new WebSocket(url);

  ws.onopen = () => console.log("WebSocket connected");
  ws.onclose = () => {
    console.log("WebSocket disconnected, retrying in 3s...");
    setTimeout(() => connectWebSocket(url, onMessage), 3000);
  };

  ws.onerror = (err) => console.error("WebSocket error:", err);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (e) {
      console.error("WS parse error:", e);
    }
  };

  return ws;
};

export const disconnectWebSocket = () => {
  ws?.close();
  ws = null;
};
