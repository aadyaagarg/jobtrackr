package com.aadya.jobtrackr.repository;

import com.aadya.jobtrackr.entity.Job;
import com.aadya.jobtrackr.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {
    Page<Job> findAll(Specification<Job> specification, Pageable pageable);

    Optional<Job> findByIdAndUser(Long id, User user);
}
