import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattingGuideComponent } from './formatting-guide.component';

describe('FormattingGuideComponent', () => {
  let component: FormattingGuideComponent;
  let fixture: ComponentFixture<FormattingGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormattingGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormattingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
