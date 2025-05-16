'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form'

interface EmailPatternI {
    value: RegExp
    message: string
}

function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors: formError, isSubmitting } } = useForm<FormData>({
        mode: "onChange" // This will trigger validation on change
    })
    const emailPattern: EmailPatternI = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address"
    }
    const submitForm = (form: FormData) => {
        console.log("Hello world")
        return new Promise<void>(resolve => {
            setTimeout(() => {
                console.log(form, "Form")
                resolve();
            }, 2000)
        })
    }

    const validatePassword = (val: string) => {
        if (watch('password') != val) {
            return "Password mismatch"
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    type="text"
                                    className="block text-gray-700 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    {...register("fullname", { required: true, })}
                                />
                                {formError.fullname && (
                                    <p className="text-red-500 text-sm mt-1">{formError.fullname.message?.toString()}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full text-gray-700 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: emailPattern
                                    })}
                                />
                                {formError.email && (
                                    <p className="text-red-500 text-sm mt-1">{formError.email.message?.toString()}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    className="block w-full text-gray-700 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                />
                                {formError.password && (
                                    <p className="text-red-500 text-sm mt-1">{formError.password.message?.toString()}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-700"
                                    {...register("cPassword", {
                                        required: "Please confirm your password",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        validate: validatePassword
                                    })}
                                />
                                {formError.cPassword && (
                                    <p className="text-red-500 text-sm mt-1">{formError.cPassword.message?.toString()}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                {...register("checkbox", {
                                    required: "You must accept the terms and conditions"
                                })}
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the{' '}
                                <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                                    Terms and Conditions
                                </Link>
                            </label>
                        </div>
                        {formError.checkbox && (
                            <p className="text-red-500 text-sm mt-1">{formError.checkbox.message?.toString()}</p>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {isSubmitting ? "Loading" :
                                    "Create Account"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;