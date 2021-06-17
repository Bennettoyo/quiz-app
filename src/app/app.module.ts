import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';



import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionsComponent } from './quizzes/quiz/questions/questions.component';
import { BannerComponent } from './components/banner/banner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizzesComponent,
    QuizComponent,
    ModalComponent,
    QuestionsComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ConfirmationPopoverModule.forRoot(),
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
