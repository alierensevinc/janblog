package com.alierensevinc.janblog.dto;

import java.time.Instant;

public class PostDto {

    private Long id;
    private String title;
    private String content;
    private String username;
    private Instant createdOn;
    private Instant updatedOn;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public Instant getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(Instant updatedOn) {
        this.updatedOn = updatedOn;
    }
}
