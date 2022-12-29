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

import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { GitData } from 'src/app/Interface/githubReleaseData'
import { HttpServiceService } from 'src/app/services/http/http-service.service';

@Component({
  selector: 'app-make-release',
  templateUrl: './make-release.component.html',
  styleUrls: ['./make-release.component.css']
})
export class MakeReleaseComponent implements OnInit {
  showClose: boolean = false;
  enableLoader:boolean = false;
  gitData: GitData[] = [];
  preRelease: string=null;
  generateRelease: boolean=null;
  draft: string=null;
  ifDraft: string[] = ['true', 'false'];
  response: string;
  response1: string;
  response2: string='pre release';
  dataFetched: boolean = false;

  requestReleaseForm= new FormGroup({
    repoName: new FormControl('', Validators.required),
    ownerName: new FormControl('', Validators.required),
    tagName: new FormControl('', Validators.required),
    releaseName: new FormControl('', Validators.required),
    bearerToken: new FormControl('', Validators.required),
    targetBranch: new FormControl('', Validators.required),
    releaseDescription: new FormControl('', Validators.required)
  })
  get repoName(){return this.requestReleaseForm.get('repoName')};
  get ownerName(){return this.requestReleaseForm.get('ownerName')};
  get tagName(){return this.requestReleaseForm.get('tagName')};
  get bearerToken(){return this.requestReleaseForm.get('bearerToken')};
  get releaseName(){return this.requestReleaseForm.get('releaseName')};
  get targetBranch(){return this.requestReleaseForm.get('targetBranch')};
  get releaseDescription(){return this.requestReleaseForm.get('releaseDescription')};
  
  constructor(private functions: AngularFireFunctions, private httpService: HttpServiceService) { }

  ngOnInit(): void {
    console.log(this.response2);
    console.log(this.ifDraft);
  }

  // submit() {
  //   this.httpService.createGithubRelease(this.bearerToken, this.releaseName, this.tagName, this.targetBranch, this.releaseDescription, this.response, this.response1, this.response2,this.ownerName, this.repoName).pipe(map(data => {
  //     const gitData = data as GitData[];
  //     return gitData;
  //   })).subscribe({
  //     next: (data) => {
  //       this.gitData = data;
  //       this.dataFetched = true;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     },
  //     complete: () => console.info('Successfull')
  //   });
  // }

  added() {

  }

  chooseIfGenerateRelease(item){
    this.response = item;
  }

  chooseIfDraft(item){
    this.response1 = item;
  }

  chooseIfPreRelease(item){
    this.response2 = item;
  }

  makeRelease(){
    console.log(this.tagName, this.releaseName,  this.targetBranch, this.releaseDescription, this.response1, this.response2, this.response);
    const callable = this.functions.httpsCallable('makeRelease/releaseFromWorktez');
    callable({TagName: this.tagName, ReleaseName: this.releaseName, TargetBranch: this.targetBranch, ReleaseDescription: this.releaseDescription, IfDraft: this.response1, IfPreRelease:this.response2, IfGenerateRelease: this.response}).subscribe({
      next: (data) => {

      },
      error: (error) => {

      },
      complete: () => {
        console.info('Successfully created release');

      }
    })
  }

  close() {

  }

}
