package com.ecommerce.app.api

import retrofit2.http.*
import com.ecommerce.app.models.Product

interface ApiService {
    @GET("api/products")
    suspend fun getAllProducts(): List<Product>

    @GET("api/products/{id}")
    suspend fun getProductById(@Path("id") id: Int): Product

    @POST("api/products")
    suspend fun createProduct(@Body product: Product): Product

    @PUT("api/products/{id}")
    suspend fun updateProduct(@Path("id") id: Int, @Body product: Product): Product

    @DELETE("api/products/{id}")
    suspend fun deleteProduct(@Path("id") id: Int)
}
