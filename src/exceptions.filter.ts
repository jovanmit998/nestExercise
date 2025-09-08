
/* eslint-disable prettier/prettier */

import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"
import { LoggerService } from "./logger/logger.service"
import { PrismaClientValidationError } from "generated/prisma/runtime/library"
import { Request, Response } from 'express'

type MyResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object
}

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new LoggerService(ExceptionFilter.name)

    catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: MyResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ''
        }

        if (exception instanceof HttpException){
                myResponseObj.statusCode = exception.getStatus()
                myResponseObj.response = exception.getResponse()
        } else if (exception instanceof PrismaClientValidationError){ 
                myResponseObj.statusCode = 422
                myResponseObj.response = exception.message.replaceAll(/\n/g, ' ')
        } else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            myResponseObj.response = 'Internal Server Error'
        }

        response.status(myResponseObj.statusCode).json(myResponseObj)

        this.logger.error(myResponseObj.response, ExceptionFilter.name);

        super.catch(exception, host)
    }
}