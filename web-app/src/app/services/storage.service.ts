import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileData } from '../models/profileData';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorageService;
  private currentProfileData: ProfileData[] = [];

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentProfileData = this.loadProfilesData();
  }

  addProfileData(profileData: ProfileData): void {
    this.currentProfileData.push(profileData);
    this.localStorageService.setItem(
      'currentProfileData',
      JSON.stringify(this.currentProfileData)
    );
  }

  editProfileData(profileData: ProfileData, index: number): void {
    this.currentProfileData[index] = profileData;
    this.localStorageService.setItem(
      'currentProfileData',
      JSON.stringify(this.currentProfileData)
    );
  }

  loadProfilesData(): ProfileData[] {
    console.log(this.localStorageService.getItem('currentProfileData'));
    const profileData: ProfileData[] = JSON.parse(
      this.localStorageService.getItem('currentProfileData')
    );
    return profileData ? profileData : [];
  }

  getcurrentProfileData(): ProfileData[] {
    return this.currentProfileData;
  }

  removecurrentProfileData(): void {
    this.localStorageService.removeItem('currentProfileData');
    this.currentProfileData = [];
  }
}
