import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  selectedValue: any;
  searchResult: any[];
  list: any[];
  dynamicArr = [];
  selVal: any;
  showMsg = false;
  constructor(private httpCall: HttpServiceService) {}

  ngOnInit(): void {
    this.httpCall.getData('q').subscribe((res) => {
      console.log(res);
      this.list = res;
    });
  }

  filterValue(event) {
    let filtered: any[] = [];
    let query = event.query;
    if (event.query.length >= 3) {
    for (let i = 0; i < this.list.length; i++) {
      let country = this.list[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }

    }
    }
    this.searchResult = filtered;
  }
  selectedEmail(event) {
    this.selVal = event;
  }

  submitValue(value) {
    if (this.dynamicArr.length < 20) {
      if (this.selVal == value) {
        if (this.dynamicArr.includes(value) === false) {
          this.showMsg = false;
          this.dynamicArr.push(value);
          this.selectedValue = '';
        } else {
          this.showMsg = true;
        }
      }
    } else {
      console.log('==');
    }
  }
}
