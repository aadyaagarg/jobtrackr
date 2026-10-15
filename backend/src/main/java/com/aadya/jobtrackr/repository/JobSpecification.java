package com.aadya.jobtrackr.repository;

import com.aadya.jobtrackr.entity.Job;
import com.aadya.jobtrackr.entity.Status;
import com.aadya.jobtrackr.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class JobSpecification {
    public static Specification<Job> hasStatus(Status status) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<Job> hasUser(User user) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("user"), user);
    }

    public static Specification<Job> hasCompany(String company) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("company")),
                        "%" + company.toLowerCase() + "%"
                );
    }
}
