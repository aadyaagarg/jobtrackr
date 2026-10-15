package com.aadya.jobtrackr.dto.request;

import com.aadya.jobtrackr.entity.Source;
import com.aadya.jobtrackr.entity.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateJobRequest {
    @NotBlank(message = "Company is required")
    private String company;
    @NotBlank(message = "Job title is required")
    private String jobTitle;
    @NotBlank(message = "Location is required")
    private String location;
    private String jobLink;
    @NotNull(message = "Applied date is required")
    private LocalDate appliedDate;
    @NotNull(message = "Status is required")
    private Status status;
    private Integer minSalary;
    private Integer maxSalary;
    @NotNull(message = "Source is required")
    private Source source;
    private String notes;
}
