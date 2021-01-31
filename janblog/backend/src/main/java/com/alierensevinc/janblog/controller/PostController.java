package com.alierensevinc.janblog.controller;

import com.alierensevinc.janblog.dto.PostDto;
import com.alierensevinc.janblog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/")
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("/all")
    public ResponseEntity showAllPosts() {
        try {
            return new ResponseEntity<>(postService.showAllPosts(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity getSinglePost(@PathVariable @RequestBody Long id) {
        try {
            return new ResponseEntity<>(postService.getSinglePost(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/post")
    public ResponseEntity createPost(@RequestBody PostDto post) {
        try {
            return new ResponseEntity<>(postService.createPost(post), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity updatePost(@RequestBody PostDto post, @PathVariable Long id) {
        try {
            return new ResponseEntity<>(postService.updatePost(post, id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deletePost(@PathVariable @RequestBody Long id) {
        try {
            return new ResponseEntity<>(postService.deletePost(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
