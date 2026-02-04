package com.ecommerce.app.ui

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ecommerce.app.api.RetrofitClient
import com.ecommerce.app.models.Product
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ProductViewModel : ViewModel() {
    private val _products = MutableStateFlow<List<Product>>(emptyList())
    val products: StateFlow<List<Product>> = _products

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    fun fetchProducts() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                Log.d("ProductViewModel", "Fetching products...")
                val result = RetrofitClient.apiService.getAllProducts()
                Log.d("ProductViewModel", "Success: ${result.size} products")
                _products.value = result
            } catch (e: Exception) {
                Log.e("ProductViewModel", "Error: ${e.message}", e)
            } finally {
                _isLoading.value = false
            }
        }
    }
}
