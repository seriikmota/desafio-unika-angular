import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImportarComponent } from './modal-importar.component';

describe('ModalImportarComponent', () => {
  let component: ModalImportarComponent;
  let fixture: ComponentFixture<ModalImportarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalImportarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalImportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
