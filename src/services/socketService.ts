
/**
 * This is a simulated WebSocket service for frontend-only demo.
 * In a real application, you would use an actual WebSocket connection.
 */

type MessageCallback = (message: any) => void;
type ConnectionCallback = () => void;

class SocketService {
  private connected: boolean = false;
  private messageListeners: MessageCallback[] = [];
  private connectListeners: ConnectionCallback[] = [];
  private disconnectListeners: ConnectionCallback[] = [];

  constructor() {
    // Simulate connection after a short delay
    setTimeout(() => this.simulateConnection(), 1000);
  }

  private simulateConnection() {
    this.connected = true;
    this.connectListeners.forEach(listener => listener());
    console.log('Socket connected');
  }

  public isConnected(): boolean {
    return this.connected;
  }

  public onConnect(callback: ConnectionCallback) {
    this.connectListeners.push(callback);
    
    // If already connected, call immediately
    if (this.connected) {
      callback();
    }
    
    return () => {
      this.connectListeners = this.connectListeners.filter(cb => cb !== callback);
    };
  }
  
  public onDisconnect(callback: ConnectionCallback) {
    this.disconnectListeners.push(callback);
    return () => {
      this.disconnectListeners = this.disconnectListeners.filter(cb => cb !== callback);
    };
  }

  public onMessage(callback: MessageCallback) {
    this.messageListeners.push(callback);
    return () => {
      this.messageListeners = this.messageListeners.filter(cb => cb !== callback);
    };
  }

  public send(message: any) {
    if (!this.connected) {
      console.error('Cannot send message, socket not connected');
      return;
    }
    
    // Here we would normally send to an actual server
    console.log('Message sent:', message);
    
    // For the demo, we'll just echo messages back after a delay
    if (message.type === 'user_typing') {
      // Handle typing indicator specially
      this.simulateTypingResponse(message);
    }
  }

  private simulateTypingResponse(message: any) {
    // Notify everyone that the user is typing
    this.messageListeners.forEach(listener => 
      listener({
        type: 'typing_indicator',
        user: message.user,
        isTyping: message.isTyping
      })
    );
  }

  public disconnect() {
    if (!this.connected) return;
    
    this.connected = false;
    this.disconnectListeners.forEach(listener => listener());
    console.log('Socket disconnected');
  }
}

// Create a singleton instance
export const socketService = new SocketService();
export default socketService;
