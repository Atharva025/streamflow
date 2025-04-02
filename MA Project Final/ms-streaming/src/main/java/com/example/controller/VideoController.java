package com.example.controller;

import com.example.service.VideoStreamingService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stream")
public class VideoController {

    private final VideoStreamingService videoStreamingService;

    public VideoController(VideoStreamingService videoStreamingService) {
        this.videoStreamingService = videoStreamingService;
    }

    @GetMapping("/streamVideo/{uniqueId}")
    public ResponseEntity<Resource> streamVideo(@PathVariable String uniqueId) {
        Resource video = videoStreamingService.getVideoResource(uniqueId);

        if (video != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("video/mp4"))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                    .body(video);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
