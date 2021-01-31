import {Injectable} from '@angular/core';
import {PostModel} from '../models/post-model';
import {BackgroundImage} from '../models/background-image.enum';
import swal from 'sweetalert';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    post: PostModel | undefined;
    editPost: PostModel | undefined;
    isOnPost = false;
    headerTitle = 'JanBlog';
    headerSubHeading = 'A Blog by Ali Eren Sevinc';
    headerImgUrl = BackgroundImage.main;

    constructor() {
    }

    changeOnPost(onPost: boolean, post: PostModel | undefined): void {
        this.isOnPost = onPost;
        this.post = post;
    }

    changeHeader(headerTitle: string, headerSubHeading: string, image: BackgroundImage): void {
        this.headerTitle = headerTitle;
        this.headerSubHeading = headerSubHeading;
        this.headerImgUrl = image;
    }

    prepareEditPost(post: PostModel | undefined): void {
        this.editPost = post;
    }

    showError(errorText: string): void {
        // noinspection JSIgnoredPromiseFromCall
        swal({
            title: 'Error !',
            text: errorText,
            icon: 'error',
        });
    }

    showSuccess(successText: string): void {
        // noinspection JSIgnoredPromiseFromCall
        swal({
            title: 'Success !',
            text: successText,
            icon: 'success',
        });
    }
}
