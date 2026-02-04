package com.ecommerce.app.models

data class Product(
    val id: Int,
    val name: String,
    val description: String,
    val price: Double,
    val stock: Int,
    val imageUrl: String
)
