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


## 🕒 Note on Submission Timing

I wanted to provide an update regarding the submission timeline. I have requested a short extension via email, and the **frontend portion of the project will be fully ready by tomorrow**.

I sincerely apologize for this slight delay. The reason for the postponement is not due to the project's difficulty, but rather an unexpected and significant opportunity that arose.

---

## 🌟 Reason for the Short Delay

Last night (October 26th), I received an unexpected opportunity to collaborate with **one of the top 5 YouTubers in India**. They decided to integrate and use my existing college project, **SmartLnks**, for a major campaign.

It was a truly surreal and massive moment for me. Seeing a tool I built being trusted to handle significant traffic, including from accounts with **over 60–70 million Instagram followers**, was an incredible experience. I spent the entire night focused on **scaling and optimizing SmartLnks** to ensure stability and smooth performance under high load. I am thrilled to report that it performed better than expected.

I am very sorry for the short delay, but I promise to deliver the remaining frontend part of this project with the same level of dedication and attention to detail.

Thank you so much for your understanding.