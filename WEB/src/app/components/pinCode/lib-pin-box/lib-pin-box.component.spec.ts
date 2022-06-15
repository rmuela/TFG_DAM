import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibPinBoxComponent } from './lib-pin-box.component';

describe('LibPinBoxComponent', () => {
  let component: LibPinBoxComponent;
  let fixture: ComponentFixture<LibPinBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibPinBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibPinBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
