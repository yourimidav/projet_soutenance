import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturesDetaisComponent } from './temperatures-detais.component';

describe('TemperaturesDetaisComponent', () => {
  let component: TemperaturesDetaisComponent;
  let fixture: ComponentFixture<TemperaturesDetaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperaturesDetaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperaturesDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
