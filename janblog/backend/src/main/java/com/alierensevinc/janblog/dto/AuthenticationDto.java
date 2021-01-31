package com.alierensevinc.janblog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationDto {
    private String authenticationToken;
    private String username;
}