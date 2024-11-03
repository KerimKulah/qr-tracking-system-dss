package com.mk.qr_tracking_system_dss.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.function.Function;

public interface JwtService {
    String extractUsername(String token);
    <T> T extractToken(String token, Function<Claims, T> claimsResolver);
    boolean tokenControl(String jwt, UserDetails userDetails);
    String createToken(UserDetails user);
}
