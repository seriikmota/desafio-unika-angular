import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSucessoComponent } from './modal-sucesso.component';

describe('ModalSucessoComponent', () => {
  let component: ModalSucessoComponent;
  let fixture: ComponentFixture<ModalSucessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSucessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
