import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalUnitSetupWebComponent } from './operational-unit-setup-web.component';

describe('OperationalUnitSetupWebComponent', () => {
  let component: OperationalUnitSetupWebComponent;
  let fixture: ComponentFixture<OperationalUnitSetupWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationalUnitSetupWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalUnitSetupWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
