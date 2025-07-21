import React from 'react';
import styles from './FormField.module.css';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  register,
  error,
  options,
  rows,
  maxLength,
  showCharCount = false,
  value = '',
}) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <div className={styles.textareaContainer}>
            <textarea
              id={name}
              className={`${styles.textarea} ${error ? styles.error : ''}`}
              placeholder={placeholder}
              rows={rows}
              maxLength={maxLength}
              {...register(name)}
            />
            {showCharCount && maxLength && (
              <div className={styles.charCount}>
                {value.length} / {maxLength}文字
              </div>
            )}
          </div>
        );
        
      case 'radio':
        return (
          <div className={styles.radioGroup}>
            {options.map((option) => (
              <label key={option.value} className={styles.radioLabel}>
                <input
                  type="radio"
                  value={option.value}
                  className={styles.radioInput}
                  {...register(name)}
                />
                <span className={styles.radioText}>{option.label}</span>
              </label>
            ))}
          </div>
        );
        
      default:
        return (
          <input
            id={name}
            type={type}
            className={`${styles.input} ${error ? styles.error : ''}`}
            placeholder={placeholder}
            maxLength={maxLength}
            {...register(name)}
          />
        );
    }
  };

  return (
    <div className={styles.fieldContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {renderInput()}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};

export default FormField;