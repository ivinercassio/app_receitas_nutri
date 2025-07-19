import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaNutricaoComponent } from './minha-nutricao.component';

describe('MinhaNutricaoComponent', () => {
  let component: MinhaNutricaoComponent;
  let fixture: ComponentFixture<MinhaNutricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhaNutricaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinhaNutricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
