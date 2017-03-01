import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPaneComponent } from './mini-pane.component';

describe('MiniPaneComponent', () => {
  let component: MiniPaneComponent;
  let fixture: ComponentFixture<MiniPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
