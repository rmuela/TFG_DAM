/*
import { Component, OnInit, ViewEncapsulation, Input, ViewChildren, ChangeDetectionStrategy, Injector, Self, QueryList, forwardRef, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import {  DeviceDetectorService } from 'ngx-device-detector';
import { LibPinBoxItemDirective } from './LibPinBoxItemDirective';
const PIN_BOX_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LibPinBoxComponent),
  multi: true
};

@Component({
  selector: 'app-lib-pin-box',
  templateUrl: './lib-pin-box.component.html',
  styleUrls: ['./lib-pin-box.component.css'],
  providers: [ PIN_BOX_CONTROL_ACCESSOR ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-pin-box'
  }

})
export class LibPinBoxComponent implements OnInit, ControlValueAccessor {

  // ---- ControlValueAccessor ----
  public _disabled = false;
  public value = '';
  private onTouch: Function = () => {};
  private onCtrlChange: Function = () => {};

  registerOnTouched(fn: Function) { this.onTouch = fn; }
  registerOnChange(fn: Function) { this.onCtrlChange = fn; }
  writeValue(value: string) { this.value = value; }
  setDisabledState(isDisabled: boolean) { this._disabled = isDisabled; }


  // ---- Component logic ----

  @Input() length = 1;
  @Input() groupLength = 1;
  @Input() type: 'password' | 'text' = 'text';
  @Input() formControl: FormControl | undefined;
  @Input() errorsMessage: any;

  @ViewChildren(LibPinBoxItemDirective) pinBoxItemDirective: QueryList<LibPinBoxItemDirective> | undefined;
  @ViewChildren(LibPinBoxItemDirective, { read: ElementRef }) pinBoxItemElem: QueryList<ElementRef<HTMLInputElement>> | undefined;

  public _groupList: Array<any> | undefined;
  public _boxInGroupList: Array<any> | undefined;
  public _boxInGroupLength: number | undefined;
  public _isDesktop = true;

  @Output() private valueChanged = new EventEmitter<string[]>();

  constructor(
    private cd: ChangeDetectorRef,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {

    this._groupList = Array(this.groupLength).fill(0);
    this._boxInGroupLength = Math.ceil(this.length / this.groupLength);
    this._boxInGroupList = Array(this._boxInGroupLength).fill(0);

    this._isDesktop = this.deviceService.isDesktop();
  }

  public _onBlur() {

    // On blur browser focus first body elem and then any other target.
    // but after setTimeout activeElement(Focused element) is correct element
    setTimeout(() => {

      const isAnyInputElemFocus =
        this.pinBoxItemElem?.some(inputElem =>
          document.activeElement === inputElem.nativeElement
        );

      // Dirty: we don't need to make form as touch, if user dos't change any value and just select a box,then select somether else.
      if (!isAnyInputElemFocus && this.formControl?.dirty) {
        this.onTouch();
        this.cd.detectChanges(); // Becuse of setTimeout
      }

    });
    
  }


  public _onPaste(pasetedValue: string) {

    const value = pasetedValue.slice(0, this.length);
    this.setValue(value);

    this.pinBoxItemDirective?.forEach((pinBoxItem, index) =>
      pinBoxItem.value = this.value[index]
    );

    this._focusByIndex(this.value.length);
    this.onTouch();
  }

  public _onPinValueChange(index: number) {

    // Merge values and set all empty box to ' '.
    const value =
      this.pinBoxItemDirective?.reduce((oldValue, inputDire) => {
        const pinValue = inputDire.value.trim().length === 1 ? inputDire.value.trim() : ' ';
        return oldValue + pinValue;
      }, '');
    if(value !== undefined)
      this.setValue(value);
  }

  // Value of empty box have to be ' '.
  private setValue(value: string) {

    if (this.value === value) {
      return;
    }
    this.value = value;

    // To emit value and set value in to reactive form we don't need ' '.
    const valueAsList = value.split('').map(a => a !== ' ' ? a : '');

    this.valueChanged.emit(valueAsList);
    this.onCtrlChange(valueAsList.join(''));
  }

  public _focusByIndex(index: number) {
    if(this.pinBoxItemElem !== undefined) {
      const indexInBound = Math.max(0, Math.min(index, this.pinBoxItemElem.length - 1));
      const nextPinBox = this.pinBoxItemElem?.toArray()[indexInBound].nativeElement;
      nextPinBox?.focus();
    
    }
   

  }

  public _focusNext(index: number) {
    if(this.pinBoxItemElem !== undefined) {
      if (index >= this.pinBoxItemElem?.length - 1) {
        return;
      }
    }

    const nextPinBox = this.pinBoxItemElem?.toArray()[index + 1].nativeElement;
    nextPinBox?.focus();

  }

  public _focusPrev(index: number) {
    if (index <= 0) {
      return;
    }

    const prevPinBox = this.pinBoxItemElem?.toArray()[index - 1].nativeElement;
    prevPinBox?.focus();
  }

  public _getIndex(groupIndex: number, boxInGroupIndex: number ) {
    return (groupIndex * (this._boxInGroupLength!)) + boxInGroupIndex;
  }

  public _isBoxInvalid(index: number) {
    return this.formControl?.touched && hasNotValue(this.value[index]);
  }

}

 function hasNotValue(value: string | null | undefined) {
    return !(value !== null && value !== undefined && value.trim() !== '');
  }
*/