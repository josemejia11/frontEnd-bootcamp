import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputErrorComponent } from './input-error.component';

describe('InputError Component Isolated Test', () => {
  let component: InputErrorComponent;

  beforeEach(
    waitForAsync(() => {
      component = new InputErrorComponent();
      component.control = new FormControl('', Validators.required);
    }),
  );

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('Component initial state', () => {
    expect(component.control).toBeDefined();
    expect(component.control).toBeInstanceOf(FormControl);
    expect(component.name).toBeDefined();
    expect(component.name).not.toBeNull();
    expect(component.id).toBeDefined();
    expect(component.id).not.toBeNull();
  });

  it('getError() should return an error message when the control is invalid', () => {
    expect(component.control.invalid).toBeTruthy();
    expect(component.getError()).toEqual('This is required');
  });

  it('getError() should not return an error message when the control is valid', () => {
    component.control.setValue('Value');
    expect(component.control.valid).toBeTruthy();
    expect(component.getError()).toEqual('');
  });
});

describe('InputError Component Shallow Test', () => {
  let fixture: ComponentFixture<InputErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputErrorComponent],
      imports: [CommonModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorComponent);
    fixture.componentInstance.id = 'control-error';
    fixture.componentInstance.control = new FormControl('', Validators.required);
    fixture.detectChanges();
  });

  it('Should show an error message when the control is invalid', () => {
    const errorContainer = fixture.debugElement.nativeElement.querySelector('#control-error');
    expect(fixture.componentInstance.control.invalid).toBeTruthy();
    expect(errorContainer).toBeDefined();
    expect(errorContainer.textContent.trim()).toEqual('This is required');
  });

  it('Should not show an error message when the control is valid', () => {
    fixture.componentInstance.control.setValue('Value');
    fixture.detectChanges();
    const errorContainer = fixture.debugElement.nativeElement.querySelector('#control-error');
    expect(fixture.componentInstance.control.valid).toBeTruthy();
    expect(errorContainer).toBeNull();
  });
});
