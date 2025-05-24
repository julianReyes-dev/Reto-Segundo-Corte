package edu.uptc.swii.authservice.infrastructure.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    private final Key key;
    private final long validityInMilliseconds;
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    public JwtTokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long validityInMilliseconds) {
        
        if (secret == null || secret.isBlank()) {
            throw new IllegalArgumentException("JWT secret must not be null or empty");
        }
        
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.validityInMilliseconds = validityInMilliseconds;
    }

    public String createToken(Long userId, String role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            
            if (claims.getBody().getExpiration().before(new Date())) {
                logger.warn("Token expired: " + token);
                return false;
            }
            
            return true;
        } catch (ExpiredJwtException ex) {
            logger.warn("Token expired: " + ex.getMessage());
            return false;
        } catch (MalformedJwtException ex) {
            logger.warn("Invalid JWT token: " + ex.getMessage());
            return false;
        } catch (UnsupportedJwtException ex) {
            logger.warn("Unsupported JWT token: " + ex.getMessage());
            return false;
        } catch (IllegalArgumentException ex) {
            logger.warn("JWT claims string is empty: " + ex.getMessage());
            return false;
        } catch (Exception ex) {
            logger.error("Unexpected error validating token: " + ex.getMessage());
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Long userId = Long.parseLong(claims.getSubject());
        String role = claims.get("role", String.class);

        Collection<? extends GrantedAuthority> authorities = 
            Arrays.stream(new String[]{role})
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new UsernamePasswordAuthenticationToken(
            userId.toString(), null, authorities);
    }
}