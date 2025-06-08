import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fDate } from "@/utils/formatTime";
import type { Audit } from "@/@types/audit";

type AuditDialogProps = {
  auditData: Audit | null;
  auditOpen: boolean;
  setAuditOpen: (open: boolean) => void;
}

const AuditDialog = ({ auditData, auditOpen, setAuditOpen } : AuditDialogProps) => {
  return (
    <Dialog open={auditOpen} onOpenChange={setAuditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Audit adatok</DialogTitle>
          <DialogDescription>
            A kiválasztott elem audit információi.
          </DialogDescription>
        </DialogHeader>
        {auditData ? (
          <div className="grid gap-2 py-4 text-sm">
            <div><strong>ID:</strong> {auditData.id}</div>
            <div><strong>Létrehozva:</strong> {fDate(auditData.createDateTime)}</div>
            <div><strong>Létrehozta:</strong> {auditData.createdBy}</div>
            <div><strong>Módosítva:</strong> {fDate(auditData.modifyDateTime)}</div>
            <div><strong>Módosította:</strong> {auditData.modifiedBy}</div>
          </div>
        ) : (
          <div>Betöltés...</div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setAuditOpen(false)}>Bezárás</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuditDialog;