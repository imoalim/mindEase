package com.example.mindEase.config.security.token.impl;

import com.example.mindEase.config.security.token.AccessToken;
import com.example.mindEase.config.security.token.AccessTokenDecoder;
import com.example.mindEase.config.security.token.AccessTokenEncoder;
import com.example.mindEase.config.security.token.exception.InvalidAccessTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AccessTokenEncoderDecoderImpl implements AccessTokenEncoder, AccessTokenDecoder {
    private final Key key;

    public AccessTokenEncoderDecoderImpl(@Value("E91E158E4C6656F68B1B5D1C316766DE98D2AD6EF3BFB44F78E9CFCDF5") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public String encode(AccessToken accessToken) {
        Map<String, Object> claimsMap = new HashMap<>();
        if (!CollectionUtils.isEmpty(accessToken.getRoles())) {
            claimsMap.put("roles", accessToken.getRoles());
        }
        if (accessToken.getEmail() != null) {
            claimsMap.put("userId", accessToken.getUserId());
            claimsMap.put("verified", accessToken.getVerified());
        }


        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(accessToken.getEmail())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(30, ChronoUnit.MINUTES)))
                .addClaims(claimsMap)
                .signWith(key)
                .compact();
    }

    @Override
    public AccessToken decode(String accessTokenEncoded) {
        try {
            Jwt<?, Claims> jwt = Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(accessTokenEncoded);
            Claims claims = jwt.getBody();

            List<String> roles = claims.get("roles", List.class);
            Long userId = claims.get("userId", Long.class);
            Boolean verified = claims.get("verified", Boolean.class);

            return new AccessTokenImpl(claims.getSubject(), userId, roles, verified);
        } catch (JwtException e) {
            throw new InvalidAccessTokenException(e.getMessage());
        }
    }
}
