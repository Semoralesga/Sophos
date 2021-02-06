import { Injectable } from '@angular/core';
import { ProfileData } from '../models/profileData';
import { saveAs } from 'file-saver';

import { utils, WorkBook, write } from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  excelOptions(): WorkBook {
    const workBook = utils.book_new();
    workBook.Props = {
      Title: 'Profiles Report',
      Subject: 'Report',
      Author: 'Angular',
      CreatedDate: new Date(),
    };
    workBook.SheetNames.push('Report');
    return workBook;
  }

  jsonToCsv(data: ProfileData[]): string {
    let str: string =
      'Cumpleaños,Nombre,Genero,Identificacion,Celular,ArchivoPerfil\n';
    data.map((profile: ProfileData) => {
      let line = '';
      const profileValues = Object.values(profile);
      profileValues.forEach((value, index) => {
        if (value !== '' && index !== 0) line += ',';

        line += value;
      });
      str += line + '\n';
    });
    return str;
  }

  downloadExcel(data: ProfileData[]): void {
    console.log('>>CSV:', this.jsonToCsv(data));
    const wb = this.excelOptions();
    const wsData = this.jsonToCsv(data)
      .split('\n')
      .map((row) => row.split(','));
    console.log('>>Data', wsData);
    const ws = utils.aoa_to_sheet(wsData);
    wb.Sheets['Report'] = ws;
    const wbout = write(wb, { bookType: 'xlsx', type: 'binary' });
    var buf = new ArrayBuffer(wbout.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff;

    saveAs(
      new Blob([buf], { type: 'application/octet-stream' }),
      'Report.xlsx'
    );
  }
}
