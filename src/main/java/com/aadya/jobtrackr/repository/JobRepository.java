package com.aadya.jobtrackr.repository;

import com.aadya.jobtrackr.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
