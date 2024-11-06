package com.amt.sybex.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.amt.sybex.model.Product;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@Slf4j
public class ProductService {
	
	private static final Logger logger = LoggerFactory.getLogger(ProductService.class);
	
	private List<Product> productList = new ArrayList<Product>();
	
	public ProductService() {
		logger.info("Adding products");
		productList.add(new Product("dp1", "Demo Product 1", "This is a demo product 1", 200.50));
		productList.add(new Product("dp2", "Demo Product 2", "This is a demo product 2", 300.25));
	}
	
	public Product add(Product product) {
		product.setProductId(UUID.randomUUID().toString());
		productList.add(product);
		return product;
	}
	
	public List<Product> getAllProducts() {
		logger.info("Adding products - {}", productList);
		return productList;
	}
	
	public void removeProduct(String productId) {
		productList.removeIf(product -> product.getProductId().equals(productId));
	}
}
