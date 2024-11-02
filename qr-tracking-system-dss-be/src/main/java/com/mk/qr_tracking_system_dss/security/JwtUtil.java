package com.mk.qr_tracking_system_dss.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // Güvenlik anahtarını application.properties dosyasından al
    @Value("${jwt.secret}")
    private String secretKey;

    // Token geçerlilik süresini application.properties dosyasından al
    @Value("${jwt.expiration}")
    private long jwtExpirationDuration;

    // Token'dan kullanıcı adını çıkarır
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Token'dan istenen bir claim'i çıkartır
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Token'daki tüm claimleri çıkarır
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Token süresinin dolup dolmadığını kontrol eder
    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Token'dan geçerlilik süresini çıkarır
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Kullanıcı adıyla yeni bir token oluşturur
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    // Token oluşturma işlemi
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationDuration))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Token'ı ve kullanıcı adını doğrular
    public boolean validateToken(String token, UserDetails userDetais) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(userDetais.getUsername()) && !isTokenExpired(token));
    }
}
