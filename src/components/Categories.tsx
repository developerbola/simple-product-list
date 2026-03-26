import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/lib/localStorage";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");

  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const refreshCategories = () => setCategories(getCategories());

  const handleAdd = () => {
    if (!name.trim()) return;
    addCategory(name);
    setName("");
    refreshCategories();
    setAddDialogOpen(false);
  };

  const handleUpdate = () => {
    if (!editingCategory) return;
    updateCategory(editingCategory.id, name);
    setEditingCategory(null);
    setName("");
    refreshCategories();
    setEditDialogOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mb-4">
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setAddDialogOpen(true)}>Add category</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Input
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Button onClick={handleAdd}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.name}</TableCell>

              <TableCell className="flex gap-2">
                {/* EDIT */}
                <Dialog
                  open={editDialogOpen && editingCategory?.id === cat.id}
                  onOpenChange={setEditDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setEditingCategory(cat);
                        setName(cat.name);
                        setEditDialogOpen(true);
                      }}
                    >
                      <IconEdit size={16} />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Button onClick={handleUpdate}>Update</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* DELETE */}
                <Dialog
                  open={deleteId === cat.id}
                  onOpenChange={(open) => !open && setDeleteId(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => setDeleteId(cat.id)}
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
                          deleteCategory(cat.id);
                          refreshCategories();
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

export default Categories;
