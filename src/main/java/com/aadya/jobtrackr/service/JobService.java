package com.aadya.jobtrackr.service;

import com.aadya.jobtrackr.dto.request.CreateJobRequest;
import com.aadya.jobtrackr.entity.Job;
import com.aadya.jobtrackr.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;

    public String addJob(CreateJobRequest jobRequest) {
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
        jobRepository.save(job);
        return "Job added successfully";
    }

    public List<Job> getJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("job not found"));
    }

    public String updateJob(Long id, CreateJobRequest jobRequest) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("job not found"));
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
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        jobRepository.delete(job);
        return "Job deleted successfully";
    }
}
