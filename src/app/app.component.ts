import { Component } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-app';
  quizData: any = [];
  public quizName = "";

  constructor(public httpService: HttpService) { }

  ngOnInit() {
    // this.getQuizData();
  }

  // getQuizData() {
  //   this.httpService.get("quiz/getQuizzes").subscribe((rs: any) => {
  //     this.quizData = rs;
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
}
