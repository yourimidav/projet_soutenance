import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldcitiesComponent } from './worldcities.component';

describe('WorldcitiesComponent', () => {
  let component: WorldcitiesComponent;
  let fixture: ComponentFixture<WorldcitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldcitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldcitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
