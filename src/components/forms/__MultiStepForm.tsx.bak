'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useFormValidation, FormProgress, FormSuccess } from './FormValidation';
import { useToastNotifications } from '@/components/ui/Toast';

interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  validation?: { [key: string]: any };
}

interface MultiStepFormProps {
  steps: FormStep[];
  initialValues: { [key: string]: string };
  onSubmit: (values: { [key: string]: string }) => Promise<void>;
  onStepChange?: (stepIndex: number) => void;
  className?: string;
}

export function MultiStepForm({
  steps,
  initialValues,
  onSubmit,
  onStepChange,
  className = ''
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { showSuccess, showError } = useToastNotifications();

  // Create validation rules for current step
  const getCurrentStepValidation = () => {
    const currentStepData = steps[currentStep];
    const validation: { [key: string]: any } = {};
    
    currentStepData.fields.forEach(field => {
      validation[field] = currentStepData.validation?.[field] || [];
    });
    
    return validation;
  };

  const {
    formState,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateForm
  } = useFormValidation(
    initialValues,
    getCurrentStepValidation(),
    async (values) => {
      if (currentStep === steps.length - 1) {
        // Last step - submit the form
        await onSubmit(values);
        setIsSuccess(true);
        showSuccess('Form submitted successfully!', 'Your information has been saved');
      } else {
        // Move to next step
        setCompletedSteps(prev => new Set([...prev, currentStep]));
        setCurrentStep(prev => prev + 1);
        showSuccess('Step completed!', 'Moving to next step');
      }
    }
  );

  // Update validation rules when step changes
  useEffect(() => {
    // Re-validate current step when moving to it
    validateForm();
  }, [currentStep]);

  // Notify parent component of step change
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = formState.isValid && !formState.isSubmitting;

  const handleNext = () => {
    if (canProceed) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to completed steps or next step
    if (completedSteps.has(stepIndex) || stepIndex === currentStep + 1) {
      setCurrentStep(stepIndex);
    }
  };

  const resetToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      for (let i = stepIndex; i < steps.length; i++) {
        newSet.delete(i);
      }
      return newSet;
    });
  };

  if (isSuccess) {
    return (
      <FormSuccess
        title="Form Submitted Successfully!"
        message="Thank you for completing the form. We'll process your information and get back to you soon."
        onClose={() => {
          setIsSuccess(false);
          resetForm();
          setCurrentStep(0);
          setCompletedSteps(new Set());
        }}
        className={className}
      />
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Indicator */}
      <FormProgress
        currentStep={currentStep + 1}
        totalSteps={steps.length}
      />

      {/* Step Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              disabled={!completedSteps.has(index) && index !== currentStep && index !== currentStep + 1}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-josefin transition-colors ${
                index === currentStep
                  ? 'bg-soft-gold text-deep-black'
                  : completedSteps.has(index)
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                  : index === currentStep + 1
                  ? 'bg-elegant-base/20 text-font-primary dark:text-ivory-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              {completedSteps.has(index) ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-xs">
                  {index + 1}
                </span>
              )}
              <span>{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-deep-black rounded-lg border border-elegant-base dark:border-elegant-base p-6"
      >
        {/* Step Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-2">
            {currentStepData.title}
          </h2>
          {currentStepData.description && (
            <p className="text-font-secondary dark:text-font-secondary-dark font-josefin">
              {currentStepData.description}
            </p>
          )}
        </div>

        {/* Step Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields will be rendered here by parent component */}
          <div className="space-y-4">
            {/* This is where the actual form fields would be rendered */}
            {/* The parent component should pass the form fields as children */}
          </div>

          {/* Step Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-elegant-base dark:border-elegant-base">
            <div className="flex space-x-3">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-4 py-2 border border-elegant-base dark:border-elegant-base text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 transition-colors rounded-lg font-josefin font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={resetToStep.bind(null, 0)}
                className="px-4 py-2 text-font-secondary dark:text-font-secondary-dark hover:text-font-primary dark:hover:text-ivory-white transition-colors font-josefin font-semibold"
              >
                Reset
              </button>
              
              <button
                type="submit"
                disabled={!canProceed}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-josefin font-semibold transition-colors ${
                  canProceed
                    ? 'bg-soft-gold text-deep-black hover:bg-bright-gold'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{isLastStep ? 'Submit' : 'Next'}</span>
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
                {formState.isSubmitting && (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Step Validation Summary */}
      {Object.keys(formState.errors).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-josefin font-semibold text-red-800 dark:text-red-200 mb-1">
                Please fix the following errors:
              </h3>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                {Object.entries(formState.errors).map(([field, error]) => (
                  <li key={field} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Form field wrapper for multi-step forms
export function FormFieldWrapper({
  children,
  fieldName,
  formState,
  onFieldChange,
  onFieldBlur
}: {
  children: React.ReactNode;
  fieldName: string;
  formState: any;
  onFieldChange: (name: string, value: string) => void;
  onFieldBlur: (name: string) => void;
}) {
  return (
    <div className="space-y-2">
      {React.cloneElement(children as React.ReactElement, {
        value: formState.values[fieldName] || '',
        onChange: (value: string) => onFieldChange(fieldName, value),
        onBlur: () => onFieldBlur(fieldName),
        error: formState.errors[fieldName],
        touched: formState.touched[fieldName]
      })}
    </div>
  );
}

// Form validation summary
export function FormValidationSummary({
  errors,
  className = ''
}: {
  errors: { [key: string]: string };
  className?: string;
}) {
  if (Object.keys(errors).length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-josefin font-semibold text-red-800 dark:text-red-200 mb-2">
            Please fix the following errors:
          </h3>
          <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field} className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// Form help text component
export function FormHelpText({
  text,
  type = 'info',
  className = ''
}: {
  text: string;
  type?: 'info' | 'warning' | 'success';
  className?: string;
}) {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'success':
        return 'text-green-800 dark:text-green-200';
      default:
        return 'text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div className={`flex items-start space-x-2 p-3 rounded-lg border ${getBackgroundColor()} ${className}`}>
      {getIcon()}
      <p className={`text-sm font-josefin ${getTextColor()}`}>
        {text}
      </p>
    </div>
  );
}
