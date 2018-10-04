import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JedisComponent } from './jedis.component';

describe('JedisComponent', () => {
  let component: JedisComponent;
  let fixture: ComponentFixture<JedisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JedisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JedisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
