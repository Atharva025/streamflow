package com.example.service;

import com.example.model.Video;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Optional;

public interface VideoService {
    String uploadVideo(String title, String description, String email, MultipartFile file, MultipartFile thumbnail);
    List<Video> getAllVideos();
    List<Video> getVideosByUploader(String email);
    Optional<Video> getVideoByUniqueId(String uniqueId);
    // Other methods...
}
