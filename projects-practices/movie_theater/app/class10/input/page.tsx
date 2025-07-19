"use client";
import React from "react";
import { DemoButton } from "../modal/page";
import { useToast } from "../hooks/useToast";
import ToastContainer from "../components/ToastContainer";
import { ThemeProvider } from "../hooks/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

function useForm<T extends Record<string, any>>(options: {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}) {
  const { initialValues, validate } = options;
  const [values, setValues] = React.useState<T>(initialValues);
  const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [dirty, setDirty] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      setDirty(true);
      if (validate) setErrors(validate(newValues));
      return newValues;
    });
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (validate) setErrors(validate(values));
  }

  function resetForm() {
    setValues(initialValues);
    setTouched({});
    setErrors({});
    setDirty(false);
  }

  return {
    values,
    errors,
    touched,
    dirty,
    handleChange,
    handleBlur,
    resetForm,
    setValues,
  };
}

function InputFormCustom() {
  type FormValues = { username: string; email: string };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.username) errors.username = "Username is required";
    if (!values.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email invalid";
    return errors;
  };

  const {
    values,
    errors,
    touched,
    dirty,
    handleChange,
    handleBlur,
    resetForm,
  } = useForm<FormValues>({
    initialValues: { username: "", email: "" },
    validate,
  });
  
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
        toast("Đăng ký thành công!", "success");
      resetForm();
      
    }
  };

  return (
    
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 w-full max-w-sm flex flex-col gap-5"
      >
        <h2 className="text-center mb-4 text-2xl font-bold text-gray-900 dark:text-white">Custom useForm Example</h2>

        {/* Username Field */}
        <div>
          <label htmlFor="username" className="font-medium text-base text-gray-800 dark:text-gray-200">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            placeholder="Enter your username"
            className={`mt-1 w-full p-2.5 rounded-lg text-base outline-none transition 
              ${errors.username && touched.username
                ? "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 dark:text-white"
                : "border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white"}
            `}
          />
          {touched.username && errors.username && (
            <div className="text-red-600 dark:text-red-400 text-sm font-medium mt-1">{errors.username}</div>
          )}
        </div>
        

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="font-medium text-base text-gray-800 dark:text-gray-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            placeholder="Enter your email"
            className={`mt-1 w-full p-2.5 rounded-lg text-base outline-none transition 
              ${errors.email && touched.email
                ? "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 dark:text-white"
                : "border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white"}
            `}
          />
          {touched.email && errors.email && (
            <div className="text-red-600 dark:text-red-400 text-sm font-medium mt-1">{errors.email}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2 mb-2">
          <button
            type="submit"
            disabled={!dirty || Object.keys(errors).length > 0}
            className={`flex-1 py-2 rounded-lg font-semibold text-white shadow-sm transition
              ${!dirty || Object.keys(errors).length > 0
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"}
            `}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 py-2 rounded-lg border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
          >
            Reset
          </button>
        </div>

        {/* Debug Info */}
        <div className="text-sm text-gray-700 dark:text-gray-300 mt-4">
          <p><strong>Dirty:</strong> {dirty ? "Yes" : "No"}</p>
          <p><strong>Values:</strong> {JSON.stringify(values)}</p>
          <p><strong>Errors:</strong> {JSON.stringify(errors)}</p>
          <p><strong>Touched:</strong> {JSON.stringify(touched)}</p>
        </div>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Demo Custom useForm</h1>
        </div>
        <div className="flex justify-center mb-6 gap-4">
          <DemoButton />
          <ThemeToggle />
          <ToastContainer/>
        </div>
        <InputFormCustom />
      </div>
    </ThemeProvider>
  );
}
