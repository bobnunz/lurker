import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaveToCSVComponent } from './dialog-save-to-csv.component';

describe('DialogSaveToCSVComponent', () => {
  let component: DialogSaveToCSVComponent;
  let fixture: ComponentFixture<DialogSaveToCSVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSaveToCSVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSaveToCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
