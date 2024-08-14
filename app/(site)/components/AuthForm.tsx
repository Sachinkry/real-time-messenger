"use client";

import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/inputs/Input';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import AuthSocialButton from './AuthSocialButton';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthForm: React.FC = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      console.log('Authenticated', session?.data)
      router.push('/users');
    }
  }, [session?.status, router])

  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("On Sumbit: ", data)
    
    if (variant === 'REGISTER') {
      // Axios Register
      axios.post('/api/register', data)
      .then(() => {
        signIn('credentials', data);
        toast.success('User Registered')
      } )
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      // NextAuth SignIn
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if(callback?.error) {
          toast.error('Invalid Credentials');
        }

        if(callback?.ok && !callback?.error) {
          toast.success('Logged In!');
          router.push('/users');
        }
      })
      .finally(() => setIsLoading(false))
    }
  };

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const socialAction = ( action: string ) => {
    setIsLoading(true);

    // NextAuth Social Sign In
    signIn(action, { redirect: false } )
    .then((callback) => {
      if(callback?.error) {
        toast.error('Invalid Credentials');
      }

      if(callback?.ok && !callback?.error) {
        toast.success('Logged In!')
      }
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 dark:bg-neutral-900">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input 
              id="name"
              label="Name"
              register={register}
              errors={errors}
            />
          )}

          <Input 
            id="email" 
            label="Email address" 
            type="email" 
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input 
            id="password" 
            label="Password" 
            type="password" 
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90"
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-neutral-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 dark:text-neutral-400 dark:bg-neutral-900">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-4 flex-row justify-center">
            <AuthSocialButton 
               icon={BsGithub}
               onClick={() => socialAction('github')}
            />
            <AuthSocialButton 
               icon={BsGoogle}
               onClick={() => socialAction('google')}
            />
            
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500 dark:text-neutral-400">
          <div>
            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;