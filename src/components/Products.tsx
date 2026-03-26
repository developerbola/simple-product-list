import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Product = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

const items = [
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Input placeholder="Search" className="w-50" />
        <div className="flex items-center gap-2">
          <Select items={items}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger>
              <Button>Add new</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adding new product</DialogTitle>
              </DialogHeader>
              <div>
                <Input />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Products;
