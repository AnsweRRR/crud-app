import type { Audit } from "@/@types/audit";
import type { CrudClient } from "@/api/crudClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useCrud<T extends { id: number }>(client: CrudClient<T>) {
  const [data, setData] = useState<T[]>([]);
  const [auditData, setAuditData] = useState<Audit | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const getAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await client.getAll();
      setData(all);
    } catch (error) {
      console.error(error);
      setError(error as Error);
      navigate("/500");
    } finally {
      setLoading(false);
    }
  };

  const create = async (item: Partial<T>) => {
    try {
      const res = await client.create(item);
      setData((prev) => [res, ...prev]);
      return res;
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Hiba történt a létrehozás során");
      throw err;
    }
  };

  const update = async (id: number, item: Partial<T>) => {
    try {
      const res = await client.update(id, item);
      setData((prev) =>
        prev.map((d) => (d.id === id ? res : d))
      );
      return res;
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Hiba történt a frissítés során", {
        className: "bg-red-500 text-white border-red-600",
      });
      throw err;
    }
  };

  const remove = async (ids: Array<number>) => {
    try {
      const res = await client.delete(ids);
      setData((prev) => prev.filter((d) => !ids.includes(d.id)));
      return res;
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Hiba történt a törlés során", {
        className: "bg-red-500 text-white border-red-600",
      });
      throw err;
    }
  };

  const activate = async (ids: Array<number>) => {
    try {
      const res = await client.activate(ids);
      setData((prev) =>
        prev.map((item) =>
          ids.includes(item.id) ? { ...item, isActive: true } : item
        )
      );
      return res;
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Hiba történt az aktiválás során", {
        className: "bg-red-500 text-white border-red-600",
      });
      throw err;
    }
  };

  const inactivate = async (ids: Array<number>) => {
    try {
      const res = await client.inactivate(ids);
      setData((prev) =>
        prev.map((item) =>
          ids.includes(item.id) ? { ...item, isActive: false } : item
        )
      );
      return res;
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Hiba történt a deaktiválás során", {
        className: "bg-red-500 text-white border-red-600",
      });
      throw err;
    }
  };

  const audit = async (id: number) => {
    try {
      const res = await client.audit(id);
      setAuditData(res);
      return res;
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Hiba történt az audit lekérdezés során", {
        className: "bg-red-500 text-white border-red-600",
      });
      throw err;
    }
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    auditData,
    loading,
    error,
    create,
    update,
    remove,
    activate,
    inactivate,
    audit,
    getAllData,
  };
}