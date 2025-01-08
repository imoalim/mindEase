package com.example.mindEase.dto;

import com.example.mindEase.user.User;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnavailableTimeslotsRequest {
    private String dateToCheck;
    private Long therapistId;
}
