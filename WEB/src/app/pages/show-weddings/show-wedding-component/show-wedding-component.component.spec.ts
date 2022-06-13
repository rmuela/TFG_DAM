import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWeddingComponentComponent } from './show-wedding-component.component';

describe('ShowWeddingComponentComponent', () => {
  let component: ShowWeddingComponentComponent;
  let fixture: ComponentFixture<ShowWeddingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWeddingComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWeddingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
