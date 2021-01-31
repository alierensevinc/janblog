/* tslint:disable:no-non-null-assertion */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterModel} from '../../../models/register-model';
import {AuthService} from '../../../services/auth.service';
import {AppService} from '../../../services/app.service';
import {BackgroundImage} from '../../../models/background-image.enum';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    registerModel: RegisterModel;
    emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private appService: AppService) {
        this.registerForm = this.formBuilder.group({
            username:  new FormControl('', [Validators.min(1), Validators.required]),
            email: new FormControl('', [Validators.min(1), Validators.required]),
            password: new FormControl('', [Validators.min(1), Validators.required]),
            confirmPassword: new FormControl('', [Validators.min(1), Validators.required])
        });
        this.registerModel = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    ngOnInit(): void {
        this.appService.changeHeader('Register', '', BackgroundImage.auth);
    }

    onSubmit(): void {
        this.registerModel.username = this.registerForm.get('username')!.value;
        this.registerModel.email = this.registerForm.get('email')!.value;
        this.registerModel.password = this.registerForm.get('password')!.value;
        this.registerModel.confirmPassword = this.registerForm.get('confirmPassword')!.value;

        if (this.registerForm.valid && this.registerModel.password === this.registerModel.confirmPassword) {
            this.authService.register(this.registerModel).subscribe((data: any) => {
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigateByUrl('/login');
            }, (error: any) => {
                this.appService.showError(error.error);
            });
        } else {
            if (this.registerModel.username === '') {
                this.appService.showError('Please enter username');
            } else if (this.registerModel.email === '') {
                this.appService.showError('Please enter email');
            } else if (!this.emailRegexp.test(this.registerModel.email)) {
                this.appService.showError('Please enter a valid email');
            } else if (this.registerModel.password === '') {
                this.appService.showError('Please enter password');
            } else if (this.registerModel.confirmPassword === '') {
                this.appService.showError('Please enter password again');
            } else if (this.registerModel.password !== this.registerModel.confirmPassword) {
                this.appService.showError('Passwords doesn\'t match');
            }
        }
    }

}
