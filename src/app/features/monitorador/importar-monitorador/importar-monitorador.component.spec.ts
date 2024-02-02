import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarMonitoradorComponent } from './importar-monitorador.component';

describe('ImportarMonitoradorComponent', () => {
  let component: ImportarMonitoradorComponent;
  let fixture: ComponentFixture<ImportarMonitoradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportarMonitoradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportarMonitoradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
