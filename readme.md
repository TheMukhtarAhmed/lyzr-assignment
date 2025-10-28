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

## 🌐 Live Deployment & Access

QuickPoll is deployed live and fully accessible via the following links:

### 🗳️ Live Application (Frontend)

Access the full, interactive polling platform here:

> **https://frontend.mukhtarahmed.com**

### 📋 API Documentation (Backend)

The API is deployed live, and its documentation is accessible via Swagger UI.

* **Base URL (API)**: `https://api.mukhtarahmed.com`
* **Swagger Documentation**: [https://api.mukhtarahmed.com/docs](https://api.mukhtarahmed.com/docs)
* **WebSocket Connection**: `wss://api.mukhtarhmed.com/ws/polls`

---

### 🕒 Note on Submission Timing

The **frontend portion of the project is now fully complete and live**. I wanted to provide an update on the minor delay leading up to this final delivery.

### 🌟 Context for the Delay

I sincerely apologize for the slight delay in the initial timeline. The reason was not due to the project's difficulty, but rather an unexpected and significant opportunity that arose:

* Last night (October 26th), I received an unexpected opportunity to collaborate with **one of the top 5 YouTubers in India**.
* They decided to integrate and use my existing college project, **SmartLnks**, for a major campaign.
* It was a surreal moment—seeing a tool I built trusted to handle significant traffic, including from accounts with over **60–70 million Instagram followers**.
* I spent the entire night focused on **scaling and optimizing SmartLnks** to ensure stability and smooth performance under high load, and it thankfully performed better than expected.

Thank you so much for your understanding.
