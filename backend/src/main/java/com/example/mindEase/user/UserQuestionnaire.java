package com.example.mindEase.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "userquestionnaire")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserQuestionnaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private int q2;
    @NotNull
    private int q20;
    @NotNull
    private int q22;
    @NotNull
    private int q23;
    @NotNull
    private int q24;
    @NotNull
    private int q25;
    @NotNull
    private int q26;
    @NotNull
    private int q29;
    @NotNull
    private int q30;
    @NotNull
    private int q31;
    @NotNull
    private int q32;

    @NotNull
    @Lob
    private String recommendation;

    @OneToOne
    //@NotNull
    @JoinColumn(name = "user_id")
    private User user;
}
