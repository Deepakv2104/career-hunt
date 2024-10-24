package com.anurag.career_hunt_server.services;


import java.nio.file.Path;
import org.springframework.core.io.Resource;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
	
    String storeFile(MultipartFile file);
    
    Path getFileLocation(String fileName);
    
    Resource loadFileAsResource(String fileName);
}