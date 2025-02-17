import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    specifications: {
      size: '',
      material: '',
      capacity: ''
    }
  };
  productId: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;

        // 🛠 Ensure `specifications` is an object (convert from string if needed)
        if (typeof this.product.specifications === 'string') {
          try {
            this.product.specifications = JSON.parse(this.product.specifications);
          } catch (error) {
            console.error('Error parsing specifications:', error);
            this.product.specifications = { size: '', material: '', capacity: '' }; // Set default
          }
        }

        // 🛠 Ensure `specifications` is a valid object
        this.product.specifications = {
          size: this.product.specifications?.size || '',
          material: this.product.specifications?.material || '',
          capacity: this.product.specifications?.capacity || ''
        };
      },
      error: (error) => console.error('Error fetching product:', error)
    });
  }

  onUpdate(): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
  
    // 🛠 Send specifications as separate fields
    formData.append('specifications[size]', this.product.specifications.size);
    formData.append('specifications[material]', this.product.specifications.material);
    formData.append('specifications[capacity]', this.product.specifications.capacity);
  
    this.productService.updateProduct(this.productId, formData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']); // Redirect to dashboard after update
      },
      error: (error) => console.error('Error updating product:', error)
    });
  }
  
}
