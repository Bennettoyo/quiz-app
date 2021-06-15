import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ModalService } from '../services/modal.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  quizzes = [];
  quizDataForm: any = {};

  constructor(public httpService: HttpService, public modalsService: ModalService, private router: Router) { }

  ngOnInit(): void {
    this.modalsService.modalData$.subscribe(
      object => {
        if (object)
          this.quizDataForm = object;
        if (this.quizDataForm.isEdit) {
          this.editQuiz();
        } else if (this.quizDataForm.isDelete) {
          this.deleteQuiz();
        } else {
          this.newQuiz();
        }
      }
    )
    this.getQuizData();
  }

  goQuestions() {
    this.router.navigate(["questions"]);
  }

  getQuizData() {
    this.httpService.get("quiz/getQuizzes").subscribe((rs: any) => {
      this.quizzes = rs;
    }, (err) => {
      console.log(err);
    });
  }


  newQuiz() {
    this.httpService.post("quiz/createQuiz", {
      QuizName: this.quizDataForm.quizName,
      Description: this.quizDataForm.quizDesc,
      QuizType: this.quizDataForm.quizType,
      Image: this.quizDataForm.quizPic,
      Status: 1
    }).subscribe((rs: any) => {
      // console.log(rs);
      sessionStorage.setItem("quizID", rs);
      this.getQuizData();
      this.goQuestions();
    }, (err: any) => {
      console.log("Error")
    });
  }

  editQuiz() {
    this.httpService.post("quiz/editQuiz", {
      ID: this.quizDataForm.ID,
      QuizName: this.quizDataForm.quizName,
      Description: this.quizDataForm.quizDesc,
      QuizType: this.quizDataForm.quizType,
      Image: this.quizDataForm.quizPic,
      Status: 1
    }).subscribe((rs: any) => {
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

  deleteQuiz() {
    this.httpService.post("quiz/DeleteQuiz", {
      ID: this.quizDataForm.ID,
    }).subscribe((rs: any) => {
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
