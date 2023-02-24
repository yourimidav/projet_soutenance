import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIpComponent } from './show-ip.component';

describe('ShowIpComponent', () => {
  let component: ShowIpComponent;
  let fixture: ComponentFixture<ShowIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
