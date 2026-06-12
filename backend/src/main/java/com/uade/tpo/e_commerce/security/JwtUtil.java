package com.uade.tpo.e_commerce.security;

import java.util.Date;
import java.util.Set;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component // crea, lee y valida tokens
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret; // clave secreta para firmar el token

    @Value("${jwt.expiration}")
    private Long expiration; // tiempo de expiracion del token

    // generacion de clave de firma a partir del secret
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // token con username y roles
    public String generateToken(String userName, Set<String> roles) {
        return Jwts.builder()
                .setSubject(userName)
                .claim("roles", String.join(",", roles))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // obtencion de username y roles desde el token
    public String getUsername(String token) {
        return getClaims(token).getSubject();
    }

    public Set<String> getRoles(String token) {
        String roles = (String) getClaims(token).get("roles");
        return Set.of(roles.split(","));
    }

    // validacion de token expirado
    public boolean validateToken(String token) {
        try {
            Claims claims = getClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    // extraccion de datos del token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}