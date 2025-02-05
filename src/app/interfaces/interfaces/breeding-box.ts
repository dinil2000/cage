export interface BreedingBox {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    specifications: {
      size: string;
      material: string;
      capacity: string;
    };
}
