import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerViewPhotoComponent } from './explorer-view-photo.component';

describe('ExplorerViewPhotoComponent', () => {
  let component: ExplorerViewPhotoComponent;
  let fixture: ComponentFixture<ExplorerViewPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerViewPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerViewPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
