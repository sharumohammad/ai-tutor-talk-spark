
# Spark AI Tutor - Educational Chat Application

Spark AI Tutor is a real-time, intelligent educational chat application that enables students to have engaging conversations with an AI tutor. Built with React, TypeScript, Zustand, and TailwindCSS, this application provides a seamless learning experience.

## Features

- **Real-time Chat Interface**: Engaging conversation UI with typing indicators
- **AI-Powered Responses**: Integration with OpenRouter API for intelligent responses
- **State Management**: Zustand for efficient state management
- **TypeScript**: Type safety throughout the application
- **Responsive Design**: Works on desktop and mobile devices
- **Simulated WebSockets**: Front-end implementation of real-time updates

## How to Use

1. **Start the Application**: 
   - Run `npm run dev` to start the development server
   - Open your browser to `http://localhost:8080`

2. **Chat with the AI Tutor**:
   - Type your educational questions in the chat input
   - Press Enter or click the send button to submit
   - Receive intelligent responses from the AI tutor

3. **Example Questions**:
   - "Explain quantum physics to a beginner"
   - "Help me understand photosynthesis"
   - "Teach me about the Civil War"
   - "What is the Pythagorean theorem?"
   - "How do I solve this equation: 2x + 5 = 15?"

## Technologies Used

- **React**: UI library
- **TypeScript**: Type safety
- **Zustand**: State management
- **TailwindCSS**: Styling
- **OpenRouter API**: AI responses
- **Simulated WebSockets**: Real-time updates

## Project Structure

- `/components`: UI components
- `/store`: Zustand store
- `/services`: API and socket services
- `/types`: TypeScript interfaces
- `/hooks`: Custom React hooks

## Notes

- This is a frontend-only implementation with simulated WebSockets
- For a production application, connect to a real WebSocket server
- The AI responses are generated using OpenRouter API with the provided API key
