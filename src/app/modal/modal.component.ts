import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../services/modal.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  public quizDataObject = {};
  @Input() public quizPic: string;
  @Input() public quizName: any;
  @Input() public quizDesc: any;
  @Input() public quizType: any;
  @Input() public ID: any;
  @Input() my_modal_title;
  @Input() my_modal_content;
  @Input() isEdit = false;

  educational_images = [
    // USE A FILTER FILL IN REST
    { name: '1', img: './assets/education-img/english.jpg' },
    { name: '2', img: './assets/education-img/maths.jpg' },
    { name: '3', img: './assets/education-img/science.jpg' },
    { name: '4', img: './assets/education-img/ict.jpg' },
    { name: '5', img: './assets/education-img/history.jpg' },
    { name: '6', img: './assets/education-img/physical_education.jpg' },
    { name: '7', img: './assets/education-img/geography.jpg' },
    { name: '8', img: './assets/education-img/foreign_languages.jpg' },
    { name: '9', img: './assets/education-img/design_and_tech.jpg' },
    { name: '10', img: './assets/education-img/art.jpg' },
    { name: '11', img: './assets/education-img/music.jpg' },
  ];

  constructor(public activeModal: NgbActiveModal, public modalsService: ModalService) { }

  ngOnInit() {
  }

  saveNewQuiz() {
    this.getImage();
    this.activeModal.close('Close click')
    this.quizDataObject = {
      quizPic: this.quizPic,
      quizName: this.quizName,
      quizDesc: this.quizDesc,
      quizType: this.quizType
    }
    this.modalsService.getModalData(this.quizDataObject);
  }

  editQuiz() {
    this.getImage();
    this.activeModal.close('Close click')
    this.quizDataObject = {
      ID: this.ID,
      quizPic: this.quizPic,
      quizName: this.quizName,
      quizDesc: this.quizDesc,
      quizType: this.quizType,
      isEdit: true
    }
    this.modalsService.getModalData(this.quizDataObject);
  }

  deleteQuiz() {
    this.activeModal.close('Close click')
    this.quizDataObject = {
      ID: this.ID,
      isDelete: true
    }
    this.modalsService.getModalData(this.quizDataObject);
  }

  getImage() {
    let image = this.educational_images.find((x: any) => x.name == this.quizType);
    if (image) {
      this.quizPic = image.img
    }
  }

}
