package ai_document_qa.project.controller;

import ai_document_qa.project.dto.FileUploadResponse;
import ai_document_qa.project.entity.FileMetadata;
import ai_document_qa.project.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        FileMetadata saved = fileService.uploadFile(file);

        FileUploadResponse response = new FileUploadResponse();

        response.setId(saved.getId());
        response.setFileName(saved.getFileName());
        response.setFileType(saved.getFileType());

        response.setExtractedText(saved.getExtractedText());

        // ⚡ SHORT SUMMARY (important fix)
        String summary = saved.getSummary();

        // safety: prevent frontend overflow
        if (summary != null && summary.length() > 500) {
            summary = summary.substring(0, 500) + "...";
        }

        response.setSummary(summary);

        return ResponseEntity.ok(response);
    }
}