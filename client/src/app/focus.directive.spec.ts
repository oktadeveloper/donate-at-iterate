import { FocusDirective } from './focus.directive';
import { ElementRef } from '@angular/core';

describe('FocusDirective', () => {
  it('should create an instance', () => {
    const directive = new FocusDirective(new ElementRef('div'));
    expect(directive).toBeTruthy();
  });
});
