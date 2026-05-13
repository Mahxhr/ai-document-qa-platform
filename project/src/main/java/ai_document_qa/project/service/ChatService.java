package ai_document_qa.project.service;

import ai_document_qa.project.dto.ChatResponse;
import ai_document_qa.project.entity.FileMetadata;
import ai_document_qa.project.repository.FileRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final FileRepository fileRepository;

    public ChatService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public ChatResponse askQuestion(Long fileId, String question) {

        FileMetadata file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        String text = file.getExtractedText();

        String answer;

        if (question.toLowerCase().contains("objective")) {

            answer = "The project objective is to build an AI-powered document and multimedia Q&A application.";

        } else if (question.toLowerCase().contains("frontend")) {

            answer = "Frontend should be built using React, Vue, or Angular.";

        } else if (question.toLowerCase().contains("backend")) {

            answer = "Backend should use Spring Boot, Quarkus, FastAPI, or Django.";

        } else {

            answer = text.substring(0, Math.min(300, text.length()));
        }

        return new ChatResponse(answer);
    }
}