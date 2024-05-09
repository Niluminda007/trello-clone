import { AuditLog, ACTION } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityType, entityTitle, entityId } = log;
  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLocaleLowerCase()} ${entityTitle}`;
    case ACTION.UPDATE:
      return `updated ${entityType.toLocaleLowerCase()} ${entityTitle}`;
    case ACTION.DELETE:
      return `deleted ${entityType.toLocaleLowerCase()} ${entityTitle}`;
    default:
      return `unknown action ${entityType.toLocaleLowerCase()} ${entityTitle}`;
  }
};
