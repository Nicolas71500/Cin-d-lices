import { InputFieldProps } from '../models';

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, disabled, error }) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={error ? 'input-error' : ''}
        />
        {error && <span className="field-error">{error}</span>}
    </div>
);

export default InputField;
