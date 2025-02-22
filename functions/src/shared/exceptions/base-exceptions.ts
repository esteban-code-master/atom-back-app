export class BaseException extends Error {
  public status: number;

  constructor(message: string, status: number, name?: string) {
    super(message);
    this.name = name || "BaseException";
    this.status = status;
  }
}
