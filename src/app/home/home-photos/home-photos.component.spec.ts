import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePhotosComponent } from './home-photos.component';

describe('HomePhotosComponent', () => {
  let component: HomePhotosComponent;
  let fixture: ComponentFixture<HomePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
