'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Eye, EyeOff, X, Info } from 'lucide-react';
import { useToastNotifications } from '@/components/ui/Toast';

// Validation rules interface
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
  message?: string;
}

// Field validation interface
export interface FieldValidation {
  [key: string]: ValidationRule[];
}

// Form state interface
export interface FormState {
  values: { [key: string]: string };
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  isValid: boolean;
  isSubmitting: boolean;
}

// Validation hook
export function useFormValidation(
  initialValues: { [key: string]: string },
  validationRules: FieldValidation,
  onSubmit: (values: { [key: string]: string }) => Promise<void>
) {
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isValid: false,
    isSubmitting: false
  });

  const { showSuccess, showError } = useToastNotifications();

  // Validate single field
  const validateField = (name: string, value: string): string | null => {
    const rules = validationRules[name] || [];
    
    for (const rule of rules) {
      if (rule.required && (!value || value.trim() === '')) {
        return rule.message || `${name} is required`;
      }
      
      if (value && rule.minLength && value.length < rule.minLength) {
        return rule.message || `${name} must be at least ${rule.minLength} characters`;
      }
      
      if (value && rule.maxLength && value.length > rule.maxLength) {
        return rule.message || `${name} must be no more than ${rule.maxLength} characters`;
      }
      
      if (value && rule.pattern && !rule.pattern.test(value)) {
        return rule.message || `${name} format is invalid`;
      }
      
      if (value && rule.custom) {
        const customError = rule.custom(value);
        if (customError) {
          return customError;
        }
      }
    }
    
    return null;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formState.values[fieldName]);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
      }
    });

    setFormState(prev => ({
      ...prev,
      errors,
      isValid
    }));

    return isValid;
  };

  // Handle field change
  const handleChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value
      },
      errors: {
        ...prev.errors,
        [name]: ''
      }
    }));
  };

  // Handle field blur
  const handleBlur = (name: string) => {
    const error = validateField(name, formState.values[name]);
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [name]: true
      },
      errors: {
        ...prev.errors,
        [name]: error || ''
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const touched: { [key: string]: boolean } = {};
    Object.keys(validationRules).forEach(fieldName => {
      touched[fieldName] = true;
    });

    setFormState(prev => ({
      ...prev,
      touched
    }));

    // Validate form
    if (!validateForm()) {
      showError('Please fix the errors below', 'Form validation failed');
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(formState.values);
      showSuccess('Form submitted successfully!', 'Your information has been saved');
    } catch (error) {
      showError('Submission failed', error instanceof Error ? error.message : 'Please try again');
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false
    });
  };

  return {
    formState,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateField,
    validateForm
  };
}

// Enhanced input component with validation
export function ValidatedInput({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  className = '',
  autoComplete,
  maxLength,
  minLength,
  pattern,
  description,
  successMessage,
  showSuccessIcon = false
}: {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  description?: string;
  successMessage?: string;
  showSuccessIcon?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = touched && error;
  const hasSuccess = touched && !error && value && successMessage;
  const isValid = touched && !error && value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label className="block text-sm font-josefin font-semibold text-font-primary dark:text-ivory-white">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {/* Description */}
      {description && (
        <p className="text-sm text-font-secondary dark:text-font-secondary-dark">
          {description}
        </p>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          ref={inputRef}
          type={inputType}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            hasError
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-red-500'
              : hasSuccess
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 focus:ring-green-500'
              : isValid
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 focus:ring-green-500'
              : isFocused
              ? 'border-soft-gold focus:ring-soft-gold'
              : 'border-elegant-base dark:border-elegant-base bg-white dark:bg-deep-black'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${name}-error` : 
            hasSuccess ? `${name}-success` : 
            description ? `${name}-description` : undefined
          }
        />

        {/* Password visibility toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-font-secondary dark:text-font-secondary-dark hover:text-font-primary dark:hover:text-ivory-white transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 rounded"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}

        {/* Status Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {hasError && (
            <AlertCircle className="w-5 h-5 text-red-500" aria-label="Error" />
          )}
          {hasSuccess && showSuccessIcon && (
            <CheckCircle className="w-5 h-5 text-green-500" aria-label="Success" />
          )}
          {isValid && !hasSuccess && (
            <CheckCircle className="w-5 h-5 text-green-500" aria-label="Valid" />
          )}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id={`${name}-error`}
            className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {hasSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id={`${name}-success`}
            className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-1"
            role="status"
            aria-live="polite"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Count */}
      {maxLength && (
        <div className="text-xs text-font-secondary dark:text-font-secondary-dark text-right">
          <span className={value.length > maxLength * 0.9 ? 'text-yellow-600 dark:text-yellow-400' : ''}>
            {value.length}/{maxLength} characters
          </span>
        </div>
      )}
    </div>
  );
}

// Enhanced textarea component
export function ValidatedTextarea({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  className = '',
  maxLength,
  minLength,
  description,
  successMessage,
  rows = 4
}: {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  minLength?: number;
  description?: string;
  successMessage?: string;
  rows?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = touched && error;
  const hasSuccess = touched && !error && value && successMessage;
  const isValid = touched && !error && value;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label className="block text-sm font-josefin font-semibold text-font-primary dark:text-ivory-white">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {/* Description */}
      {description && (
        <p className="text-sm text-font-secondary dark:text-font-secondary-dark">
          {description}
        </p>
      )}

      {/* Textarea */}
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        rows={rows}
        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-vertical ${
          hasError
            ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-red-500'
            : hasSuccess
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 focus:ring-green-500'
            : isValid
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 focus:ring-green-500'
            : isFocused
            ? 'border-soft-gold focus:ring-soft-gold'
            : 'border-elegant-base dark:border-elegant-base bg-white dark:bg-deep-black'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-invalid={hasError}
        aria-describedby={
          hasError ? `${name}-error` : 
          hasSuccess ? `${name}-success` : 
          description ? `${name}-description` : undefined
        }
      />

      {/* Error Message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id={`${name}-error`}
            className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {hasSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id={`${name}-success`}
            className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-1"
            role="status"
            aria-live="polite"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Count */}
      {maxLength && (
        <div className="text-xs text-font-secondary dark:text-font-secondary-dark text-right">
          <span className={value.length > maxLength * 0.9 ? 'text-yellow-600 dark:text-yellow-400' : ''}>
            {value.length}/{maxLength} characters
          </span>
        </div>
      )}
    </div>
  );
}

// Enhanced select component
export function ValidatedSelect({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  className = '',
  options,
  placeholder,
  description,
  successMessage
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  description?: string;
  successMessage?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = touched && error;
  const hasSuccess = touched && !error && value && successMessage;
  const isValid = touched && !error && value;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label className="block text-sm font-josefin font-semibold text-font-primary dark:text-ivory-white">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {/* Description */}
      {description && (
        <p className="text-sm text-font-secondary dark:text-font-secondary-dark">
          {description}
        </p>
      )}

      {/* Select */}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 appearance-none ${
            hasError
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-red-500'
              : hasSuccess
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 focus:ring-green-500'
              : isValid
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 focus:ring-green-500'
              : isFocused
              ? 'border-soft-gold focus:ring-soft-gold'
              : 'border-elegant-base dark:border-elegant-base bg-white dark:bg-deep-black'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${name}-error` : 
            hasSuccess ? `${name}-success` : 
            description ? `${name}-description` : undefined
          }
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

        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-font-secondary dark:text-font-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Status Icons */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          {hasError && (
            <AlertCircle className="w-5 h-5 text-red-500" aria-label="Error" />
          )}
          {hasSuccess && (
            <CheckCircle className="w-5 h-5 text-green-500" aria-label="Success" />
          )}
          {isValid && !hasSuccess && (
            <CheckCircle className="w-5 h-5 text-green-500" aria-label="Valid" />
          )}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id={`${name}-error`}
            className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {hasSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id={`${name}-success`}
            className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-1"
            role="status"
            aria-live="polite"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Form progress indicator
export function FormProgress({
  currentStep,
  totalSteps,
  className = ''
}: {
  currentStep: number;
  totalSteps: number;
  className?: string;
}) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm font-josefin text-font-secondary dark:text-font-secondary-dark">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      
      <div className="w-full bg-elegant-base/20 rounded-full h-2">
        <motion.div
          className="bg-soft-gold h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Form success state
export function FormSuccess({
  title,
  message,
  onClose,
  className = ''
}: {
  title: string;
  message: string;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 ${className}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-cormorant font-bold text-green-800 dark:text-green-200 mb-2">
            {title}
          </h3>
          <p className="text-green-700 dark:text-green-300 font-josefin">
            {message}
          </p>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
            aria-label="Close success message"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
