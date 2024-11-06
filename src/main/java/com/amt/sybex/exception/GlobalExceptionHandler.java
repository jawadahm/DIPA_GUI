package com.amt.sybex.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorResponse handleResourceNotFound(ResourceNotFoundException ex) {
    	return new ErrorResponse(HttpStatus.NOT_FOUND, new Date(), ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorResponse handleUnauthorized(UnauthorizedException ex) {
        return new ErrorResponse(HttpStatus.UNAUTHORIZED, new Date(), ex.getMessage());
    }

    @ExceptionHandler(InternalServerException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorResponse handleServerException(InternalServerException ex) {
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, new Date(), ex.getMessage());
    }

    // Generic Exception Handler
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorResponse handleGenericException(Exception ex) {
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, new Date(), "An unexpected error occurred.");
    }
}
