/* tslint:disable:no-non-null-assertion */
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostModel} from '../../../models/post-model';
import {Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {BackgroundImage} from '../../../models/background-image.enum';
import {AppService} from '../../../services/app.service';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

    addPostForm: FormGroup;
    postModel: PostModel;
    title = new FormControl('');
    body = new FormControl('');
    titleText: string | undefined;
    bodyText: string | undefined;
    apiKey = 'fhioop7url4vott04onvxx05ufh7li8zupndvudy0s35935c';
    editedPost: PostModel | undefined;
    loading = true;

    constructor(private postService: PostService,
                private router: Router,
                private appService: AppService) {
        this.addPostForm = new FormGroup({
            title: new FormControl(this.title, [Validators.min(1), Validators.required]),
            body: new FormControl(this.body, [Validators.min(1), Validators.required]),
        });
        this.postModel = {
            id: '',
            content: '',
            title: '',
            username: '',
            createdOn: '',
            updatedOn: ''
        };
    }

    ngOnInit(): void {
        this.appService.changeHeader('Add Post', '', BackgroundImage.addOrEditPost);
        this.editedPost = this.appService.editPost;
        if (this.router.url === '/edit-post' && this.editedPost === undefined) {
            // noinspection JSIgnoredPromiseFromCall
            this.router.navigateByUrl('/');
        } else if (this.router.url === '/edit-post' && this.editedPost) {
            this.postModel = this.editedPost!;
            this.titleText = this.editedPost?.title;
            this.bodyText = this.editedPost?.content;
            this.appService.changeHeader('Edit Post', '', BackgroundImage.addOrEditPost);
        }
        setTimeout(() => {
            this.loading = false;
            setTimeout(() => {
                const sendMessageButton: any = document.getElementById('sendMessageButton');
                sendMessageButton.scrollIntoView({behavior: 'smooth'});
            }, 300);
        }, 2200);
    }

    publishPost(): void {
        if (this.router.url === '/edit-post' && this.editedPost !== undefined) {
            this.updatePost();
        } else {
            this.addPost();
        }
    }

    addPost(): void {
        this.postModel.content = this.addPostForm.get('body')!.value;
        this.postModel.title = this.addPostForm.get('title')!.value;
        if (this.addPostForm.valid) {
            this.postService.addPost(this.postModel).subscribe((data: any) => {
                this.appService.showSuccess('New post added !');
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigateByUrl('/');
            }, (error: any) => {
                this.appService.showError(error.error);
            });
        } else {
            if (this.postModel.title === '' || this.postModel.title === undefined) {
                this.appService.showError('Please enter a title');
            } else if (this.postModel.content === '' || this.postModel.content === undefined) {
                this.appService.showError('Content can\'t be empty');
            }
        }
    }

    updatePost(): void {
        this.postModel.content = this.addPostForm.get('body')!.value;
        this.postModel.title = this.addPostForm.get('title')!.value;
        if (this.addPostForm.valid) {
            this.postService.updatePost(Number(this.postModel?.id), this.postModel).subscribe((data: any) => {
                this.appService.showSuccess('Post updated successfully !');
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigateByUrl('/');
            }, (error: any) => {
                this.appService.showError(error.error);
            });
        } else {
            if (this.postModel.title === '' || this.postModel.title === undefined) {
                this.appService.showError('Please enter title');
            } else if (this.postModel.content === '' || this.postModel.content === undefined) {
                this.appService.showError('Content can\'t be empty');
            }
        }
    }
}
