import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionsComponent } from './quizzes/quiz/questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizzesComponent,
    QuizComponent,
    ModalComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    CommonModule,
    RouterModule.forRoot([
      { path: 'questions', component: QuestionsComponent },
      { path: 'quizzes', component: QuizzesComponent },
      { path: '', redirectTo: 'quizzes', pathMatch: 'full' },
      { path: '**', redirectTo: 'quizzes', pathMatch: 'full' },
    ], { useHash: true }),
  ],
  providers: [
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
