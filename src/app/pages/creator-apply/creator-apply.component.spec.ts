import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorApplyComponent } from './creator-apply.component';

describe('CreatorApplyComponent', () => {
  let component: CreatorApplyComponent;
  let fixture: ComponentFixture<CreatorApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorApplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
