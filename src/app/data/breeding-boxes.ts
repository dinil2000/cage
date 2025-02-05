import { BreedingBox } from '../interfaces/interfaces/breeding-box';

export const BREEDING_BOXES: BreedingBox[] = [
    {
      id: 1,
      name: "Premium Bird Breeding Box",
      price: 149.99,
      description: "Professional grade breeding box with superior ventilation",
      image: "/images/breeding-boxes/one.jpg",  // Path from public folder
      specifications: {
        size: "18\" x 12\" x 12\"",
        material: "High-grade plastic",
        capacity: "Single pair"
      }
    },
    {
      id: 2,
      name: "Large Colony Breeding Box",
      price: 299.99,
      description: "Spacious colony breeding box for multiple pairs",
      image: "/images/breeding-boxes/two.jpg",
      specifications: {
        size: "36\" x 24\" x 18\"",
        material: "Reinforced plastic",
        capacity: "Multiple pairs"
      }
    },
    {
      id: 3,
      name: "Compact Breeding Box",
      price: 89.99,
      description: "Space-efficient design for small breeding operations",
      image: "/images/breeding-boxes/three.jpg",
      specifications: {
        size: "12\" x 8\" x 8\"",
        material: "Durable plastic",
        capacity: "Single pair"
      }
    }
];