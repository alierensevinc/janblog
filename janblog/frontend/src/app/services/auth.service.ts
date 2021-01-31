import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterModel} from '../models/register-model';
import {Observable} from 'rxjs';
import {LoginModel} from '../models/login-model';
import {JwtAuthResponseModel} from '../models/jwt-auth-response-model';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = 'http://localhost:8080/api/auth/';

    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
    }

    register(registerModel: RegisterModel): Observable<any> {
        return this.httpClient.post(
            this.url + 'register', registerModel
        );
    }

    login(loginModel: LoginModel): Observable<any> {
        return this.httpClient.post<JwtAuthResponseModel>(
            this.url + 'login', loginModel
        ).pipe(map(data => {
            this.localStorageService.store('authenticationToken', data.authenticationToken);
            this.localStorageService.store('username', data.username);
            return loginModel;
        }));
    }

    logout(): void {
        this.localStorageService.clear('authenticationToken');
        this.localStorageService.clear('username');
    }

    getRegisteredAccountCount(): Observable<number> {
        return this.httpClient.get<number>(this.url + 'getRegisteredAccountCount');
    }

    isAuthenticated(): boolean {
        return this.localStorageService.retrieve('username') !== null;
    }
}
