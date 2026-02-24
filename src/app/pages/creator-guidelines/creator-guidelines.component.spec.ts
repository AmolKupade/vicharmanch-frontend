import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorGuidelinesComponent } from './creator-guidelines.component';

describe('CreatorGuidelinesComponent', () => {
  let component: CreatorGuidelinesComponent;
  let fixture: ComponentFixture<CreatorGuidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorGuidelinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
