export class TokenService {
    getWhitelistedDomains() {
        return ['api.lesgermes.tk']
    }

    getBlacklistedRoutes() {
        return [
            'api.lesgermes.tk/login_check',
            'api.lesgermes.tk/register'
        ]
    }
}