import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCsvComponent } from './process-csv.component';

describe('ProcessCsvComponent', () => {
  let component: ProcessCsvComponent;
  let fixture: ComponentFixture<ProcessCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessCsvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
