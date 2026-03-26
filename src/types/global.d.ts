declare global {
  type Product = {
    id: string;
    name: string;
    categoryId: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
  };

  type Category = {
    id: string;
    name: string;
  };
}
export {};
