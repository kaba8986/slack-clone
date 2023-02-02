import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseText'
})
export class ReverseTextPipe implements PipeTransform {

  transform(allThreads): string {
    return allThreads.slice().reverse();
  }

}
