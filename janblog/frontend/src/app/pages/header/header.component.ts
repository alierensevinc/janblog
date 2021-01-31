import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    registeredAccountCount = 0;
    showUpdatedOnHeader = false;

    constructor(public authService: AuthService, public appService: AppService) {
        this.getRegisteredAccountCount().subscribe((data: any) => {
            this.registeredAccountCount = data;
        }, (error: any) => {
            this.appService.showError(error.error);
        });
    }

    ngOnInit(): void {
    }

    logout(): void {
        this.authService.logout();
    }

    getRegisteredAccountCount(): any {
        return this.authService.getRegisteredAccountCount();
    }

    getShowUpdatedOnHeader(): any {
        return Number(this.appService.post?.createdOn) - Number(this.appService.post?.updatedOn);
    }
}
