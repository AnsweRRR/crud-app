import CrudFormField, { type FieldConfig } from "./CrudFormField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";

type CrudEditorDialogProps<T> = {
  fields: FieldConfig<T>[];
  create: (item: Partial<T>) => Promise<T>;
  update: (id: number, item: Partial<T>) => Promise<T>;
  formData: Partial<T>;
  setFormData: (data: Partial<T>) => void;
  editing: T | null;
  setEditing: (item: T | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRows: number[];
  onDelete: (ids: number[]) => Promise<void>;
};

function CrudEditorDialog<T extends { id: number }> ({ 
  fields, 
  create, 
  update, 
  formData, 
  setFormData, 
  editing, 
  setEditing, 
  open, 
  setOpen,
  selectedRows,
  onDelete
} : CrudEditorDialogProps<T>) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const reset = () => {
    setFormData({});
    setEditing(null);
  };

  const handleSubmit = async () => {
    if (editing) {
      await update(editing.id, formData);
    } else {
      await create(formData);
    }
    setOpen(false);
    reset();
  };

  const handleDelete = async () => {
    await onDelete(selectedRows);
    setDeleteDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="gap-2 h-10"
            disabled={selectedRows.length === 0}
          >
            <Trash size={16} />
            Kijelölt elemek törlése
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Biztosan törölni szeretnéd a kijelölt elemeket?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedRows.length} db kijelölt elem törlésre kerül. Ez a művelet nem vonható vissza.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Mégse</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Törlés</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={reset} className="h-10">Új létrehozása</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Szerkesztés" : "Új elem"}</DialogTitle>
            <DialogDescription>
              Töltsd ki az alábbi mezőket, majd kattints a Mentés gombra.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <CrudFormField
                key={String(field.name)}
                field={field}
                value={formData[field.name]}
                onChange={(name, val) => {
                  const newData = { ...formData, [name]: val } as Partial<T>;
                  setFormData(newData);
                }}
              />
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Mégse
            </Button>
            <Button onClick={handleSubmit}>Mentés</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CrudEditorDialog;