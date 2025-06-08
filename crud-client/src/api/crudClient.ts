import type { Audit } from "@/@types/audit";
import axios from "@/utils/axios";

export type CrudClient<T> = {
  getAll: () => Promise<T[]>;
  getById: (id: number) => Promise<T>;
  create: (dto: Partial<T>) => Promise<T>;
  update: (id: number, dto: Partial<T>) => Promise<T>;
  delete: (ids: Array<number>) => Promise<Array<number>>;
  activate: (ids: Array<number>) => Promise<Array<number>>;
  inactivate: (ids: Array<number>) => Promise<Array<number>>;
  audit: (id: number) => Promise<Audit>;
};

export function createCrudClient<T>(baseEndpoint: string): CrudClient<T> {
  return {
    getAll: async () => {
      try {
        const res = await axios.get(baseEndpoint);
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getById: async (id: number) => {
      try {
        const res = await axios.get(`${baseEndpoint}/${id}`);
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    create: async (dto: Partial<T>) => {
      try {
        const res = await axios.post(`${baseEndpoint}/create`, dto);
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    update: async (id: number, dto: Partial<T>) => {
      try {
        const res = await axios.patch(`${baseEndpoint}/edit`, dto, {
          params: { id },
        });
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    delete: async (ids: Array<number>) => {
      try {
        const res = await axios.delete(`${baseEndpoint}/delete`, {
          data: ids,
        });
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    activate: async (ids: Array<number>) => {
      try {
        const res = await axios.post(`${baseEndpoint}/activate`, {
          data: ids,
        });
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    inactivate: async (ids: Array<number>) => {
      try {
        const res = await axios.post(`${baseEndpoint}/inactivate`, {
          data: ids,
        });
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    audit: async (id: number) => {
      try {
        const res = await axios.get(`${baseEndpoint}/audit/${id}`);
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };
}