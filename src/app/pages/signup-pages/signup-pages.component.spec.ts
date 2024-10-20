import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPagesComponent } from './signup-pages.component';

describe('SignupPagesComponent', () => {
  let component: SignupPagesComponent;
  let fixture: ComponentFixture<SignupPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
