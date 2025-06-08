export type Audit = {
  id: number;
  createDateTime: Date;
  createdBy: string;
  modifyDateTime: Date | null;
  modifiedBy: string | null;
};