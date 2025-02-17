import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService, Product } from '../../services/product.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  private adminWhatsApp = '9746880258';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  contactViaWhatsApp(product: Product) {
    const priceInINR = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(product.price);
    
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${product.name}.

` +
      `Specifications:
` +
      `- Size: ${product.specifications.size}
` +
      `- Material: ${product.specifications.material}
` +
      `- Capacity: ${product.specifications.capacity}

` +
      `Price: ${priceInINR}

` +
      `Please provide more information.`
    );
    
    const whatsappUrl = `https://wa.me/${this.adminWhatsApp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
