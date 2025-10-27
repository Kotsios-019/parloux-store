'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { AccessibleInput, AccessibleButton } from '@/components/accessibility/AccessibilityUtils';
import { useScreenReaderAnnouncement } from '@/components/accessibility/AccessibilityUtils';

interface AccessibleFormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  description?: string;
}

export function AccessibleFormField({
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  value,
  onChange,
  onBlur,
  className = '',
  autoComplete,
  maxLength,
  minLength,
  pattern,
  description
}: AccessibleFormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { announce } = useScreenReaderAnnouncement();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (description) {
      announce(description);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    announce(showPassword ? 'Password hidden' : 'Password visible');
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasError = !!error;
  const isValid = !hasError && value.length > 0 && !isFocused;

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-josefin font-semibold text-font-primary dark:text-ivory-white">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {description && (
        <p className="text-sm text-font-secondary dark:text-font-secondary-dark">
          {description}
        </p>
      )}

      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
            hasError
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : isValid
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : 'border-elegant-base dark:border-elegant-base bg-white dark:bg-deep-black'
          }`}
          aria-invalid={hasError}
          aria-describedby={error ? 'error-message' : description ? 'field-description' : undefined}
        />

        {/* Password visibility toggle */}
        {type === 'password' && (
          <AccessibleButton
            onClick={togglePasswordVisibility}
            ariaLabel={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-font-secondary dark:text-font-secondary-dark hover:text-font-primary dark:hover:text-ivory-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </AccessibleButton>
        )}

        {/* Validation icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isValid && (
            <CheckCircle className="w-5 h-5 text-green-500" aria-label="Valid input" />
          )}
          {hasError && (
            <AlertCircle className="w-5 h-5 text-red-500" aria-label="Invalid input" />
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          id="error-message"
          className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Character count */}
      {maxLength && (
        <div className="text-xs text-font-secondary dark:text-font-secondary-dark text-right">
          {value.length}/{maxLength} characters
        </div>
      )}
    </div>
  );
}

interface AccessibleFormProps {
  onSubmit: (data: FormData) => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function AccessibleForm({
  onSubmit,
  children,
  className = '',
  ariaLabel
}: AccessibleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { announce } = useScreenReaderAnnouncement();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      await onSubmit(formData);
      announce('Form submitted successfully');
    } catch (error) {
      announce('Form submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      aria-label={ariaLabel}
      noValidate
    >
      {children}
      
      {/* Form submission status */}
      {isSubmitting && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-josefin text-blue-800 dark:text-blue-200">
              Submitting form...
            </span>
          </div>
        </div>
      )}
    </form>
  );
}

interface AccessibleCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
}

export function AccessibleCheckbox({
  label,
  checked,
  onChange,
  required = false,
  error,
  description,
  className = ''
}: AccessibleCheckboxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { announce } = useScreenReaderAnnouncement();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
    announce(e.target.checked ? `${label} selected` : `${label} deselected`);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (description) {
      announce(description);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="relative">
          <input
            type="checkbox"
            id={`checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`}
            checked={checked}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            className={`w-5 h-5 rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 ${
              error
                ? 'border-red-500'
                : checked
                ? 'border-soft-gold bg-soft-gold'
                : 'border-elegant-base dark:border-elegant-base'
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? 'checkbox-error' : description ? 'checkbox-description' : undefined}
          />
          {checked && (
            <CheckCircle className="absolute top-0 left-0 w-5 h-5 text-deep-black pointer-events-none" />
          )}
        </div>
        
        <div className="flex-1">
          <label
            htmlFor={`checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-sm font-josefin font-semibold text-font-primary dark:text-ivory-white cursor-pointer"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
          
          {description && (
            <p id="checkbox-description" className="text-sm text-font-secondary dark:text-font-secondary-dark mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div
          id="checkbox-error"
          className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface AccessibleSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
}

export function AccessibleSelect({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  placeholder,
  className = ''
}: AccessibleSelectProps) {
  const { announce } = useScreenReaderAnnouncement();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    const selectedOption = options.find(opt => opt.value === e.target.value);
    if (selectedOption) {
      announce(`${selectedOption.label} selected`);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-josefin font-semibold text-font-primary dark:text-ivory-white">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      <select
        value={value}
        onChange={handleChange}
        required={required}
        className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
          error
            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
            : 'border-elegant-base dark:border-elegant-base bg-white dark:bg-deep-black'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? 'select-error' : undefined}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <div
          id="select-error"
          className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
