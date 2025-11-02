export type LogLevel = "info" | "warn" | "error" | "debug";

export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  log(level: LogLevel, message: string, meta?: unknown) {
    const time = new Date().toISOString();
    console.log(`[${time}] [${this.context}] [${level.toUpperCase()}]`, message, meta ?? "");
  }

  info(message: string, meta?: unknown) {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: unknown) {
    this.log("warn", message, meta);
  }

  error(message: string, meta?: unknown) {
    this.log("error", message, meta);
  }

  debug(message: string, meta?: unknown) {
    this.log("debug", message, meta);
  }
}
