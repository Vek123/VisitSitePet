import { assert } from "console";
import IMask, { Masked } from "imask";


// type ClearFieldType<T> = (form: Form, field: FormFieldInterface, input: T) => void;
// type ValidateFieldType<T> = (form: Form, field: FormFieldInterface, input: T) => void;
// type GetInputEl<T> = (field: FormFieldInterface) => T;
// type FieldProps = FormFieldInterface;
interface FormFieldInterface {
    field: HTMLDivElement,
    correct: string,
    error: string,
    required: boolean,
    _error?: boolean | undefined,
}
interface ClearFIeldInterface {
    clearField: () => void,
}
interface ValidateFieldInterface {
    validateField: () => void,
}
interface MaskedFieldInterface {
    mask: Masked;
}
interface CountedInputFIeldInterface {
    min: number,
    max: number,
}
interface HasManyInputsInterface {
    input: NodeListOf<HTMLInputElement>,
}
interface HasSingleInputInterface {
    input: HTMLInputElement | HTMLTextAreaElement | null,
}
interface HasDefaultValueInterface {
    defaultValue: string,
}
class FormField implements FormFieldInterface {
    field: HTMLDivElement;
    correct: string;
    error: string;
    required: boolean;
    _error?: boolean | undefined;
    constructor(field: HTMLDivElement, correct: string, error: string, required: boolean) {
        this.field = field;
        this.correct = correct;
        this.error = error;
        this.required = required;
    }
}
class ManyInputsField extends FormField implements ClearFIeldInterface, ValidateFieldInterface, HasManyInputsInterface {
    input: NodeListOf<HTMLInputElement>;
    constructor(field: HTMLDivElement, correct: string, error: string, required: boolean) {
        super(field, correct, error, required);
        this.input = field.querySelectorAll("input");
    }
    clearField(): void {
        this.field.classList.remove(this.error);
        this.field.classList.remove(this.correct);
        this.input.forEach(x => {
            if (x.getAttribute("checked") !== null) {
                this.field.classList.add(this.correct);
            }
        });
    }
    validateField(): void {
        if (this.field.querySelector("input:checked")) {
            this.field.classList.add(this.correct);
        } else {
            if (this.required) {
                this.field.classList.add(this.error);
            }
            this.field.classList.remove(this.correct);
        }
    }
}
class SingleInputField extends FormField implements ClearFIeldInterface, HasSingleInputInterface {
    input: HTMLInputElement | HTMLTextAreaElement | null;
    constructor(field: HTMLDivElement, correct: string, error: string, required: boolean) {
        super(field, correct, error, required)
        this.input = field.querySelector("input") || field.querySelector("textarea");
    }
    clearField(): void {
        this.field.classList.remove(this.error);
        this.field.classList.remove(this.correct);
    }
}
class CountedInputFIeld extends SingleInputField implements CountedInputFIeldInterface {
    min: number;
    max: number;
    constructor(field: HTMLDivElement, correct: string, error: string, required: boolean, min?: number, max?: number) {
        super(field, correct, error, required);
        this.min = min || 1;
        this.max = max || Infinity;
    }
}
class MaskedCountedInputField extends CountedInputFIeld implements MaskedFieldInterface {
    mask: Masked;
    constructor(field: HTMLDivElement, correct: string, error: string, required: boolean, mask: Masked, min?: number, max?: number) {
        super(field, correct, error, required, min, max);
        this.mask = mask;
    }
}
class TextField extends CountedInputFIeld implements ValidateFieldInterface {
    validateField() {
        if (this.input) {
            if (this.min <= this.input.value.length && this.input.value.length < this.max) {
                this.field.classList.add(this.correct);
            } else {
                if (this.required) {
                    this.field.classList.add(this.error);
                }
                this.field.classList.remove(this.correct);
            }
        }
    }
}
class TextAreaField extends TextField {}
class CheckBoxField extends ManyInputsField {}
class RadioField extends ManyInputsField {}
class ContactsField extends CountedInputFIeld implements MaskedFieldInterface {
    mask: Masked;
    constructor(field: HTMLDivElement, correct: string, error: string, required: boolean, min?: number, max?: number) {
        super(field, correct, error, required, min, max);
        this.mask = IMask.createMask({
            mask: [
                {
                    mask: "+{7} (000) 000-00-00",
                },
                {
                    mask: /^.+$/i,
                }
            ]
        })
    }
    validateField() {
        let reEmail = new RegExp(/^[a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-.]{0,1}([a-zA-Z][-.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{2,}([.-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i);
        let rePhone = new RegExp(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/);
        if (this.input) {
            if (this.min <= this.input.value.length && this.input.value.length < this.max) {
                if (reEmail.test(this.input.value)) {
                    this.input.setAttribute("maxLength", "");
                    this.field.classList.add(this.correct);
                } else if (rePhone.test(this.input.value)) {
                    this.input.setAttribute("maxLength", "18");
                    this.field.classList.add(this.correct);
                } else {
                    if (this.required) {
                        this.field.classList.add(this.error);
                    }
                    this.field.classList.remove(this.correct);
                    this.input.removeAttribute("maxLength");
                }
            } else {
                if (this.required) {
                    this.field.classList.add(this.error);
                }
                this.field.classList.remove(this.correct);
            }
        }
    }
}
class SelectField extends SingleInputField implements ValidateFieldInterface, HasDefaultValueInterface {
    defaultValue: string;
    constructor(field: HTMLDivElement, correct: string, error: string, required: boolean, defaultValue: string) {
        super(field, correct, error, required);
        this.defaultValue = defaultValue;
    }
    clearField(): void {
        super.clearField();
        if (this.input) {
            this.input.value = this.defaultValue;
        }
    }
    validateField(): void {
        if (this.input) {
            if (this.defaultValue === this.input.value) {
                if (this.required) {
                    this.field.classList.add(this.error);
                }
                this.field.classList.remove(this.correct);
            } else {
                this.field.classList.add(this.correct);
            }
        }

    }
}
class MaskedTextField extends MaskedCountedInputField {
    validateField() {
        if (this.input) {
            if (this.min <= this.input.value.length && this.input.value.length < this.max && this.mask.isComplete) {
                this.field.classList.add(this.correct);
            } else {
                if (this.required) {
                    this.field.classList.add(this.error);
                }
                this.field.classList.remove(this.correct);
            }
        }
    }
}
class MaskedTextAreaField extends MaskedTextField {};

// class TextField implements SingleInputFieldInterface {
//     clearField(form, field, input) {

//     }
// }
// class TextAreaField extends TextFieldInterface {}
// class ContactsField implements FormFieldInterface {}
// class RadioField implements ManyInputsFieldInterface {}
// class RatingField implements ManyInputsFieldInterface {}




// class FormField implements FormFieldInterface {
//     type: string;
//     name: string;
//     correct: string;
//     error: string;
//     containerSelector?: string | undefined;
//     clearFunction: (form: Form, field: FormField, input: HTMLInputElement | HTMLInputElement[]) => void;
//     required: boolean;
//     min: number;
//     max: number;
//     _error?: boolean;
//     constructor(props: FormFieldProps) {
//         this.type = props.type;
//         this.name = props.name;
//         this.correct = props.correct;
//         this.error = props.error;
//         this.containerSelector = props.containerSelector;
//         this.clearFunction = props.clearFunction;
//         this.required = props.required;
//         this.min = props.min;
//         this.max = props.max;
//         this._error = false;
//     }
// }

interface FormConfigInterface {
    fields: FormField[],
    successFormClassElement: Form | HTMLDivElement,
    successFormClass?: string,
    submitButtonSelector?: string,
    onlyOnSubmitError?: boolean,
    inputContainerCorrect: string,
    inputContainerError: string,
}
type FormConfigProps = FormConfigInterface;
class FormConfig implements FormConfigInterface {
    fields: FormField[];
    successFormClassElement: Form | HTMLDivElement;
    successFormClass?: string;
    submitButtonSelector?: string;
    onlyOnSubmitError?: boolean;
    inputContainerCorrect: string;
    inputContainerError: string;
    constructor(props: FormConfigProps) {
        this.fields = props.fields;
        this.successFormClassElement = props.successFormClassElement;
        this.successFormClass = props.successFormClass || "_success";
        this.submitButtonSelector = props.submitButtonSelector || ".submit";
        this.onlyOnSubmitError = props.onlyOnSubmitError || false;
        this.inputContainerCorrect = props.inputContainerCorrect || "_correct";
        this.inputContainerError = props.inputContainerError || "_error";
    }
}
interface FormInterface {
    selector: string,
    config: FormConfig,
    errors?: number,
    form?: HTMLFormElement,
    submitButton?: HTMLButtonElement,
    _firstValidation?: boolean,
}
type FormProps = FormInterface

class Form implements FormInterface {
    selector: string;
    config: FormConfig;
    errors?: number = 0;
    form?: HTMLFormElement;
    submitButton?: HTMLButtonElement;
    _firstValidation?: boolean = true;
    constructor(props: FormProps) {
        this.selector = props.selector;
        this.config = props.config;
        this.form = props.form;
        this.submitButton = props.submitButton;
    }
}


export  { Form, FormField };