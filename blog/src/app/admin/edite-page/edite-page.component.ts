import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from 'src/app/shared/posts.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edite-page',
  templateUrl: './edite-page.component.html',
  styleUrls: ['./edite-page.component.scss']
})
export class EditePageComponent implements OnInit {

  form: FormGroup
  post: Post
  submitted = false

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private alert: AlertService
  ) { 
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params)=> {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post)=> {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted =true

    this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe( ()=>{
      this.submitted = false
      this.alert.success('Пост был обновлен')
    })
  }

}
