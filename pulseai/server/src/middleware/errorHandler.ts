import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse {
  success: false;
  error: string;
  details?: string;
  statusCode?: number;
  timestamp: string;
}

// Global error handling middleware
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  const errorResponse: ErrorResponse = {
    success: false,
    error: message,
    details: err.stack,
    statusCode,
    timestamp: new Date().toISOString(),
  };
  
  res.status(statusCode).json(errorResponse);
}

// Not found middleware
export function notFound(req: Request, res: Response, next: NextFunction): void {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

// Request validation middleware
export function validateRequest<T extends Record<string, unknown>>(
  schema: T
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { body } = req;
    
    if (!body) {
      return next(new Error('Request body is required'));
    }
    
    const validated = body as unknown as T;
    
    for (const [key, value] of Object.entries(schema)) {
      if (!(key in validated)) {
        return next(new Error(`Missing required field: ${key}`));
      }
      
      if (typeof value === 'function') {
        const result = value(validated[key]);
        if (result !== true) {
          return next(new Error(`Invalid value for field: ${key}`));
        }
      }
    }
    
    next();
  };
}
