package com.example.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "videos")
public class Video {

    @Id
    @GeneratedValue(generator = "UUID") // Generate UUID
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false, nullable = false, unique = true)
    private String uniqueId;

    private String title;
    private String description;
    private String uploaderEmail;

    @Lob
    private byte[] videoData;

    // Added thumbnail field
    @Lob
    private byte[] thumbnailData;

    // Optional: Add thumbnail content type
    private String thumbnailContentType;
}