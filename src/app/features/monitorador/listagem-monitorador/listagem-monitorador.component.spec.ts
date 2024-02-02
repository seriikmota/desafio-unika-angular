import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMonitoradorComponent } from './listagem-monitorador.component';

describe('ListagemMonitoradorComponent', () => {
  let component: ListagemMonitoradorComponent;
  let fixture: ComponentFixture<ListagemMonitoradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemMonitoradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemMonitoradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
