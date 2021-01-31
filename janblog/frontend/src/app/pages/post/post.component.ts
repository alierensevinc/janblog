/* tslint:disable:no-non-null-assertion */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostModel} from '../../models/post-model';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {AppService} from '../../services/app.service';
import {BackgroundImage} from '../../models/background-image.enum';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
    post: PostModel | undefined;
    id: number | undefined;

    constructor(private activatedRoute: ActivatedRoute,
                private postService: PostService,
                private appService: AppService,
                public authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.appService.changeHeader('', '', BackgroundImage.readPost);

        this.activatedRoute.params.subscribe(params => {
            this.id = params.id;
        });

        this.postService.getPost(this.id!).subscribe((data: PostModel) => {
            data.createdOn = new Date(Number(data.createdOn) * 1000);
            data.updatedOn = new Date(Number(data.updatedOn) * 1000);
            this.post = data;
            this.appService.changeOnPost(true, this.post);
        }, (error: any) => {
            this.appService.showError(error.error);
            // noinspection JSIgnoredPromiseFromCall
            this.router.navigateByUrl('/home');
        });
    }

    ngOnDestroy(): void {
        this.appService.changeOnPost(false, undefined);
    }

    editPost(): void {
        this.appService.prepareEditPost(this.post);
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl('/edit-post');

    }

    deletePost(): void {
        this.postService.deletePost(Number(this.post?.id)).subscribe((data: any) => {
            if (data) {
                this.appService.showSuccess('Post deleted successfully !');
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigateByUrl('/home');
            }
        }, (error: any) => {
            this.appService.showError(error.error);
        });
    }
}
