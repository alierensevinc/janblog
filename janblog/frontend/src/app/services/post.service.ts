import {Injectable} from '@angular/core';
import {PostModel} from '../models/post-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private httpClient: HttpClient) {
    }

    getAllPosts(): Observable<Array<PostModel>> {
        return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/posts/all');
    }

    getPost(id: number): Observable<PostModel> {
        return this.httpClient.get<PostModel>('http://localhost:8080/api/posts/get/' + id);
    }

    addPost(postModel: PostModel): Observable<PostModel> {
        return this.httpClient.post<PostModel>('http://localhost:8080/api/posts/post', postModel);
    }

    updatePost(id: number, postModel: PostModel): Observable<PostModel> {
        return this.httpClient.put<PostModel>('http://localhost:8080/api/posts/update/' + id, postModel);
    }

    deletePost(id: number): Observable<boolean> {
        return this.httpClient.delete<boolean>('http://localhost:8080/api/posts/delete/' + id);
    }
}
