import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { DarkModeToggle } from "@/components/darkModeToggle";

export default function Home() {
    return (
     <div className="py-3 sm:px-6 lg:px-8 mx-4">
        <div className="flex justify-end"> 
            <DarkModeToggle />
        </div>
        <div className="flex min-h-full flex-col justify-center py-12 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <Image alt="Logo" height={36} width={36} className="mx-auto w-auto" src="/images/logo.png" />
              <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-neutral-100">Sign in to your account</h2>
          </div>
          <AuthForm />
        </div>
       

      </div>
    );
  }
  