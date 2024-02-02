import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirMonitoradorComponent } from './excluir-monitorador.component';

describe('ExcluirMonitoradorComponent', () => {
  let component: ExcluirMonitoradorComponent;
  let fixture: ComponentFixture<ExcluirMonitoradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirMonitoradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcluirMonitoradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
