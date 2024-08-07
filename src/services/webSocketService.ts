import {API_BASE_URL} from "@/constants/constants";

class WebSocketService {
  private socket: WebSocket | null = null;

  constructor() {
    this.initSocket();
  }

  private initSocket() {
    this.socket = new WebSocket(`ws://${API_BASE_URL}/ws`);

    this.socket.addEventListener('open', (event) => {
      console.log('WebSocket connected');
    });

    this.socket.addEventListener('close', (event) => {
      console.log('WebSocket disconnected');
      this.reconnect();
    });

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    this.socket.addEventListener('message', (event) => {
    });
  }

  public addEventListener(event: any, callback: (message: {data: any}) => void) {
    if (this.socket) {
      // Implement your custom logic for handling different event types
      this.socket.addEventListener(event, callback);
    } else {
      console.error('WebSocket not initialized');
    }
  }

  public sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket not open. Message not sent:', message);
    }
  }

  private reconnect() {
    this.initSocket();
  }
}

export const webSocketService = new WebSocketService();
