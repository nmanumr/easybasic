import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocBarComponent } from './doc-bar.component';

describe('DocBarComponent', () => {
  let component: DocBarComponent;
  let fixture: ComponentFixture<DocBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
