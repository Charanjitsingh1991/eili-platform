type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown> | undefined;
  timestamp: string;
}

function createEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
): LogEntry {
  return {
    level,
    message,
    context,
    timestamp: new Date().toISOString(),
  };
}

function scrubPii(entry: LogEntry): LogEntry {
  if (!entry.context) return entry;

  const piiKeys = ["email", "name", "displayName", "display_name", "token"];
  const scrubbed = { ...entry.context };

  for (const key of piiKeys) {
    if (key in scrubbed) {
      scrubbed[key] = "[REDACTED]";
    }
  }

  return { ...entry, context: scrubbed };
}

function output(entry: LogEntry): void {
  const clean = scrubPii(entry);
  const prefix = `[${clean.timestamp}] [${clean.level.toUpperCase()}]`;

  switch (clean.level) {
    case "error":
      // eslint-disable-next-line no-console
      console.error(prefix, clean.message, clean.context ?? "");
      break;
    case "warn":
      // eslint-disable-next-line no-console
      console.warn(prefix, clean.message, clean.context ?? "");
      break;
    case "info":
      // eslint-disable-next-line no-console
      console.info(prefix, clean.message, clean.context ?? "");
      break;
    case "debug":
      // eslint-disable-next-line no-console
      console.debug(prefix, clean.message, clean.context ?? "");
      break;
  }
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) =>
    output(createEntry("debug", message, context)),
  info: (message: string, context?: Record<string, unknown>) =>
    output(createEntry("info", message, context)),
  warn: (message: string, context?: Record<string, unknown>) =>
    output(createEntry("warn", message, context)),
  error: (message: string, context?: Record<string, unknown>) =>
    output(createEntry("error", message, context)),
};
