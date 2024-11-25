package com.example.mindEase.dto;

import com.example.mindEase.user.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Data
@Getter
@Setter
public class UserQuestionnaireRequest {

    private int q2;

    private int q20;

    private int q22;

    private int q23;

    private int q24;

    private int q25;

    private int q26;

    private int q29;

    private int q30;

    private int q31;

    private int q32;

    private Long userId;
}
