package com.amt.sybex.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ErrorResponse {
    private Date timestamp;
    private String message;
    private HttpStatus errorCode;

    public ErrorResponse(HttpStatus errorCode, Date timestamp, String message) {
        super();
        this.errorCode = errorCode;
        this.timestamp = timestamp;
        this.message = message;
    }
}
