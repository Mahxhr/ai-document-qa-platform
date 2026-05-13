package ai_document_qa.project.repository;

import ai_document_qa.project.entity.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileMetadata, Long> {
}
