const CATEGORY_KEY = "categories";
const PRODUCT_KEY = "products";

export function getCategories(): Category[] {
  const data = localStorage.getItem(CATEGORY_KEY);
  return data ? JSON.parse(data) : [];
}

export function addCategory(name: string): Category {
  const categories = getCategories();
  const newCategory: Category = {
    id: crypto.randomUUID(),
    name,
  };
  const updated = [...categories, newCategory];
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(updated));
  return newCategory;
}

export function updateCategory(id: string, name: string): void {
  const categories = getCategories();
  const updated = categories.map((c) => (c.id === id ? { ...c, name } : c));
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(updated));
}

export function deleteCategory(id: string): void {
  const categories = getCategories();
  const updated = categories.filter((c) => c.id !== id);
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(updated));
}

export function getProducts(): Product[] {
  const data = localStorage.getItem(PRODUCT_KEY);
  return data ? JSON.parse(data) : [];
}

export function addProduct(
  name: string,
  categoryId: string,
  description: string,
  price: number,
): Product {
  const products = getProducts();

  const now = new Date().toISOString();

  const newProduct: Product = {
    id: crypto.randomUUID(),
    name,
    categoryId,
    description,
    price,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [...products, newProduct];

  localStorage.setItem(PRODUCT_KEY, JSON.stringify(updated));

  return newProduct;
}

export function updateProduct(
  id: string,
  data: {
    name?: string;
    categoryId?: string;
    description?: string;
    price?: number;
  },
): void {
  const products = getProducts();

  const updated = products.map((p) =>
    p.id === id
      ? {
          ...p,
          ...data,
          updatedAt: new Date().toISOString(),
        }
      : p,
  );

  localStorage.setItem(PRODUCT_KEY, JSON.stringify(updated));
}

export function deleteProduct(id: string): void {
  const products = getProducts();
  const updated = products.filter((p) => p.id !== id);
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(updated));
}
