package com.amt.sybex.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Product {
	private String name;
	private String productId;
	private String description;
	private double price;
}
