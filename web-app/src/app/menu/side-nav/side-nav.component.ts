import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Output() changeView: EventEmitter<string> = new EventEmitter<string>();

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {}

  menuType(type: string): void {
    console.log('type', type);
    this.changeView.emit(type);
  }
}
