import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueursComponent } from './marqueurs.component';

describe('MarqueursComponent', () => {
  let component: MarqueursComponent;
  let fixture: ComponentFixture<MarqueursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarqueursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarqueursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
