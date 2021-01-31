import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.retrieve('authenticationToken');
        if (token) {
            const cloned = req.clone(
                {
                    headers: req.headers.set('Authorization', 'Bearer ' + token)
                });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
