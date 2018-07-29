import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
    apiDomain: string;
    apiEndpoint: string;
    apiBlacklistedRoutes: Array<string>
}

export const MY_CONFIG = {
    // apiDomain: "api.lesgermes.local",
    // apiEndpoint: "http://lesgermes.local",
    // apiBlacklistedRoutes: [
    //     "api.lesgermes.local/login_check",
    //     "api.lesgermes.local/register"
    // ]

    apiDomain: "api.lesgermes.tk",
    apiEndpoint: "https://api.lesgermes.tk",
    apiBlacklistedRoutes: [
        "api.lesgermes.tk/login_check",
        "api.lesgermes.tk/register"
    ]
};

export const MY_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');