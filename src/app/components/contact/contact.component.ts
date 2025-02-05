import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

  // Replace with your WhatsApp number
  private adminWhatsApp = '5551234567';

  onSubmit(): void {
    // Create WhatsApp message text with proper URL encoding
    const message = `Name: ${encodeURIComponent(this.formData.name)}%0AEmail: ${encodeURIComponent(this.formData.email)}%0AMessage: ${encodeURIComponent(this.formData.message)}`;
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${this.adminWhatsApp}?text=${message}`;
    
    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
  }
}