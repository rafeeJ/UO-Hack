import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerTakePhotoComponent } from './explorer-take-photo.component';

describe('ExplorerTakePhotoComponent', () => {
  let component: ExplorerTakePhotoComponent;
  let fixture: ComponentFixture<ExplorerTakePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerTakePhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerTakePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
