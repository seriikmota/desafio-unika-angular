import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemEnderecoComponent } from './listagem-endereco.component';

describe('ListagemEnderecoComponent', () => {
  let component: ListagemEnderecoComponent;
  let fixture: ComponentFixture<ListagemEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemEnderecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
