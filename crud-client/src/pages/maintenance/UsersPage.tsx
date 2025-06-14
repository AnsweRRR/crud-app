import { useMemo } from "react";
import { useCrud } from "@/hooks/useCrud";
import CrudPage from "@/components/CRUD/CrudPage";
import type { FieldConfig } from "@/components/CRUD/CrudFormField";
import type { User } from "@/@types/user";
import { createCrudClient } from "@/api/crudClient";
import useLocales from "@/locales/useLocales";

type ColumnConfig<T> = {
  key: keyof T;
  label: string;
};

export default function UserPage() {
  const { translate: t } = useLocales();
  const client = useMemo(() => createCrudClient<User>("/api/user"), []);
  const crud = useCrud<User>(client);

  const userColumns = useMemo<ColumnConfig<User>[]>(() => [
    { key: "name", label: t('pages.users.columns.name') },
    { key: "comment", label: t('pages.users.columns.comment') },
    { key: "isActive", label: t('pages.users.columns.isActive') },
    { key: "role", label: t('pages.users.columns.role') },
  ], [t]);

  const userFields = useMemo<FieldConfig<User>[]>(() => [
    { name: "name", label: t('pages.users.fields.name'), type: "text" },
    { name: "comment", label: t('pages.users.fields.comment'), type: "textarea" },
    { name: "isActive", label: t('pages.users.fields.isActive'), type: "checkbox" },
    {
      name: "role",
      label: t('pages.users.fields.role'),
      type: "select",
      options: [
        { label: t('pages.users.roles.admin'), value: "admin" },
        { label: t('pages.users.roles.user'), value: "user" },
        { label: t('pages.users.roles.guest'), value: "guest" },
      ],
    },
  ], [t]);

  return (
    <CrudPage<User>
      client={client}
      title={t('pages.users.title')}
      columns={userColumns}
      fields={userFields}
      {...crud}
    />
  );
}