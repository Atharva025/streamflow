package com.example.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class VideoStreamingService {

    private final RestTemplate restTemplate;
    private static final String MS_MEDIA_URL = "http://localhost:8082/videos/";

    public VideoStreamingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Resource getVideoResource(String videoId) {
        String url = MS_MEDIA_URL + videoId;
        ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.GET, null, byte[].class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return new ByteArrayResource(response.getBody());
        }
        return null;
    }
}
