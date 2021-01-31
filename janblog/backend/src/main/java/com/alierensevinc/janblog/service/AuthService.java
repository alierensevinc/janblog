package com.alierensevinc.janblog.service;

import com.alierensevinc.janblog.dto.AuthenticationDto;
import com.alierensevinc.janblog.dto.LoginDto;
import com.alierensevinc.janblog.dto.RegisterDto;
import com.alierensevinc.janblog.dto.UserDto;
import com.alierensevinc.janblog.model.User;
import com.alierensevinc.janblog.repository.UserRepository;
import com.alierensevinc.janblog.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    public UserDto register(RegisterDto registerDto) {
        User user = new User();
        user.setUserName(registerDto.getUsername());
        user.setPassword(encodePassword(registerDto.getPassword()));
        user.setEmail(registerDto.getEmail());
        userRepository.save(user);
        return mapFromUserToDto(user);
    }

    public AuthenticationDto login(LoginDto loginDto) {
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String authenticationToken = jwtProvider.generateToken(authenticate);
        return new AuthenticationDto(authenticationToken, loginDto.getUsername());
    }

    public Long getRegisteredAccountCount() {
        return userRepository.count();
    }

    Optional<org.springframework.security.core.userdetails.User> getCurrentUser() {
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();
        return Optional.of(principal);
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    private UserDto mapFromUserToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUserName(user.getUserName());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

}
