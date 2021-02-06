import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Genres } from '../constants';
import { ProfileData } from '../models/profileData';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  filesType = 'image/x-png,image/gif,image/jpeg';
  form: FormGroup;
  genres: Object;

  @Input() isEdit: boolean = false;
  @Input() profileDataToEdit?: [ProfileData, number];

  @Output()
  profileData: EventEmitter<ProfileData> = new EventEmitter<ProfileData>();
  @Output()
  changeView: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.genres = Genres;
    console.log('>>', this.genres);
    this.createForm();
    if (this.isEdit) {
      this.setValues();
    }
  }

  get birthDate() {
    return this.form.get('birthDate');
  }

  get fullName() {
    return this.form.get('fullName');
  }

  get genre() {
    return this.form.get('genre');
  }

  get numberId() {
    return this.form.get('numberId');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get profilePhoto() {
    return this.form.get('profilePhoto');
  }

  createForm(): void {
    this.form = this.fb.group({
      birthDate: ['', Validators.required],
      fullName: ['', Validators.required],
      genre: ['', Validators.required],
      numberId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{6,10}$/),
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{1,10}$/),
          Validators.maxLength(10),
        ],
      ],
      profilePhoto: ['', Validators.required],
    });
  }

  emitProfileData(): void {
    console.log('>>emit');
    if (this.form.valid) {
      this.profileData.emit(this.form.value);
      this.changeView.emit('table');
      this.form.reset();
      console.log('>>Reset');
    }
  }

  selectFile(event: any): void {
    const myFile = event.target.files[0];
    this.profilePhoto.setValue(myFile.name);
    console.log(myFile.name);
  }

  setValues(): void {
    this.form.setValue(this.profileDataToEdit[0]);
  }
}
