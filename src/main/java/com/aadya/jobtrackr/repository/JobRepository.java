package com.aadya.jobtrackr.repository;

import com.aadya.jobtrackr.entity.Job;
import com.aadya.jobtrackr.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findByUser(User user, Pageable pageable);

    Optional<Job> findByIdAndUser(Long id, User user);
}
