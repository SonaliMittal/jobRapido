import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpServiceService } from './http-service.service';

describe('HttpServiceService', () => {
  let service: HttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
