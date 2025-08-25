# 🎥 StreamFlow - Distributed Video Streaming Platform
## *Microservices Architecture with Modern Web Technologies*

[![Java](https://img.shields.io/badge/Java-Spring%20Boot-orange.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-Three.js-blue.svg)](https://reactjs.org/)
[![Microservices](https://img.shields.io/badge/Architecture-Microservices-purple.svg)](https://microservices.io/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-blue.svg)](https://www.mysql.com/)

---

## 🚀 **Project Overview**

StreamFlow is a **distributed video streaming platform** built with microservices architecture, demonstrating practical implementation of modern software engineering concepts. This project showcases the ability to design, develop, and integrate multiple independent services into a cohesive video management and streaming system.

**Technical Achievements:**
- **Microservices architecture** with 5 independent, communicating services
- **Service discovery** implementation using Netflix Eureka
- **API Gateway** for centralized request routing and management
- **Full-stack development** combining Spring Boot backend with React frontend
- **3D visualization** integration using Three.js for enhanced user experience
- **Containerization** support for deployment flexibility

---

## 🏗️ **System Architecture Overview**

This platform follows **Domain-Driven Design (DDD)** principles with clear separation of concerns across five core microservices:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend UI   │    │   API Gateway   │    │ Eureka Server   │
│   (React.js)    │◄──►│ (Spring Cloud)  │◄──►│ (Discovery)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │   ms-user    │ │   ms-media   │ │ ms-streaming │
        │ (Auth & UGC) │ │ (Processing) │ │  (Delivery)  │
        └──────────────┘ └──────────────┘ └──────────────┘
                │               │               │
                └───────────────┼───────────────┘
                                ▼
                        ┌──────────────┐
                        │    MySQL     │
                        │  (Database)  │
                        └──────────────┘
```

---

## 🎯 **Microservices Implementation**

### **1. User Management Service (ms-user)**
**Core Functionality:** User authentication and video metadata management
- **Spring Boot** implementation with Maven build system
- **User registration and authentication** system
- **Video metadata operations** for content management
- **RESTful API endpoints** for user operations
- **MySQL integration** using JPA/Hibernate

**Technical Stack:**
- Spring Boot with Spring Security
- Maven dependency management
- MySQL database integration
- Docker containerization ready

### **2. Media Processing Service (ms-media)**
**Core Functionality:** Video file upload and processing
- **File upload handling** for video content
- **Video processing** and storage management
- **Spring Boot** microservice architecture
- **Integration** with user service for metadata
- **Asynchronous processing** capabilities

**Technical Implementation:**
- Spring Boot framework
- File system storage integration
- RESTful API design
- Service-to-service communication

### **3. Streaming Service (ms-streaming)**
**Core Functionality:** Video content delivery
- **Video streaming** functionality for stored content
- **Client request handling** for video playback
- **Integration** with media service for content access
- **Spring Boot** based implementation
- **RESTful endpoints** for streaming operations

**Technical Features:**
- Spring Boot framework
- Video delivery mechanisms
- Service communication protocols
- Client-server interaction handling

### **4. Service Discovery (Eureka Server)**
**Core Functionality:** Microservices registration and discovery
- **Netflix Eureka** implementation for service registry
- **Service registration** for all microservices
- **Dynamic service discovery** capabilities
- **Health monitoring** of registered services
- **Load balancing** support across service instances

### **5. API Gateway (Spring Cloud Gateway)**
**Core Functionality:** Centralized request routing
- **Single entry point** for client requests
- **Request routing** to appropriate microservices
- **Spring Cloud Gateway** implementation
- **Service integration** with Eureka discovery
- **Cross-cutting concerns** handling

---

## 💻 **Frontend Implementation**

The React frontend demonstrates modern web development practices with advanced UI capabilities:

### **React + Three.js Integration:**
- **Three.js** for 3D graphics and immersive video interfaces
- **@react-three/fiber** for declarative 3D scene management
- **@react-three/drei** for pre-built 3D components and helpers
- **@react-three/postprocessing** for visual effects and rendering enhancements

### **Enhanced User Experience:**
- **Framer Motion** integration for smooth animations and transitions
- **React Chart.js** for data visualization and analytics
- **GSAP** for advanced timeline-based animations
- **React Error Boundary** for graceful error handling
- **React Intersection Observer** for performance optimization

### **Communication & Integration:**
- **EmailJS** integration for client-side email functionality
- **Nodemailer** for server-side email communications
- **Google APIs** integration for extended functionality
- **Express.js** server components for API handling

### **Modern Development Practices:**
- **Functional components** with React hooks
- **Component-based architecture** for reusability
- **Environment configuration** with dotenv
- **Responsive design** principles

---

## 🔧 **Technical Implementation Highlights**

### **Microservices Architecture:**
- **Service separation** with clear domain boundaries
- **Inter-service communication** using REST APIs
- **Service discovery** with Netflix Eureka for dynamic service registration
- **API Gateway** as single entry point for request routing
- **Independent deployability** of each service

### **Database Integration:**
- **MySQL** as primary database for all services
- **JPA/Hibernate** for object-relational mapping
- **Connection management** across multiple services
- **Data consistency** across distributed services

### **Development & Deployment:**
- **Maven** build system for dependency management
- **Docker** containerization support
- **Spring Boot** framework for rapid development
- **Git** version control with proper project structure

### **Frontend Integration:**
- **React** components with modern JavaScript (ES6+)
- **Three.js** for 3D graphics capabilities
- **RESTful API** consumption for backend integration
- **Responsive design** implementation

---

## � **Skills Demonstrated Through Implementation**

### **Microservices Architecture:**
- **Service decomposition** with proper domain boundaries
- **Service discovery** and registration using Netflix Eureka
- **API Gateway** pattern for request routing and management
- **Inter-service communication** using RESTful APIs
- **Containerization** for deployment flexibility

### **Full-Stack Development:**
- **Backend development** with Spring Boot ecosystem
- **Frontend development** with modern React and Three.js
- **Database integration** using JPA/Hibernate with MySQL
- **API design** and implementation following REST principles
- **Build automation** using Maven and npm

### **Modern Web Technologies:**
- **3D graphics programming** with Three.js integration
- **Animation libraries** (Framer Motion, GSAP) for enhanced UX
- **Email integration** with EmailJS and Nodemailer
- **External API integration** with Google APIs
- **Component-based architecture** with React

### **Development Practices:**
- **Version control** with Git
- **Dependency management** with Maven and npm
- **Environment configuration** management
- **Containerization** with Docker
- **Project structure** organization for scalability

---

## 🛠️ **Technology Stack**

### **Backend Technologies:**
- **Java** with Spring Boot framework
- **Spring Security** for authentication
- **Netflix Eureka** for service discovery
- **Spring Cloud Gateway** for API routing
- **MySQL** database with JPA/Hibernate
- **Maven** for dependency management and build automation
- **Docker** for containerization

### **Frontend Technologies:**
- **React** with functional components and hooks
- **Three.js** for 3D graphics and visualization
- **Framer Motion** for animations
- **GSAP** for timeline-based animations
- **React Chart.js** for data visualization
- **Modern JavaScript (ES6+)** features

### **Integration & Communication:**
- **RESTful APIs** for service communication
- **EmailJS** for client-side email functionality
- **Nodemailer** for server-side communications
- **Google APIs** integration
- **Express.js** for additional server functionality

### **Development Tools:**
- **Maven** for Java project management
- **npm** for frontend dependency management
- **Git** version control
- **Docker** for containerization
- **Environment configuration** with dotenv

---

## 🚀 **Quick Start Guide**

### **Prerequisites:**
- Java 17+ JDK
- Node.js 16+ and npm
- MySQL 8.0+
- Docker (optional but recommended)

### **Local Development Setup:**

```bash
# Clone the repository
git clone https://github.com/Atharva025/streamflow.git
cd streamflow

# Start Eureka Server (Service Discovery)
cd "MA Project Final/eureka-server"
mvn spring-boot:run

# Start API Gateway
cd "../api-gateway"
mvn spring-boot:run

# Start User Service
cd "../ms-user"
mvn spring-boot:run

# Start Media Service
cd "../ms-media"
mvn spring-boot:run

# Start Streaming Service
cd "../ms-streaming"
mvn spring-boot:run

# Install and start frontend
npm install
npm start
```

### **Docker Deployment:**
```bash
# Build and run all services
docker-compose up --build
```

---

## 📈 **Future Enhancements & Roadmap**

### **Immediate Next Steps:**
- **Enhanced security** with JWT token implementation
- **Performance optimization** for video streaming
- **Advanced caching** strategies for better response times
- **Monitoring and logging** integration
- **Unit testing** coverage expansion

### **Advanced Features:**
- **Real-time notifications** for user interactions
- **Video compression** and quality optimization
- **Search functionality** for video content
- **User dashboard** for content management
- **Mobile application** development

---

## 📝 **License & Contribution**

This project is open source and available under the MIT License. Contributions, issues, and feature requests are welcome!

**Built with 💻 by Atharva** - *Turning complex business requirements into elegant technical solutions*

---

*"Code is poetry written for machines to execute and humans to maintain."* - This project embodies that philosophy.
