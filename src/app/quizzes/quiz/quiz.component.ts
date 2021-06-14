import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input('quizElement') element: { QuizName: string, QuizType: string, Status: number, Image: string, Description: string };

  constructor(public modalsService: ModalService) { }

  ngOnInit(): void {
  }

  editQuiz() {
    this.modalsService.editModal();
  }
}
