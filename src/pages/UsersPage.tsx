import { useMemo } from "react";
import { useCrud } from "@/hooks/useCrud";
import CrudPage from "@/components/CRUD/CrudPage";
import type { FieldConfig } from "@/components/CRUD/CrudFormField";
import type { User } from "@/@types/user";
import { createCrudClient } from "@/api/crudClient";

const userColumns: { key: keyof User; label: string }[] = [
  { key: "name", label: "Név" },
  { key: "comment", label: "Megjegyzés" },
  { key: "isActive", label: "Aktív" },
  { key: "role", label: "Szerep" },
];

const userFields: FieldConfig<User>[] = [
  { name: "name", label: "Név", type: "text" },
  { name: "comment", label: "Megjegyzés", type: "textarea" },
  { name: "isActive", label: "Aktív", type: "checkbox" },
  {
    name: "role",
    label: "Szerep",
    type: "select",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Felhasználó", value: "user" },
      { label: "Vendég", value: "guest" },
    ],
  },
];

export default function UserPage() {
  const client = useMemo(() => createCrudClient<User>("/api/user"), []);
  const crud = useCrud<User>(client);

  return (
    <CrudPage<User>
      client={client}
      title="Felhasználók"
      columns={userColumns}
      fields={userFields}
      {...crud}
    />
  );
}