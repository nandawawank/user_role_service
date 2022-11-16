import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof BadRequestException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const code = exception.getStatus();
      const errors = exception.getResponse();

      response.status(code).send({
        code: code,
        message: 'bad request',
        count: 0,
        data: [],
        errors: Object.values(errors)[1],
      });
    }
  }
}
