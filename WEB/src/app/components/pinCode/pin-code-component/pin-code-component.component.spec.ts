import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCodeComponentComponent } from './pin-code-component.component';

describe('PinCodeComponentComponent', () => {
  let component: PinCodeComponentComponent;
  let fixture: ComponentFixture<PinCodeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinCodeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCodeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
