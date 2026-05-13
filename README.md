# AI Document Q&A Platform

An AI-powered full-stack web application that allows users to upload PDF documents and interact with them using an intelligent chatbot.

## Features

- Upload PDF files
- Extract text from PDFs
- Generate document summaries
- AI-based chatbot for asking questions
- Modern React frontend UI
- Spring Boot backend
- MySQL database integration

## Tech Stack

### Frontend
- React.js
- Axios
- Vite

### Backend
- Spring Boot
- Java
- Spring Data JPA
- MySQL
- Apache PDFBox

## Project Structure

frontend/
project/ (Spring Boot backend)

## How to Run

### Backend

```bash
cd project
mvn spring-boot:run
```

Backend runs on:
http://localhost:8080

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

## API Endpoints

### Upload PDF

POST
/api/files/upload

### Ask Questions

POST
/api/chat

## Future Improvements

- Audio & video transcription
- Timestamp extraction
- Play relevant video/audio section
- OpenAI integration
- Authentication & JWT
- Docker deployment
- CI/CD pipeline

## Author

Mahek
