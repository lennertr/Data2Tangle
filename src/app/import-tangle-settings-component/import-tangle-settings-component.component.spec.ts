import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTangleSettingsComponentComponent } from './import-tangle-settings-component.component';

describe('ImportTangleSettingsComponentComponent', () => {
  let component: ImportTangleSettingsComponentComponent;
  let fixture: ComponentFixture<ImportTangleSettingsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTangleSettingsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTangleSettingsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
