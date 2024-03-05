import {HttpStatus} from "@/infra/framework/presentation/http-status";

export declare class HttpException extends Error {
    private readonly response;
    private readonly status;
    private readonly options?;

    constructor(response: string | Record<string, any>, status: HttpStatus);
}