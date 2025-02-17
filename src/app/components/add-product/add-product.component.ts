import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    specifications: {
      size: '',
      material: '',
      capacity: ''
    },
    image: null as File | null
  };

  constructor(private productService: ProductService, private router: Router) {}

  onFileSelected(event: any) {
    this.product.image = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());

    // 🛠 Send specifications as separate fields
    formData.append('specifications[size]', this.product.specifications.size);
    formData.append('specifications[material]', this.product.specifications.material);
    formData.append('specifications[capacity]', this.product.specifications.capacity);

    if (this.product.image) {
      formData.append('image', this.product.image);
    }

    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']); // Redirect to dashboard after adding
      },
      error: (error) => console.error('Error creating product:', error)
    });
  }
}
