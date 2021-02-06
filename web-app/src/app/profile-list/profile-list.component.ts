import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExcelService } from '../services/excel.service';
import { ProfileData } from '../models/profileData';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  pageSize: number = 10;
  pageIndex: number = 0;
  pageOptions: number[] = [];

  profilesToShow: ProfileData[];
  profiles: ProfileData[];

  @Input() profilesData: ProfileData[];
  @Output()
  editProfileData: EventEmitter<[ProfileData, number]> = new EventEmitter<
    [ProfileData, number]
  >();
  constructor(private excelService: ExcelService) {}

  ngOnInit(): void {
    this.profiles = this.profilesData;
    if (this.profiles) this.validateProfiles();
  }

  downloadExcel(): void {
    this.excelService.downloadExcel(this.profiles);
  }

  editProfile(profile: ProfileData, index: number): void {
    this.editProfileData.emit([profile, index]);
  }

  paginationEvent(pageIndex: number): void {
    if (this.pageOptions.includes(pageIndex + 1)) {
      this.pageIndex = pageIndex;
      console.log('>>Page', this.pageIndex, this.pageSize);
      this.sliceTeams();
      console.log('>>Show:', this.profilesToShow);
    }
  }

  sliceTeams() {
    this.profilesToShow = this.profiles.slice(
      this.pageIndex * this.pageSize,
      this.pageSize * (this.pageIndex + 1)
    );
    console.log('>>Profiles', typeof this.profiles);
  }

  validateProfiles(): void {
    this.pageOptions = [
      ...Array(Math.ceil(this.profiles.length / 10)).keys(),
    ].map((i) => i + 1);
    console.log('>>Indices', this.pageOptions);
    this.sliceTeams();
  }
}
