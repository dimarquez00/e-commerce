package com.uade.tpo.e_commerce.security;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // utilidad para el jwt

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        // chequea si hay header
        if (header != null) {

            // verifica si empieza con Bearer
            if (header.startsWith("Bearer ")) {

                String token = header.substring(7);

                // valida el token
                if (jwtUtil.validateToken(token)) {

                    String username = jwtUtil.getUsername(token);
                    Set<String> roles = jwtUtil.getRoles(token);

                    // transforma roles
                    var authorities = roles.stream()
                            .map(r -> new SimpleGrantedAuthority(r))
                            .collect(Collectors.toList());

                    // crea autenticacion
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null,
                            authorities);

                    // setea en el contexto
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }

        // continua el filtro
        filterChain.doFilter(request, response);
    }

}