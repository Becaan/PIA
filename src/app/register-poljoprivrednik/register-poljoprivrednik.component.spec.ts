import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPoljoprivrednikComponent } from './register-poljoprivrednik.component';

describe('RegisterPoljoprivrednikComponent', () => {
  let component: RegisterPoljoprivrednikComponent;
  let fixture: ComponentFixture<RegisterPoljoprivrednikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPoljoprivrednikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPoljoprivrednikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
