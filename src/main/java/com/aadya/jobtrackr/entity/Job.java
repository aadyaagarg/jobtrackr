package com.aadya.jobtrackr.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Table(name = "jobs")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String company;
    private String jobTitle;
    private String location;
    private String jobLink;
    private LocalDate appliedDate;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Integer minSalary;
    private Integer maxSalary;
    @Enumerated(EnumType.STRING)
    private Source source;
    private String notes;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
}
