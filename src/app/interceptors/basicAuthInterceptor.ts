import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../services/login.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }
    // Send the jwt token with any network requests if it exists
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('id_token');

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken),
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
