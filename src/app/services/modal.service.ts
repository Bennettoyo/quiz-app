import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subject } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalDataSource: any = new Subject<string>();
  modalData$ = this.modalDataSource.asObservable();

  constructor(private modalService: NgbModal) {
    // this.modalData$ = this.modalDataSource.asObservable();
  }

  addModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = 'Add New Quiz';
    modalRef.componentInstance.isEdit = false;
  }

  editModal(modalData) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = 'Edit Quiz';
    modalRef.componentInstance.quizName = modalData.QuizName;
    modalRef.componentInstance.ID = modalData.ID;
    modalRef.componentInstance.quizPic = modalData.Image;
    modalRef.componentInstance.quizDesc = modalData.Description;
    modalRef.componentInstance.quizType = modalData.QuizType;
    modalRef.componentInstance.isEdit = true;
  }

  getModalData(object) {
    // debugger;
    // this.modalData$ = of(<any>[]);
    this.modalDataSource.next(object);
    this.modalData$.source.observers = [];
    // this.modalData$.source.observers += this.modalDataSource;
    // this.modalDataSource = new Subject<string>();
    // this.modalData$ = this.modalDataSource.asObservable();
    // console.log(this.modalData$)
  }


}
