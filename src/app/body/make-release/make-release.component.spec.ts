import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeReleaseComponent } from './make-release.component';

describe('MakeReleaseComponent', () => {
  let component: MakeReleaseComponent;
  let fixture: ComponentFixture<MakeReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeReleaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
