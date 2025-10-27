# 🗳️ QuickPoll - Real-Time Opinion Polling Platform

A full-stack, real-time polling platform built with **FastAPI**, **Next.js**, and **WebSockets** that allows users to create polls, vote, and see live updates instantly.

---

## 🚀 Features

- **Real-time Polling**: Live vote updates using **WebSockets**.
- **Multiple Poll Types**: Supports both single-choice and multiple-choice polls.
- **Session-based Voting**: Prevents duplicate votes using **Redis** sessions.
- **Live Results**: Real-time progress bars and vote counts displayed immediately.
- **Poll Management**: Users can create, edit, and manage their polls.
- **Like System**: Users can like and unlike polls.
- **Responsive Design**: A mobile-friendly and accessible user interface.
- **RESTful API**: Clean API design with proper status codes and error handling.

---

## 🛠️ Tech Stack

| Component    | Technology       | Description                                                      |
| :----------- | :--------------- | :--------------------------------------------------------------- |
| **Backend**  | **FastAPI**      | Modern, fast (high-performance) Python web framework.            |
|              | **SQLAlchemy**   | ORM for database operations and data modeling.                   |
|              | **PostgreSQL**   | Primary relational database for persistent data storage.         |
|              | **Redis**        | Used for session management, caching, and rate limiting.         |
|              | **WebSockets**   | Enables real-time, bi-directional communication.                 |
|              | **Pydantic**     | Data validation and settings management.                         |
|              | **Poetry**       | Dependency management and packaging.                             |
| **Frontend** | **Next.js**      | React framework for server-side rendering and static generation. |
|              | **TypeScript**   | Adds static type-checking for enhanced developer experience.     |
|              | **Tailwind CSS** | Utility-first CSS framework for rapid UI development.            |
|              | **heroui**    | Pre-built, customizable UI components.                           |

---

## 📋 API Documentation

The QuickPoll API is deployed live and its documentation is accessible via Swagger UI.

### Base URL (Live Deployment)

https://api.mukhtarahmed.com

### Swagger Documentation

You can explore all available endpoints, request bodies, and responses using the interactive Swagger UI: https://api.mukhtarahmed.com/docs

### WebSocket Connection

The primary WebSocket endpoint for real-time poll updates: (wss://api.mukhtarhmed.com/ws/polls)
