package com.aadya.jobtrackr.dto.request;

import com.aadya.jobtrackr.entity.Source;
import com.aadya.jobtrackr.entity.Status;
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
    private String company;
    private String jobTitle;
    private String location;
    private String jobLink;
    private LocalDate appliedDate;
    private Status status;
    private Integer minSalary;
    private Integer maxSalary;
    private Source source;
    private String notes;
}
