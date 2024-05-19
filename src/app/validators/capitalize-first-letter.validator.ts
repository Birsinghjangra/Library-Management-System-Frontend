import { AbstractControl, ValidatorFn } from '@angular/forms';

export function capitalizeFirstLetterValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value && typeof value === 'string') {
            const transformedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            if (transformedValue !== value) {
                control.setValue(transformedValue, { emitEvent: false });
            }
            return null;
        }
        return null;
    };
}
