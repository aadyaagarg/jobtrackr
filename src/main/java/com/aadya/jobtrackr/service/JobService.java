package com.aadya.jobtrackr.service;

import com.aadya.jobtrackr.dto.request.CreateJobRequest;
import com.aadya.jobtrackr.dto.response.JobResponse;
import com.aadya.jobtrackr.entity.Job;
import com.aadya.jobtrackr.entity.User;
import com.aadya.jobtrackr.exception.JobNotFoundException;
import com.aadya.jobtrackr.repository.JobRepository;
import com.aadya.jobtrackr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobResponse addJob(CreateJobRequest jobRequest) {
        User currentUser = getCurrentUser();
        Job job = new Job();
        mapRequestToJob(jobRequest, job);
        job.setUser(currentUser);
        jobRepository.save(job);
        return mapToResponse(job);
    }

    public List<JobResponse> getJobs() {
        User currentUser = getCurrentUser();
        List<Job> jobs = jobRepository.findByUser(currentUser);
        List<JobResponse> jobResponses = new ArrayList<>();
        for (Job job : jobs) {
            jobResponses.add(mapToResponse(job));
        }
        return jobResponses;
    }

    public JobResponse getJobById(Long id) {
        User currentUser = getCurrentUser();
        Job job = jobRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));
        return mapToResponse(job);
    }

    public JobResponse updateJob(Long id, CreateJobRequest jobRequest) {
        User currentUser = getCurrentUser();
        Job job = jobRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));
        mapRequestToJob(jobRequest, job);
        jobRepository.save(job);
        return mapToResponse(job);
    }

    public String deleteJobById(Long id) {
        User currentUser = getCurrentUser();
        Job job = jobRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));
        jobRepository.delete(job);
        return "Job deleted successfully";
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
    }

    private JobResponse mapToResponse(Job job) {
        JobResponse response = new JobResponse();
        response.setId(job.getId());
        response.setCompany(job.getCompany());
        response.setJobTitle(job.getJobTitle());
        response.setLocation(job.getLocation());
        response.setJobLink(job.getJobLink());
        response.setAppliedDate(job.getAppliedDate());
        response.setStatus(job.getStatus());
        response.setMinSalary(job.getMinSalary());
        response.setMaxSalary(job.getMaxSalary());
        response.setSource(job.getSource());
        response.setNotes(job.getNotes());
        return response;
    }

    private void mapRequestToJob(CreateJobRequest jobRequest, Job job) {
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
    }
}
