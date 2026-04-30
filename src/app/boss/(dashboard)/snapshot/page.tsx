
import { SnapshotGenerator } from '@/app/boss/snapshot/snapshot-generator';

export default function SnapshotPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Gerenciar Snapshot Evolutivo do Projeto
        </h1>
        <p className="text-muted-foreground">
          Gere um snapshot completo do estado atual do sistema para
          documentação, auditoria e versionamento.
        </p>
      </div>
      <SnapshotGenerator />
    </div>
  );
}
