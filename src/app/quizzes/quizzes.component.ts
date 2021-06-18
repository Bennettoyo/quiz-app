import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ModalService } from '../services/modal.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  quizzes = [];
  quizDataForm: any = {};
  public LoggedIn: any = false;
  public adminAccess: any = false;
  public teacherAccess: any = false;
  public studentAccess: any = false;
  public isSmallerDevice: any = false;

  constructor(public httpService: HttpService, public modalsService: ModalService, private router: Router, private toastr: ToastrService, public storageService: StorageService) { }

  ngOnInit(): void {
    let windowWidth = window.innerWidth;
    if (windowWidth < 1100) {
      this.isSmallerDevice = true;
    }
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
    this.checkAccess();
    this.getQuizData();
  }

  goQuestions() {
    this.router.navigate(["questions"]);
  }

  deletedQuiz() {
    setTimeout(function () { location.reload(); }, 500);
  }

  editedQuiz() {
    setTimeout(function () { location.reload(); }, 500);
  }

  getQuizData() {
    if (this.studentAccess || this.teacherAccess) {
      this.httpService.get("quiz/getCompletedQuizzes").subscribe((rs: any) => {
        this.quizzes = rs;
      }, (err) => {
        this.toastr.error('Unable to get data!', 'Error!');
      });
    } else {
      this.httpService.get("quiz/getQuizzes").subscribe((rs: any) => {
        this.quizzes = rs;
      }, (err) => {
        this.toastr.error('Unable to get data!', 'Error!');
      });

    }
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
      if (rs != 0) {
        this.storageService.setSessionStorage("quizID", rs);
        this.toastr.success('Your quiz has now been added! Make sure to now fill out all the questions and answers.', 'Success!');
        this.getQuizData();
        this.goQuestions();
      } else {
        this.toastr.error('Quiz name already taken.', 'Error!');
        setTimeout(function () { location.reload(); }, 500);
      }
    }, (err: any) => {
      this.toastr.error('Error!');
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
        // this.getQuizData();
        this.toastr.success('Your quiz has now been edited!', 'Success!');
        this.editedQuiz();
      } else {
        this.toastr.error('Unable to edit!', 'Error!');
      }
    }, (err: any) => {
      this.toastr.error('Unable to edit!', 'Error!');
    });
  }

  deleteQuiz() {
    console.log("called in quizzes component once")
    this.httpService.post("quiz/DeleteQuiz", {
      ID: this.quizDataForm.ID,
    }).subscribe((rs: any) => {
      if (rs == 1) {
        // this.getQuizData();
        this.toastr.success('Your quiz has now been deleted!', 'Success!');
        this.deletedQuiz();
      } else {
        this.toastr.error('Unable to delete!', 'Error!');
      }
    }, (err: any) => {
      this.toastr.error('Unable to delete!', 'Error!');
    });
  }

  checkAccess() {
    let isLoggedin = this.storageService.getLocalStorage("LoggedIn");
    let isAdmin = this.storageService.getLocalStorage("admin");
    let isTeacher = this.storageService.getLocalStorage("teacher");
    let isStudent = this.storageService.getLocalStorage("student");
    if (isLoggedin == "true") {
      this.LoggedIn = true;
    } else {
      this.LoggedIn = false;
    }
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
