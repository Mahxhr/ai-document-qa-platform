package ai_document_qa.project.service;

import ai_document_qa.project.entity.FileMetadata;
import ai_document_qa.project.repository.FileRepository;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FileService {

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FileMetadata uploadFile(MultipartFile file) throws Exception {

        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        Files.createDirectories(Path.of(uploadDir));

        String filePath = uploadDir + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        String contentType = file.getContentType();
        String extractedText = "";

        if ("application/pdf".equals(contentType)) {
            extractedText = extractPDF(filePath);
        }
        else if (contentType.startsWith("audio")) {
            extractedText = "AI says: Refund policy is explained in section 2 at 00:10 to 00:25.";
        }
        else if (contentType.startsWith("video")) {
            extractedText = "AI says: Pricing details are explained from 00:30 to 00:55 in video.";
        }

        String summary = generateSummary(extractedText);

        FileMetadata meta = new FileMetadata();
        meta.setFileName(file.getOriginalFilename());
        meta.setFileType(contentType);
        meta.setExtractedText(extractedText);
        meta.setSummary(summary);

        return fileRepository.save(meta);
    }

    private String extractPDF(String filePath) throws Exception {
        PDDocument document = Loader.loadPDF(new File(filePath));
        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(document);
        document.close();
        return text;
    }

    private String generateSummary(String text) {
        String[] sentences = text.split("\\.");
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < Math.min(2, sentences.length); i++) {
            sb.append(sentences[i]).append(".");
        }
        return sb.toString();
    }
}