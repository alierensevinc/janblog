package com.alierensevinc.janblog.controller;

import com.alierensevinc.janblog.dto.LoginDto;
import com.alierensevinc.janblog.dto.RegisterDto;
import com.alierensevinc.janblog.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @RequestMapping("/register")
    public ResponseEntity register(@RequestBody RegisterDto registerDto) {
        try {
            return new ResponseEntity<>(authService.register(registerDto), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/login")
    public ResponseEntity login(@RequestBody LoginDto loginDto) {
        try {
            return new ResponseEntity<>(authService.login(loginDto), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/getRegisteredAccountCount")
    public ResponseEntity getRegisteredAccountCount() {
        try {
            return new ResponseEntity<>(authService.getRegisteredAccountCount(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
