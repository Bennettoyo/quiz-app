import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public quizHeader = "";
  public quizDescription = "";
  public question = "";
  public questionNumber = 1;
  public quizID = "";
  public firstAnswer = "";
  public isFirstAnswerCorrect;
  public secondAnswer = "";
  public isSecondAnswerCorrect;
  public thirdAnswer = "";
  public isThirdAnswerCorrect;
  public fourthAnswer = "";
  public isFourthAnswerCorrect;
  public questionAndAnswers = {};
  public quizData: any = {};
  public questionData: any = {};
  public emptyAllInputs: any = false;
  public finalQuestion: any = false;
  public adminAccess: any = false;
  public teacherAccess: any = false;
  public studentAccess: any = false;


  constructor(public httpService: HttpService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getQuizData();
    this.checkAccess();
  }

  setQuestionNumber(number) {
    this.questionNumber = number;
    if (this.questionNumber == 10) {
      this.finalQuestion = true;
    } else {
      this.finalQuestion = false;
    }
    if (this.emptyAllInputs = true) {
      this.emptyInputs();
      this.emptyAllInputs = false;
    }
    this.getQuestionData();
  }

  answersHidden() {
    this.isFirstAnswerCorrect = false;
    this.isSecondAnswerCorrect = false;
    this.isThirdAnswerCorrect = false;
    this.isFourthAnswerCorrect = false;
  }

  getQuestionData() {
    this.httpService.get("quiz/getQuestionData?QuizId=" + this.quizID + "&questionNumber=" + this.questionNumber).subscribe((rs: any) => {
      this.questionData = rs[0];
      if (this.questionData) {
        this.questionNumber = this.questionData.QuestionNumber,
          this.question = this.questionData.QuestionText,
          this.firstAnswer = this.questionData.FirstAnswer,
          this.secondAnswer = this.questionData.SecondAnswer,
          this.thirdAnswer = this.questionData.ThirdAnswer,
          this.fourthAnswer = this.questionData.FourthAnswer,
          this.isFirstAnswerCorrect = this.questionData.IsFirstAnswerCorrect,
          this.isSecondAnswerCorrect = this.questionData.IsSecondAnswerCorrect,
          this.isThirdAnswerCorrect = this.questionData.IsThirdAnswerCorrect,
          this.isFourthAnswerCorrect = this.questionData.isFourthAnswerCorrect
        if (this.studentAccess) {
          this.answersHidden();
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  getQuizData() {
    this.quizID = sessionStorage.getItem("quizID");
    this.httpService.get("quiz/getQuiz?ID=" + this.quizID).subscribe((rs: any) => {
      this.quizData = rs[0];
      this.quizHeader = this.quizData.QuizName;
      this.quizDescription = this.quizData.Description;
      this.getQuestionData();
    }, (err) => {
      console.log(err);
    });
  }

  emptyInputsAndAlertUser() {
    if (!this.finalQuestion) {
      this.questionNumber = this.questionNumber + 1;
    }
    if (this.questionNumber == 10) {
      this.finalQuestion = true;
    } else {
      this.finalQuestion = false;
    }
    this.getQuestionData();
  }

  emptyInputs() {
    this.question = "";
    this.firstAnswer = "";
    this.secondAnswer = "";
    this.thirdAnswer = "";
    this.fourthAnswer = "";
    this.isFirstAnswerCorrect = false;
    this.isSecondAnswerCorrect = false;
    this.isThirdAnswerCorrect = false;
    this.isFourthAnswerCorrect = false;
  }

  newQuestionAndAnswers() {
    if (
      this.question != "" &&
      this.firstAnswer != "" &&
      this.secondAnswer != "" &&
      this.thirdAnswer != "" &&
      this.fourthAnswer != ""
    ) {
      let moreThanOneAnswer = this.moreThanOneAnswer();
      if (moreThanOneAnswer) {
        this.httpService.post("quiz/createQuestionAndAnswers", {
          Quiz_ID: this.quizID,
          QuestionNumber: this.questionNumber,
          QuestionText: this.question,
          FirstAnswer: this.firstAnswer,
          SecondAnswer: this.secondAnswer,
          ThirdAnswer: this.thirdAnswer,
          FourthAnswer: this.fourthAnswer,
          IsFirstAnswerCorrect: this.isFirstAnswerCorrect,
          IsSecondAnswerCorrect: this.isSecondAnswerCorrect,
          IsThirdAnswerCorrect: this.isThirdAnswerCorrect,
          isFourthAnswerCorrect: this.isFourthAnswerCorrect,
        }).subscribe((rs: any) => {
          this.emptyInputsAndAlertUser();
          this.emptyInputs();
          this.emptyAllInputs = true;
          this.toastr.success('Saved!');
        }, (err: any) => {
          this.toastr.error('Could not submit', 'Error!');
        });
      } else {
        this.toastr.error('Please tick off at least two answers!', 'Error!');
      }
    } else {
      this.toastr.error('Please fill out the question and all the answers!', 'Error!');
    }
  }

  moreThanOneAnswer() {
    let counter = 0;
    if (this.isFirstAnswerCorrect) {
      counter++;
    }
    if (this.isSecondAnswerCorrect) {
      counter++;
    }
    if (this.isThirdAnswerCorrect) {
      counter++;
    }
    if (this.isFourthAnswerCorrect) {
      counter++;
    }
    if (counter > 1) {
      return true;
    } else {
      return false;
    }
  }

  teacherAndStudentNextQuestion() {
    if (this.studentAccess) {
      if (this.moreThanOneAnswer()) {
        this.emptyInputsAndAlertUser();
      } else {
        this.toastr.error('Please tick off at least two answers!', 'Oops!');
      }
    } else if (this.teacherAccess) {
      this.emptyInputsAndAlertUser();
    }
  }

  completedQuiz() {
    this.goQuizzes();
  }

  adminCompletedQuiz() {
    this.newQuestionAndAnswers();
    if (this.finalQuestion) {
      this.toastr.success('Make sure you have filled all 10 questions.', 'Saved your quiz!');
      this.goQuizzes();
    }
  }

  goQuizzes() {
    this.router.navigate(["quizzes"]);
  }


  checkAccess() {
    let isAdmin = localStorage.getItem("admin");
    let isTeacher = localStorage.getItem("teacher");
    let isStudent = localStorage.getItem("student");
    if (isAdmin == "true") {
      this.adminAccess = true;
    } else {
      this.adminAccess = false;
    }
    if (isTeacher == "true") {
      this.teacherAccess = true;
    } else {
      this.teacherAccess = false;
    }
    if (isStudent == "true") {
      this.studentAccess = true;
    } else {
      this.studentAccess = false;
    }
  }



}
