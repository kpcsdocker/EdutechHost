import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private selectedAssignmentSubject = new BehaviorSubject<any>(null);
  private selectedVideoSubject = new BehaviorSubject<any>(null);

  selectedAssignment$ = this.selectedAssignmentSubject.asObservable();
  selectedVideo$ = this.selectedVideoSubject.asObservable();

  setSelectedAssignment(assignment: any) {
    this.selectedAssignmentSubject.next(assignment);
  }

  setSelectedVideo(video: any) {
    this.selectedVideoSubject.next(video);
  }
}
