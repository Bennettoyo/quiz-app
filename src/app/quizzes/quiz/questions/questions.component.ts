import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

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
  public inputClean: any = true;

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.getQuizData();
  }

  setQuestionNumber(number) {
    this.questionNumber = number;
    this.getQuestionData();
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
      } else {
        this.inputClean = true;
        this.emptyInputsAndAlertUser();
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

  newQuestionAndAnswers() {
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
      this.emptyInputsAndAlertUser()
    }, (err: any) => {
      console.log("Error")
    });
  }

  emptyInputsAndAlertUser() {
    if (!this.inputClean) {
      alert("SUCCESS!");
    }
    this.question = "";
    this.firstAnswer = "";
    this.secondAnswer = "";
    this.thirdAnswer = "";
    this.fourthAnswer = "";
    this.isFirstAnswerCorrect = false;
    this.isSecondAnswerCorrect = false;
    this.isThirdAnswerCorrect = false;
    this.isFourthAnswerCorrect = false;
    if (!this.inputClean) {
      this.questionNumber = this.questionNumber + 1;
    }
    this.inputClean = false;
  }


}
