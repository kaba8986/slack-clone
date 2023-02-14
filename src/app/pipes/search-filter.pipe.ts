import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  itemLog: any[] = [];

  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: any[], searchText: string): any[] {
    // for (let i = 0; i < items.length; i++) {
    //   this.itemLog = items[i].threadText;

    // }
   
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    console.log('items', items)
    return items.filter((it) => {
      // return it.toString().toLocaleLowerCase().includes(searchText);
      return it.threadText.indexOf(searchText) !== -1});
  }
}
