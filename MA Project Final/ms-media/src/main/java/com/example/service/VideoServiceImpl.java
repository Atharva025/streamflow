package com.example.service;

import com.example.model.Video;
import com.example.repository.VideoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;

    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Override
    public String uploadVideo(String title, String description, String email,
                              MultipartFile file, MultipartFile thumbnail) {
        try {
            Video video = new Video();
            video.setTitle(title);
            video.setDescription(description);
            video.setUploaderEmail(email);

            // Set video data
            video.setVideoData(file.getBytes());

            // Set thumbnail data if provided
            if (thumbnail != null && !thumbnail.isEmpty()) {
                video.setThumbnailData(thumbnail.getBytes());
                video.setThumbnailContentType(thumbnail.getContentType());
            }

            Video savedVideo = videoRepository.save(video);
            return "Video uploaded successfully with ID: " + savedVideo.getUniqueId();

        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to upload video: " + e.getMessage();
        }
    }

    public Video getVideoById(String id) {
        Optional<Video> video = videoRepository.findById(id);
        return video.orElse(null);
    }

    @Override
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    @Override
    public List<Video> getVideosByUploader(String email) {
        return videoRepository.findByUploaderEmail(email);
    }

    @Override
    public Optional<Video> getVideoByUniqueId(String uniqueId) {
        return videoRepository.findByUniqueId(uniqueId);
    }
}
