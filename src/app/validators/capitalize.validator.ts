import { AbstractControl, ValidatorFn } from '@angular/forms';

export function capitalizeWordsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value && typeof value === 'string') {
            const transformedValue = value
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            if (transformedValue !== value) {
                control.setValue(transformedValue, { emitEvent: false });
            }
            return null;
        }
        return null;
    };
}