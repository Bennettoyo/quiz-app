import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loggedIn: any = false;
  public adminAccess: any = false;
  public teacherAccess: any = false;
  public studentAccess: any = false;
  public username: any = "";
  public password: any = "";

  constructor(private modalService: NgbModal, public modalsService: ModalService, public httpService: HttpService, private router: Router) { }

  addModal() {
    this.modalsService.addModal();
  }

  checkLoginDetails() {
    this.httpService.get("quiz/getAccountDetails?Username=" + this.username + "&Password=" + this.password).subscribe((rs: any) => {
      if (rs.length > 0) {
        let loginResults = rs[0];
        localStorage.setItem("LoggedIn", "true");
        if (loginResults.Username == "admin") {
          localStorage.setItem("admin", "true");
          this.adminAccess = true;
        } else if (loginResults.Username == "teacher") {
          localStorage.setItem("teacher", "true");
          this.teacherAccess = true;
        } else if (loginResults.Username == "student") {
          localStorage.setItem("student", "true");
          this.studentAccess = true;
        }
      }
      location.reload();
      this.login();
    }, (err) => {
      console.log(err);
    });
  }

  login() {
    let isLoggedin = localStorage.getItem("LoggedIn");
    let isAdmin = localStorage.getItem("admin");
    let isTeacher = localStorage.getItem("teacher");
    let isStudent = localStorage.getItem("student");
    if (isLoggedin == "true") {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
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

  logout() {
    localStorage.removeItem("LoggedIn");
    localStorage.removeItem("admin");
    localStorage.removeItem("teacher");
    localStorage.removeItem("student");
    this.goQuizzes();
  }

  goQuizzes() {
    this.router.navigate(["quizzes"]);
    setTimeout(function () { location.reload(); }, 500);
  }

  ngOnDestroy() {
    this.logout();
  }

  ngOnInit(): void {
    this.login();
  }
}
