import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpServiceService } from '../http-service.service';
import { FilterComponent } from './filter.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { IModel } from '../model';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let testService: HttpServiceService;
  let iModel: IModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [HttpClientModule],
      providers: [HttpServiceService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    testService = TestBed.get(HttpServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('testing title', () => {
    expect(component.name).toBe('testing');
  });

  it('On init users should be loaded', fakeAsync(() => {
    let productSpy = spyOn(testService, 'getApiData').and.callFake(() => {
      return of([iModel]).pipe(delay(300));
    });
    let subSpy = spyOn(testService.getApiData("q"), 'subscribe');
    component.ngOnInit();
    tick();
    expect(productSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should click submit button', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.submit-button'));
    spyOn(component, 'submitValue');
    //Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);
    tick();
    expect(component.submitValue).toHaveBeenCalled();
  }));

  it('should have "filterBrands()" pushing data', () => {
    component.searchResult = [];
    const event = { query: 'alias odio' };
    component.filterValue(event);
    expect(component.searchResult.length).toBe(1);
  });
});
