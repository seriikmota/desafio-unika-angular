import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarMonitoradorComponent } from './cadastrar-monitorador.component';

describe('CadastrarMonitoradorComponent', () => {
  let component: CadastrarMonitoradorComponent;
  let fixture: ComponentFixture<CadastrarMonitoradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarMonitoradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarMonitoradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
