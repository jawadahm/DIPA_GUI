package com.amt.sybex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amt.sybex.exception.DIPAException;
import com.amt.sybex.model.Product;
import com.amt.sybex.service.ProductService;

@RestController
@RequestMapping("/api/v1/products")
public class ProductsController {
	
	@Autowired
	private ProductService productService;
	
	public Product createProduct(@RequestBody Product product) {
		return productService.add(product);
	}
	
	@GetMapping
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
		//throw new DIPAException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error Occured!!!!!!");
	}
	
	@DeleteMapping
	public void deleteProduct(@PathVariable String id) {
		productService.removeProduct(id);
	}
}
