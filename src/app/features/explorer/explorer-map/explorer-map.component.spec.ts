import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerMapComponent } from './explorer-map.component';

describe('ExplorerMapComponent', () => {
  let component: ExplorerMapComponent;
  let fixture: ComponentFixture<ExplorerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
