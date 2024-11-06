package com.amt.sybex.exception;

import org.springframework.http.HttpStatus;

public class DIPAException extends RuntimeException {
	private final HttpStatus status;

    public DIPAException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
