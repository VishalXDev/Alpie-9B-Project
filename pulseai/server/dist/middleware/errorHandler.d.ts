import { Request, Response, NextFunction } from 'express';
export interface ErrorResponse {
    success: false;
    error: string;
    details?: string;
    statusCode?: number;
    timestamp: string;
}
export declare function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void;
export declare function notFound(req: Request, res: Response, next: NextFunction): void;
export declare function validateRequest<T extends Record<string, unknown>>(schema: T): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map