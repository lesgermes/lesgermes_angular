import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
    apiDomain: string;
    apiEndpoint: string;
    apiBlacklistedRoutes: Array<string>;
    chatUrl: string;
}

export const MY_CONFIG = {
    // apiDomain: "api.lesgermes.local",
    // apiEndpoint: "http://api.lesgermes.local/app_dev.php",
    // apiBlacklistedRoutes: [
    //     "api.lesgermes.local/app_dev.php/login_check",
    //     "api.lesgermes.local/app_dev.php/register",
    //     "api.lesgermes.local/app_dev.php/token/refresh"
    // ],
    // chatUrl: "http://localhost:8080"

    apiDomain: "api.lesgermes.tk",
    apiEndpoint: "https://api.lesgermes.tk",
    apiBlacklistedRoutes: [
        "api.lesgermes.tk/login_check",
        "api.lesgermes.tk/register",
        "api.lesgermes.tk/token/refresh"
    ],
    chatUrl: "https://api.lesgermes.tk:8080"
};

export const MY_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');