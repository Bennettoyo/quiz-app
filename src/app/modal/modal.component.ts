import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../services/storage.service';


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

  popoverTitle = 'Are you sure you want to delete?';
  popoverMessage = 'This cannot be undone. All questions will be deleted too.';
  confirmClicked = false;
  cancelClicked = false;


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

  constructor(public activeModal: NgbActiveModal, public modalsService: ModalService, private toastr: ToastrService, public storageService: StorageService) { }

  ngOnInit() {
  }

  saveNewQuiz() {
    if (
      this.undefinedOrEmpty(this.quizName) &&
      this.undefinedOrEmpty(this.quizDesc) &&
      this.undefinedOrEmpty(this.quizType)) {
      this.getImage();
      this.activeModal.close('Close click');
      this.quizDataObject = {
        quizPic: this.quizPic,
        quizName: this.quizName,
        quizDesc: this.quizDesc,
        quizType: this.quizType
      }
      this.storageService.setLocalStorage("modalDataPassed", "true");
      this.modalsService.getModalData(this.quizDataObject);
      console.log("has passed to modalService");
    } else {
      this.toastr.error('Please fill in all inputs!', 'Error!');
    }
  }

  undefinedOrEmpty(input) {
    if (input != "" && input != undefined) {
      return true;
    } else {
      return false;
    }
  }

  editQuiz() {
    if (
      this.undefinedOrEmpty(this.quizName) &&
      this.undefinedOrEmpty(this.quizDesc) &&
      this.undefinedOrEmpty(this.quizType)) {
      this.getImage();
      this.activeModal.close('Close click');
      this.quizDataObject = {
        ID: this.ID,
        quizPic: this.quizPic,
        quizName: this.quizName,
        quizDesc: this.quizDesc,
        quizType: this.quizType,
        isEdit: true
      }
      this.storageService.setLocalStorage("modalDataPassed", "true");
      this.modalsService.getModalData(this.quizDataObject);
    } else {
      this.toastr.error('Please fill in all inputs!', 'Error!');
    }
  }

  deleteQuiz() {
    this.activeModal.close('Close click');
    this.quizDataObject = {
      ID: this.ID,
      isDelete: true
    }
    this.storageService.setLocalStorage("modalDataPassed", "true");
    this.modalsService.getModalData(this.quizDataObject);
  }

  getImage() {
    let image = this.educational_images.find((x: any) => x.name == this.quizType);
    if (image) {
      this.quizPic = image.img
    }
  }

}
