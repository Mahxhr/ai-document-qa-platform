package ai_document_qa.project.entity;

import jakarta.persistence.*;

@Entity
public class FileMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileType;

    @Column(columnDefinition = "LONGTEXT")
    private String extractedText;

    @Column(columnDefinition = "LONGTEXT")
    private String summary;

    // Default Constructor
    public FileMetadata() {
    }

    // Parameterized Constructor
    public FileMetadata(Long id, String fileName, String fileType,
                        String extractedText, String summary) {
        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.extractedText = extractedText;
        this.summary = summary;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getExtractedText() {
        return extractedText;
    }

    public void setExtractedText(String extractedText) {
        this.extractedText = extractedText;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}