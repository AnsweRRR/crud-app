export type User = {
  id: number;
  name: string;
  comment: string;
  isActive: boolean;
  role: "admin" | "user" | "guest";
};