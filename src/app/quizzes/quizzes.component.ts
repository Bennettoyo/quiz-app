import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  quizzes = [];

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.getQuizData();
  }

  getQuizData() {
    this.httpService.get("quiz/getQuizzes").subscribe((rs: any) => {
      this.quizzes = rs;
    }, (err) => {
      console.log(err);
    });
  }


  // newQuiz() {
  //   this.httpService.post("quiz/createQuiz", { QuizName: this.quizName, Status: 1 }).subscribe((rs: any) => {
  //     if (rs == 1) {
  //       this.getQuizData();
  //       console.log("Success")
  //     } else {
  //       console.log("Error")
  //     }
  //   }, (err: any) => {
  //     console.log("Error")
  //   });
  // }

}
