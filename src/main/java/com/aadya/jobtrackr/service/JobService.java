package com.aadya.jobtrackr.service;

import com.aadya.jobtrackr.dto.request.CreateJobRequest;
import com.aadya.jobtrackr.entity.Job;
import com.aadya.jobtrackr.entity.User;
import com.aadya.jobtrackr.repository.JobRepository;
import com.aadya.jobtrackr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
    }

    public String addJob(CreateJobRequest jobRequest) {
        User currentUser = getCurrentUser();
        Job job = new Job();
        job.setCompany(jobRequest.getCompany());
        job.setJobTitle(jobRequest.getJobTitle());
        job.setLocation(jobRequest.getLocation());
        job.setJobLink(jobRequest.getJobLink());
        job.setAppliedDate(jobRequest.getAppliedDate());
        job.setStatus(jobRequest.getStatus());
        job.setMinSalary(jobRequest.getMinSalary());
        job.setMaxSalary(jobRequest.getMaxSalary());
        job.setSource(jobRequest.getSource());
        job.setNotes(jobRequest.getNotes());
        job.setUser(currentUser);
        jobRepository.save(job);
        return "Job added successfully";
    }

    public List<Job> getJobs() {
        User currentUser = getCurrentUser();
        return jobRepository.findByUser(currentUser);
    }

    public Job getJobById(Long id) {
        User currentUser = getCurrentUser();
        return jobRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new RuntimeException("job not found"));
    }

    public String updateJob(Long id, CreateJobRequest jobRequest) {
        User currentUser = getCurrentUser();
        Job job = jobRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new RuntimeException("job not found"));
        job.setCompany(jobRequest.getCompany());
        job.setJobTitle(jobRequest.getJobTitle());
        job.setLocation(jobRequest.getLocation());
        job.setJobLink(jobRequest.getJobLink());
        job.setAppliedDate(jobRequest.getAppliedDate());
        job.setStatus(jobRequest.getStatus());
        job.setMinSalary(jobRequest.getMinSalary());
        job.setMaxSalary(jobRequest.getMaxSalary());
        job.setSource(jobRequest.getSource());
        job.setNotes(jobRequest.getNotes());
        jobRepository.save(job);
        return "Job updated successfully";
    }

    public String deleteJobById(Long id) {
        User currentUser = getCurrentUser();
        Job job = jobRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        jobRepository.delete(job);
        return "Job deleted successfully";
    }
}
