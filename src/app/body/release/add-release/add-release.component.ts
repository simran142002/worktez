import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-add-release',
  templateUrl: './add-release.component.html',
  styleUrls: ['./add-release.component.css']
})
export class AddReleaseComponent implements OnInit {

  todayDate: string;
  minDate:string;
  showLoader: boolean = false;
  addReleaseActive: boolean = true;

  constructor(public popupHandlerService: PopupHandlerService,  public toolService: ToolsService, public backendService: BackendService, public authService: AuthService) { }

  ngOnInit(): void {
    this.todayDate = this.toolService.date();
    const dateArray = this.todayDate.split('-');
    this.minDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
  }

  validateRelease() {

  }

  addRelease() {
    this.showLoader = true;
  }

}
