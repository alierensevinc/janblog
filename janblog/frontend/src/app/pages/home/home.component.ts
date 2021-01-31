import {Component, OnInit} from '@angular/core';
import {PostModel} from '../../models/post-model';
import {PostService} from '../../services/post.service';
import {BackgroundImage} from '../../models/background-image.enum';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    posts: Array<PostModel> | undefined;

    constructor(private postService: PostService,
                private appService: AppService,
                private router: Router,
                public authService: AuthService) {
    }

    ngOnInit(): void {
        this.appService.changeHeader('JanBlog', 'A Blog by Ali Eren Sevinc', BackgroundImage.main);
        this.postService.getAllPosts().subscribe((data: any) => {
            for (const i of data) {
                i.createdOn = new Date(Number(i.createdOn) * 1000);
                i.updatedOn = new Date(Number(i.updatedOn) * 1000);
            }
            this.posts = data.reverse();
        }, (error: any) => {
            this.appService.showError(error.error);
        });
    }

    addPost(): void {
        this.router.navigateByUrl('/add-post');
    }

    getShowUpdatedOnHeader(post: PostModel): any {
        return Number(post.createdOn) - Number(post.updatedOn);
    }
}
