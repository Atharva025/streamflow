package com.example.repository;

import com.example.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, String> {
    List<Video> findByUploaderEmail(String email);
    Optional<Video> findByUniqueId(String uniqueId);
}
