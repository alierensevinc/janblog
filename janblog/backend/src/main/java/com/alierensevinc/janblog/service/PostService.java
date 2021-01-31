package com.alierensevinc.janblog.service;

import com.alierensevinc.janblog.dto.PostDto;
import com.alierensevinc.janblog.exception.PostNotFoundException;
import com.alierensevinc.janblog.model.Post;
import com.alierensevinc.janblog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class PostService {

    @Autowired
    AuthService authService;

    @Autowired
    PostRepository postRepository;

    private static final String POST_NOT_FOUND_STRING = "Post not found with id: ";

    @Transactional
    public List<PostDto> showAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(this::mapFromPostToDto).collect(toList());
    }

    @Transactional
    public PostDto getSinglePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() ->
                new PostNotFoundException(POST_NOT_FOUND_STRING + id));
        return mapFromPostToDto(post);
    }

    public PostDto createPost(PostDto postdto) {
        Post post = new Post();
        post.setTitle(postdto.getTitle());
        post.setContent(postdto.getContent());
        User username = authService.getCurrentUser().orElseThrow(() ->
                new IllegalArgumentException("No user logged in."));
        post.setUsername(username.getUsername());
        post.setCreatedOn(Instant.now());
        post.setUpdatedOn(Instant.now());
        postRepository.save(post);
        return mapFromPostToDto(post);
    }

    public PostDto updatePost(PostDto postdto, Long id) {
        Post post = postRepository.findById(id).orElseThrow(() ->
                new PostNotFoundException(POST_NOT_FOUND_STRING + id));
        post.setTitle(postdto.getTitle());
        post.setContent(postdto.getContent());
        post.setUsername(postdto.getUsername());
        post.setUpdatedOn(Instant.now());
        postRepository.save(post);
        return mapFromPostToDto(post);
    }

    public boolean deletePost(Long id) {
        try {
            postRepository.findById(id).orElseThrow(() ->
                    new PostNotFoundException(POST_NOT_FOUND_STRING + id));
            postRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private PostDto mapFromPostToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setUsername(post.getUsername());
        postDto.setCreatedOn(post.getCreatedOn());
        postDto.setUpdatedOn(post.getUpdatedOn());
        return postDto;
    }
}
