import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldcitiesDetailsComponent } from './worldcities-details.component';

describe('WorldcitiesDetailsComponent', () => {
  let component: WorldcitiesDetailsComponent;
  let fixture: ComponentFixture<WorldcitiesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldcitiesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldcitiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
