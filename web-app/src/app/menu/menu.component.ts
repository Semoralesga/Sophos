import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileData } from '../models/profileData';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isEdit: boolean = false;
  menu: boolean = false;
  formView: boolean = true;
  tableView: boolean = false;
  profiles: ProfileData[];
  profileDataToEdit: [ProfileData, number];
  editIndex: number;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    const storageData = this.storageService.getcurrentProfileData();
    console.log('>>storage', storageData);
    this.profiles =
      storageData.length === 0
        ? this.storageService.loadProfilesData()
        : storageData;
  }

  editProfile(profileEditData: [ProfileData, number]): void {
    this.profileDataToEdit = profileEditData;
    this.isEdit = true;
    this.formView = true;
    this.tableView = false;
  }

  menuHandler(option: string, isMobile: boolean = false): void {
    if (option === 'form') {
      this.formView = true;
      this.tableView = false;
    } else {
      this.formView = false;
      this.tableView = true;
    }
    if (isMobile) this.toggle();
  }

  toggle(): void {
    this.menu = !this.menu;
  }

  pushProfileData(profileData: ProfileData, isEdit: boolean): void {
    !isEdit
      ? this.storageService.addProfileData(profileData)
      : this.storageService.editProfileData(
          profileData,
          this.profileDataToEdit[1]
        );
    this.profiles = this.storageService.getcurrentProfileData();
    console.log('>>Profile', profileData);
    this.isEdit = false;
    this.profileDataToEdit = null;
  }
}
