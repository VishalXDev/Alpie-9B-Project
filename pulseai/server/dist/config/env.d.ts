export interface AppConfig {
    port: number;
    apiBaseUrl: string;
    frontendUrl: string;
    corsOrigins: string[];
    rateLimitWindowMs: number;
    rateLimitMaxRequests: number;
}
export declare const config: AppConfig;
export default config;
//# sourceMappingURL=env.d.ts.map