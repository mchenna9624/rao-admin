import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPromptComponent } from './product-prompt.component';

describe('ProductPromptComponent', () => {
  let component: ProductPromptComponent;
  let fixture: ComponentFixture<ProductPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
