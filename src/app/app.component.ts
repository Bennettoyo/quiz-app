import { Component } from '@angular/core';
import { HttpService } from './http.service';

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
    this.getQuizData();
  }

  getQuizData() {
    this.httpService.get("quiz/getQuizzes").subscribe((rs: any) => {
      this.quizData = rs;
    }, (err) => {
      console.log(err);
    });
  }

  newQuiz() {
    this.httpService.post("quiz/createQuiz", { QuizName: this.quizName, Status: 1 }).subscribe((rs: any) => {
      if (rs == 1) {
        this.getQuizData();
        console.log("Success")
      } else {
        console.log("Error")
      }
    }, (err: any) => {
      console.log("Error")
    });
  }
}
