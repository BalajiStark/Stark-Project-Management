import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateInputFormat'
})
export class DateInputFormatPipe implements PipeTransform {

  transform(value: Date | string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
