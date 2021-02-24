import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LoginService } from '../service/login/login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public loginService: LoginService, public router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth')) {
            return next.handle(req.clone());
        } else {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.loginService.getToken())
            });
            return next.handle(clonedReq).pipe(
                tap(
                    event => {},
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigate(['/login']);
                        }
                    }
                )
            );
        }
    }
}
