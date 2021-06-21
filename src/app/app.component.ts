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
  }

}
