import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import type { ChangeEvent } from "react";

export type FieldConfig<T> = {
  name: keyof T;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "select";
  options?: { label: string; value: string }[];
};

type CrudFormFieldProps<T> = {
  field: FieldConfig<T>;
  value: T[keyof T] | undefined;
  onChange: (name: keyof T, value: T[keyof T]) => void;
};

export default function CrudFormField<T>({ field, value, onChange }: CrudFormFieldProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = field.type === "number" ? Number(e.target.value) : e.target.value;
    onChange(field.name, val as T[keyof T]);
  };

  switch (field.type) {
    case "text":
    case "number":
      return (
        <div className="grid gap-2">
          <Label>{field.label}</Label>
          <Input
            type={field.type}
            value={value ? String(value) : ""}
            onChange={handleChange}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="grid gap-2">
          <Label>{field.label}</Label>
          <Textarea
            value={value ? String(value) : ""}
            onChange={handleChange}
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={(checked) =>
              onChange(field.name, Boolean(checked) as T[keyof T])
            }
          />
          <Label>{field.label}</Label>
        </div>
      );

    case "select":
      return (
        <div className="grid gap-2">
          <Label>{field.label}</Label>
          <Select
            value={(value as string | undefined) ?? ""}
            onValueChange={(val) => onChange(field.name, val as T[keyof T])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Válassz..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    default:
      return null;
  }
}