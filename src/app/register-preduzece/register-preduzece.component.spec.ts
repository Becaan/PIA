import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPreduzeceComponent } from './register-preduzece.component';

describe('RegisterPreduzeceComponent', () => {
  let component: RegisterPreduzeceComponent;
  let fixture: ComponentFixture<RegisterPreduzeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPreduzeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPreduzeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
