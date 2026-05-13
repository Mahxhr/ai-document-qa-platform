package ai_document_qa.project.controller;

import ai_document_qa.project.dto.ChatResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    @PostMapping
    public ChatResponse chat(@RequestBody String question) {

        // ===============================
        // CLEAN LOWERCASE QUESTION
        // ===============================
        String q = question.toLowerCase();

        String answer;
        int startTime;
        int endTime;

        // ===============================
        // SIMPLE INTELLIGENCE LOGIC (MOCK AI)
        // ===============================

        if (q.contains("pricing")) {

            answer = "Pricing details are explained in the video section.";
            startTime = 30;
            endTime = 55;
        }

        else if (q.contains("refund") || q.contains("policy")) {

            answer = "Refund policy is explained in section 2 of the document.";
            startTime = 10;
            endTime = 25;
        }

        else if (q.contains("feature") || q.contains("features")) {

            answer = "Features are explained in introduction section of the document.";
            startTime = 5;
            endTime = 18;
        }

        else {

            answer = "This information is available in the document. Please check relevant section.";

            // default fallback timestamp
            startTime = 0;
            endTime = 15;
        }

        return new ChatResponse(answer, startTime, endTime);
    }
}