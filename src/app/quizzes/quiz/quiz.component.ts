import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from "@angular/router";
import { StorageService } from 'src/app/services/storage.service';

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
  public finalScore: number;

  constructor(public modalsService: ModalService, private router: Router, public storageService: StorageService) { }

  ngOnInit(): void {
    this.checkAccess();
    this.finalScore = parseInt(this.storageService.getLocalStorage(this.element.QuizName));
  }

  viewandEditQuiz(elementId) {
    this.storageService.setSessionStorage("quizID", elementId);
    this.goQuestions();
  }

  goQuestions() {
    this.router.navigate(["questions"]);
  }

  editQuiz() {
    this.modalsService.editModal(this.element);
  }

  checkAccess() {
    let isAdmin = this.storageService.getLocalStorage("admin");
    let isTeacher = this.storageService.getLocalStorage("teacher");
    let isStudent = this.storageService.getLocalStorage("student");
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


