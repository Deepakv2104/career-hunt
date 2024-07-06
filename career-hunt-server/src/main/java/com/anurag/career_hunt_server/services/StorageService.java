package com.anurag.career_hunt_server.services;


import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String storeFile(MultipartFile file);
}