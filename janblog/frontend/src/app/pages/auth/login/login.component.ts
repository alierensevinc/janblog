/* tslint:disable:no-non-null-assertion */
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginModel} from '../../../models/login-model';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {AppService} from '../../../services/app.service';
import {BackgroundImage} from '../../../models/background-image.enum';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginModel: LoginModel;

    constructor(private authService: AuthService, private router: Router, private appService: AppService) {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.min(1), Validators.required]),
            password: new FormControl('', [Validators.min(1), Validators.required])
        });
        this.loginModel = {
            username: '',
            password: ''
        };
    }

    ngOnInit(): void {
        this.appService.changeHeader('Login', '', BackgroundImage.auth);
    }

    onSubmit(): void {
        this.loginModel.username = this.loginForm.get('username')!.value;
        this.loginModel.password = this.loginForm.get('password')!.value;

        if (this.loginForm.valid) {
            this.authService.login(this.loginModel).subscribe((data: any) => {
                if (data) {
                    // noinspection JSIgnoredPromiseFromCall
                    this.router.navigateByUrl('/home');
                }
            }, (error: any) => {
                this.appService.showError(error.error);
            });
        } else {
            if (this.loginModel.username === '') {
                this.appService.showError('Please enter username');
            } else if (this.loginModel.password === '') {
                this.appService.showError('Please enter password');
            }
        }
    }

}
