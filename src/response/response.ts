export class Response {
  constructor(
    readonly code: number,
    readonly message: string,
    readonly count: number,
    readonly data: any,
    readonly errors: any,
  ) {
    code = this.code;
    message = this.message;
    count = this.count;
    data = this.data;
    errors = this.errors;
  }
}
