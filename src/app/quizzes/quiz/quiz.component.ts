import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input('quizElement') element: {
    ID: number,
    QuizName: string,
    QuizType: string,
    Status: number,
    Image: string,
    Description: string
  };
  public adminAccess: any = false;
  public teacherAccess: any = false;
  public studentAccess: any = false;

  constructor(public modalsService: ModalService, private router: Router) { }

  ngOnInit(): void {
    this.checkAccess();
  }

  viewandEditQuiz(elementId) {
    sessionStorage.setItem("quizID", elementId);
    this.goQuestions();
  }

  goQuestions() {
    this.router.navigate(["questions"]);
  }

  editQuiz() {
    this.modalsService.editModal(this.element);
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


