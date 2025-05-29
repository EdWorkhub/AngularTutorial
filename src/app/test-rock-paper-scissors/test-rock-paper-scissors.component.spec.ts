import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRockPaperScissorsComponent } from './test-rock-paper-scissors.component';

describe('TestRockPaperScissorsComponent', () => {
  let component: TestRockPaperScissorsComponent;
  let fixture: ComponentFixture<TestRockPaperScissorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRockPaperScissorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRockPaperScissorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
