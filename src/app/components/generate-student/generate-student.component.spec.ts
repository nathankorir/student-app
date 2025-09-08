import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateStudentComponent } from './generate-student.component';

describe('GenerateStudentComponent', () => {
  let component: GenerateStudentComponent;
  let fixture: ComponentFixture<GenerateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
