package com.aadya.jobtrackr.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {
    @GetMapping("/get")
    public String getApplication() {
        return "success";
    }
}
