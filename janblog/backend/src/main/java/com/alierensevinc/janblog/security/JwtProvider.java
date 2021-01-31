package com.alierensevinc.janblog.security;

import com.alierensevinc.janblog.exception.JanBlogException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.*;
import java.security.cert.CertificateException;

@Service
public class JwtProvider {

    private KeyStore keyStore;

    private static final String JANBLOG = "janblog";

    @PostConstruct
    public void init() {
        try {
            keyStore = KeyStore.getInstance("JKS");
            InputStream resourceStream = JwtProvider.class.getClassLoader().getResourceAsStream("janblog.jks");
            keyStore.load(resourceStream, JANBLOG.toCharArray());
        } catch (KeyStoreException | CertificateException | NoSuchAlgorithmException | IOException e) {
            throw new JanBlogException("Exception occurred while loading keystore");
        }
    }

    public String generateToken(Authentication authentication) {
        User principal = (User) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(principal.getUsername())
                .signWith(getPrivateKey())
                .compact();
    }

    boolean validateToken(String jwt) {
        try {
            Jwts.parser().setSigningKey(getPublicKey()).parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(getPublicKey())
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    private PrivateKey getPrivateKey() {
        try {
            return (PrivateKey) keyStore.getKey(JANBLOG, JANBLOG.toCharArray());
        } catch (KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e) {
            throw new JanBlogException("Exception occurred while loading keystore");
        }
    }

    private PublicKey getPublicKey() {
        try {
            return keyStore.getCertificate(JANBLOG).getPublicKey();
        } catch (KeyStoreException e) {
            throw new JanBlogException("Exception occurred while retrieving public key from keystore");
        }
    }
}