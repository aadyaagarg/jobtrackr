package com.aadya.jobtrackr.controller;

import com.aadya.jobtrackr.dto.request.CreateJobRequest;
import com.aadya.jobtrackr.dto.response.JobResponse;
import com.aadya.jobtrackr.entity.Status;
import com.aadya.jobtrackr.service.JobService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class JobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<JobResponse> addJob(@Valid @RequestBody CreateJobRequest jobRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.addJob(jobRequest));
    }

    @GetMapping
    public ResponseEntity<Page<JobResponse>> getJobs(Pageable pageable, @RequestParam(required = false) Status status, @RequestParam(required = false) String company) {
        return ResponseEntity.ok(jobService.getJobs(pageable, status, company));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id, @Valid @RequestBody CreateJobRequest jobRequest) {
        return ResponseEntity.ok(jobService.updateJob(id, jobRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.deleteJobById(id));
    }
}
