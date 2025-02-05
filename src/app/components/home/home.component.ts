import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreedingBox } from '../../interfaces/interfaces/breeding-box';
import { BREEDING_BOXES } from '../../data/breeding-boxes';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  breedingBoxes: BreedingBox[] = BREEDING_BOXES;
  
  // Replace with your actual WhatsApp business number
  private adminWhatsApp = '7012027492';

  contactViaWhatsApp(box: BreedingBox) {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${box.name}.\n\n` +
      `Specifications:\n` +
      `- Size: ${box.specifications.size}\n` +
      `- Material: ${box.specifications.material}\n` +
      `- Capacity: ${box.specifications.capacity}\n\n` +
      `Price: $${box.price.toFixed(2)}\n\n` +
      `Please provide more information.`
    );
    
    const whatsappUrl = `https://wa.me/${this.adminWhatsApp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
