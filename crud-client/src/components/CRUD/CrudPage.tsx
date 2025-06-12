import { useState } from "react";
import type { FieldConfig } from "./CrudFormField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash, History, ArrowUpDown } from "lucide-react";
import type { CrudClient } from "@/api/crudClient";
import type { Audit } from "@/@types/audit";
import AuditDialog from "./AuditDialog";
import CrudEditorDialog from "./CrudEditorDialog";
import type { ColumnDef, Column } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
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

type ColumnConfig<T> = {
  key: keyof T;
  label: string;
};

type CrudPageProps<T> = {
  client: CrudClient<T>;
  data: T[];
  auditData: Audit | null;
  loading: boolean;
  error: Error | null;
  create: (item: Partial<T>) => Promise<T>;
  update: (id: number, item: Partial<T>) => Promise<T>;
  remove: (ids: Array<number>) => Promise<Array<number>>;
  activate: (ids: Array<number>) => Promise<Array<number>>;
  inactivate: (ids: Array<number>) => Promise<Array<number>>;
  audit: (id: number) => Promise<Audit>;
  columns: ColumnConfig<T>[];
  fields: FieldConfig<T>[];
  title: string;
};

export default function CrudPage<T extends { id: number }>({
  title,
  columns,
  fields,
  data,
  auditData,
  create,
  update,
  remove,
  audit
}: CrudPageProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>({});
  const [editing, setEditing] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const startEdit = (item: T) => {
    setEditing(item);
    setFormData(item);
    setOpen(true);
  };

  const handleAuditOpen = async (id: number) => {
    audit(id);
    setAuditOpen(true);
  }

  const handleDelete = async (ids: number[]) => {
    await remove(ids);
    setSelectedRows([]);
    setItemToDelete(null);
    setDeleteDialogOpen(false);
  };

  const tableColumns: ColumnDef<T>[] = [
    ...columns.map((col) => ({
      accessorKey: col.key,
      header: ({ column }: { column: Column<T> }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            {col.label}
            {column.getIsSorted() === "asc" ? (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
        )
      },
      cell: ({ row }: { row: { getValue: (key: string) => T[keyof T]; original: T } }) => {
        const value = row.getValue(col.key as string);
        if (typeof value === "boolean") {
          return <Checkbox checked={value} disabled />;
        }
        return String(value ?? "");
      },
    })),
    {
      id: "actions",
      header: "Műveletek",
      cell: ({ row }: { row: { original: T } }) => {
        const item = row.original;
        return (
          <div className="flex justify-end space-x-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleAuditOpen(item.id)}
            >
              <History size={16} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => startEdit(item)}
            >
              <Pencil size={16} />
            </Button>
            <AlertDialog open={deleteDialogOpen && itemToDelete === item.id} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => setItemToDelete(item.id)}
                >
                  <Trash size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Biztosan törölni szeretnéd ezt az elemet?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Ez a művelet nem vonható vissza.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setItemToDelete(null)}>Mégse</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete([item.id])}>Törlés</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <CrudEditorDialog
          fields={fields}
          create={create}
          update={update}
          formData={formData}
          setFormData={setFormData}
          editing={editing}
          setEditing={setEditing}
          open={open}
          setOpen={setOpen}
          selectedRows={selectedRows}
          onDelete={handleDelete}
        />

        <AuditDialog auditData={auditData} auditOpen={auditOpen} setAuditOpen={setAuditOpen} />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <DataTable 
          columns={tableColumns} 
          data={data} 
          onRowSelectionChange={(rows) => setSelectedRows(rows)}
        />
      </div>
    </div>
  );
}
