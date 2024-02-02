import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirEnderecoComponent } from './excluir-endereco.component';

describe('ExcluirEnderecoComponent', () => {
  let component: ExcluirEnderecoComponent;
  let fixture: ComponentFixture<ExcluirEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirEnderecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcluirEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
