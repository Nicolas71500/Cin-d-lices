import { IInputsFormProps } from '../models';
import { validateForm } from '../services/formValidation';
import './InputComponent.scss';

function InputComponent({ input, handleChangeInput, password, passwordConfirm }: IInputsFormProps) {
    const errorMessage = validateForm(input, password, passwordConfirm);

    return (
        <div className="form-group">
            <label htmlFor={input.name}>
                {input.label}{input.required ? ' *' : ''}
            </label>
            <input
                id={input.name}
                className={errorMessage ? 'input-error' : ''}
                type={input.type}
                name={input.name}
                onChange={handleChangeInput}
                value={input.value}
                placeholder={input.placeholder ?? ''}
            />
            {errorMessage && <span className="field-error">{errorMessage}</span>}
        </div>
    );
}

export default InputComponent;
