/***********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { GitData } from 'src/app/Interface/githubReleaseData'
import { ValidationService } from 'src/app/services/validation/validation.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
@Component({
  selector: 'app-add-release',
  templateUrl: './add-release.component.html',
  styleUrls: ['./add-release.component.css']
})
export class AddReleaseComponent implements OnInit {

  componentName: string = "ADDRELEASES"

  @Input("teamId") teamId: string;
  @Input("teamIds") teamIds: string[];
  @Output() getReleases: EventEmitter<string> = new EventEmitter();

  gitData: GitData[] = [];
  minDate:string;
  showLoader: boolean = false;
  addReleaseActive: boolean = true;
  generateRelease: string = "true";
  preRelease: string = "true";
  ifDraft: string = "false";
  releaseDate: string;
  description: string = "";
  bearerToken: string = "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";
  tagName: string;
  repoName: string;
  releaseName: string;
  ownerName: string;
  targetBranch: string;
  dataFetched: boolean = false;
  choose: string[] = ["true", "false"];
  response1: boolean;
  response2: boolean;
  response3: boolean;

  constructor(public popupHandlerService: PopupHandlerService,  public toolService: ToolsService, public backendService: BackendService, public authService: AuthService,  private httpService: HttpServiceService, public validationService: ValidationService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.releaseDate = this.toolService.date();
    const dateArray = this.releaseDate.split('-');
    this.minDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
  }

  addReleaseDetailsToDB(){
    this.showLoader = true;
    const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
    const callable = this.functions.httpsCallable('makeRelease/addRelease');
    callable({ReleaseName: this.releaseName, TagName: this.tagName, TargetBranch: this.targetBranch, Description: this.description, IfDraft: this.ifDraft, PreRelease: this.preRelease, GenerateRelease: this.generateRelease, OwnerName: this.ownerName, RepoName: this.repoName, ReleaseDate: this.releaseDate, TeamId: this.teamId, OrgDomain: orgDomain}).subscribe({
      next: (data) => {
        console.log("Successful Next");
        this.showLoader = false;
      },
      error: (error) => {
        console.log(error);
      }, 
      complete: () => {
        this.releaseName = "";
        this.description = "";
        this.tagName = "";
        this.targetBranch = "";
        this.ifDraft = "";
        this.preRelease = "";
        this.generateRelease = "";
        this.ownerName = "";
        this.repoName = "";
        this.releaseDate = "";
        this.teamId = "";
        this.getReleases.emit();
        this.popupHandlerService.addReleaseActive = false;
        this.showLoader = false;
      }
    });
  }

  validateRelease() {
    if(this.generateRelease=="true"){
      this.response1=true;
    } else {
      this.response1=false
    }
    if(this.ifDraft == "true"){
      this.response2=true;
    } else {
      this.response2=false;
    }
    if(this.preRelease == "true"){
      this.response3=true;
    } else{
      this.response3=false;
    }
    let data = [{ label: "tagName", value: this.tagName },
    { label: "targetBranch", value: this.targetBranch },
    { label: "description", value: this.description },
    { label: "ownerName", value: this.ownerName },
    { label: "repoName", value: this.repoName }
  ];
    this.validationService.checkValidity(this.componentName, data).then(
      res => {
        console.log("condition", res);
        if(res) {
          console.log("Inputs are valid");
          this.addRelease();
        } else {
          console.log("Add Release failed due to validation error!");
        }
      }
    );
  }

  addRelease() {
    this.showLoader = true;
    this.httpService.createGithubRelease(this.bearerToken, this.releaseName, this.tagName, this.targetBranch, this.description, this.response2, this.response3, this.response1, this.ownerName, this.repoName).then((data) => {
      if(data.status == 201){
        this.addReleaseDetailsToDB();
        this.showLoader = false;
        this.popupHandlerService.addReleaseActive = false;
      }
    })
  }

}
