import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Subscription } from 'rxjs';
import {IModel} from '../model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  sub: Subscription;
  name = 'testing';
  selectedValue: any;
  searchResult: any[];
  list: IModel[];
  dynamicArr = [];
  selVal: any;
  showMsg = false;
  constructor(private httpCall: HttpServiceService, private http: HttpClient) {}

  ngOnInit() {
    this.getPList();
  }
  getPList(): void {
    this.sub = this.httpCall.getApiData("q").subscribe((res) => {
      this.list = res;
    });
  }
  filterValue(event) {
    let filtered: any[] = [];
    let query = event.query;
    if (event.query.length > 3) {
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
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
