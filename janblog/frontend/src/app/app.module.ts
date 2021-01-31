import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './pages/header/header.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Ng2Webstorage} from 'ngx-webstorage';
import {HomeComponent} from './pages/home/home.component';
import {AddPostComponent} from './pages/post/add-post/add-post.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {HttpClientInterceptor} from './services/http-client-interceptor';
import {PostComponent} from './pages/post/post.component';
import {AuthGuard} from './auth.guard';
import {FooterComponent} from './pages/footer/footer.component';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        AddPostComponent,
        PostComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        EditorModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.cubeGrid,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#0085A1',
            fullScreenBackdrop: true
        }),
        Ng2Webstorage.forRoot(),
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'home', component: HomeComponent},
            {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
            {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
            {path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]},
            {path: 'edit-post', component: AddPostComponent, canActivate: [AuthGuard]},
            {path: 'post/:id', component: PostComponent},
        ])
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
