# 🎥 Video Streaming Platform - Microservices Architecture

Welcome to the **Streamflow**, a distributed microservices-based application that allows users to upload, manage, and stream videos in real time. Built with Spring Boot, Docker, and integrated with MySQL Database, this system ensures scalability, performance, and ease of maintenance.

---

## 📦 Microservices Overview

This project is composed of the following microservices:

| Microservice   | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **ms-user**     | Handles user management, and video metadata operations. |
| **ms-media**    | Processes and stores video files uploaded by users.                        |
| **ms-streaming**| Streams stored videos to clients on demand.                                |
| **eureka-server** | Service discovery using Netflix Eureka for all microservices.           |
| **api-gateway** | Centralized API gateway to route requests securely.                        |

---

## 🛠️ Technologies Used

- **Spring Boot**
- **Spring Security**
- **MySQL**
- **Docker**
- **Eureka Discovery Server**
- **Spring Cloud Gateway**
- **Swagger/OpenAPI** for API documentation

---

## 🗂️ Folder Structure

```bash
project-root/
│
├── ms-user/
├── ms-media/
├── ms-streaming/
├── eureka-server/
├── api-gateway/


