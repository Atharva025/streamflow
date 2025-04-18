package com.example.controller;

import com.example.model.Video;
import com.example.service.VideoService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/videos")
public class VideoController {
    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("email") String email,
            @RequestPart("file") MultipartFile file,
            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail) {

        String response = videoService.uploadVideo(title, description, email, file, thumbnail);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @GetMapping("/uploader/{email}")
    public List<Video> getVideosByUploader(@PathVariable String email) {
        return videoService.getVideosByUploader(email);
    }

    @GetMapping("/{uniqueId}")
    public ResponseEntity<byte[]> getVideoByUniqueId(@PathVariable String uniqueId) {
        Optional<Video> videoOptional = videoService.getVideoByUniqueId(uniqueId);

        if (videoOptional.isPresent()) {
            Video video = videoOptional.get();
            if (video.getVideoData() != null) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                        .body(video.getVideoData());
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/{uniqueId}/thumbnail")
    public ResponseEntity<byte[]> getVideoThumbnail(@PathVariable String uniqueId) {
        Optional<Video> videoOptional = videoService.getVideoByUniqueId(uniqueId);

        if (videoOptional.isPresent()) {
            Video video = videoOptional.get();
            if (video.getThumbnailData() != null) {
                MediaType mediaType = video.getThumbnailContentType() != null
                        ? MediaType.parseMediaType(video.getThumbnailContentType())
                        : MediaType.IMAGE_JPEG;

                return ResponseEntity.ok()
                        .contentType(mediaType)
                        .body(video.getThumbnailData());
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}