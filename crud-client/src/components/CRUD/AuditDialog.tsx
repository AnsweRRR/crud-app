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
import LoadingScreen from "../LoadingScreen";
import useLocales from "@/locales/useLocales";

type AuditDialogProps = {
  auditData: Audit | null;
  auditOpen: boolean;
  setAuditOpen: (open: boolean) => void;
}

const AuditDialog = ({ auditData, auditOpen, setAuditOpen } : AuditDialogProps) => {
  const { translate: t } = useLocales();

  return (
    <Dialog open={auditOpen} onOpenChange={setAuditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('crud.audit_data')}</DialogTitle>
          <DialogDescription>
            {t('crud.audit_description')}
          </DialogDescription>
        </DialogHeader>
        {auditData ? (
          <div className="grid gap-2 py-4 text-sm">
            <div><strong>{t('crud.id')}:</strong> {auditData.id}</div>
            <div><strong>{t('crud.created_at')}:</strong> {fDate(auditData.createDateTime)}</div>
            <div><strong>{t('crud.created_by')}:</strong> {auditData.createdBy}</div>
            <div><strong>{t('crud.modified_at')}:</strong> {fDate(auditData.modifyDateTime)}</div>
            <div><strong>{t('crud.modified_by')}:</strong> {auditData.modifiedBy}</div>
          </div>
        ) : (
          <LoadingScreen />
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setAuditOpen(false)}>{t('crud.close')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuditDialog;