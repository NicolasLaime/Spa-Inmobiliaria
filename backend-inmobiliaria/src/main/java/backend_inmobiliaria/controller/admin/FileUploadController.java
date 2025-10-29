package backend_inmobiliaria.controller.admin;


import backend_inmobiliaria.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/upload")
public class FileUploadController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping
    public ResponseEntity<Map> upload(@RequestParam("file") MultipartFile file) throws IOException {
        Map result = cloudinaryService.uploadFile(file);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{publicId}")
    public ResponseEntity<Map> delete(@PathVariable String publicId) throws IOException {
        Map result = cloudinaryService.deleteFile(publicId);
        return ResponseEntity.ok(result);
    }
}
