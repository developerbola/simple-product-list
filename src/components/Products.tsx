import { useEffect, useState } from "react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  addProduct,
  deleteProduct,
  getCategories,
  getProducts,
  updateProduct,
} from "@/lib/localStorage";

const formatDate = (date: string) => new Date(date).toLocaleString("en-US");

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState("");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>({ key: "createdAt", direction: "asc" });

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
  }, []);

  const refreshProducts = () => setProducts(getProducts());

  const handleAdd = () => {
    if (!name || !categoryId || price <= 0) return;
    addProduct(name, categoryId, description, price);
    setName("");
    setDescription("");
    setPrice(0);
    setCategoryId("");
    refreshProducts();
    setAddDialogOpen(false);
  };

  const handleUpdate = () => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, { name, description, price, categoryId });
    setEditingProduct(null);
    refreshProducts();
    setEditDialogOpen(false);
  };

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || "-";

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.categoryId === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig) return 0;
    let { key, direction } = sortConfig;
    let aValue: any = a[key];
    let bValue: any = b[key];
    if (key === "createdAt" || key === "updatedAt") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    let cmp = 0;
    if (typeof aValue === "string") cmp = aValue.localeCompare(bValue);
    else if (typeof aValue === "number") cmp = aValue - bValue;
    return direction === "asc" ? cmp : -cmp;
  });

  const handleSortClick = (key: string) => {
    if (sortConfig?.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4 gap-2">
        <Input
          placeholder="Search"
          className="w-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setAddDialogOpen(true)}>Add new</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adding new product</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <Button onClick={handleAdd}>Create Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSortClick("name")}
            >
              Name{" "}
              {sortConfig?.key === "name"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSortClick("price")}
            >
              Price{" "}
              {sortConfig?.key === "price"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSortClick("createdAt")}
            >
              Created{" "}
              {sortConfig?.key === "createdAt"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSortClick("updatedAt")}
            >
              Updated{" "}
              {sortConfig?.key === "updatedAt"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedProducts.map((pr) => (
            <TableRow key={pr.id}>
              <TableCell>{pr.name}</TableCell>
              <TableCell>{getCategoryName(pr.categoryId)}</TableCell>
              <TableCell>{pr.description}</TableCell>
              <TableCell>${pr.price}</TableCell>
              <TableCell>{formatDate(pr.createdAt)}</TableCell>
              <TableCell>{formatDate(pr.updatedAt)}</TableCell>
              <TableCell className="flex gap-2">
                <Dialog
                  open={editDialogOpen && editingProduct?.id === pr.id}
                  onOpenChange={setEditDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setEditingProduct(pr);
                        setName(pr.name);
                        setDescription(pr.description);
                        setPrice(pr.price);
                        setCategoryId(pr.categoryId);
                        setEditDialogOpen(true);
                      }}
                    >
                      <IconEdit size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                      />
                      <Button onClick={handleUpdate}>Update Product</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={deleteId === pr.id}
                  onOpenChange={() => setDeleteId(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => setDeleteId(pr.id)}
                    >
                      <IconTrash size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete?
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        onClick={() => {
                          deleteProduct(pr.id);
                          refreshProducts();
                          setDeleteId(null);
                        }}
                      >
                        Yes delete
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Products;
