package com.aadya.jobtrackr.controller;

import com.aadya.jobtrackr.dto.request.CreateJobRequest;
import com.aadya.jobtrackr.entity.Job;
import com.aadya.jobtrackr.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<String> addJob(@Valid @RequestBody CreateJobRequest jobRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(jobService.addJob(jobRequest));
    }

    @GetMapping
    public ResponseEntity<List<Job>> getJobs() {
        return ResponseEntity.ok(jobService.getJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateJob(@PathVariable Long id, @Valid @RequestBody CreateJobRequest jobRequest) {
        return ResponseEntity.ok(jobService.updateJob(id, jobRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.deleteJobById(id));
    }
}
