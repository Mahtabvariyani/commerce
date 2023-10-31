"use client";
import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { safeUser } from "@/types";

interface LogInFormProps {
  currentUser: safeUser | null;
}


const LogInForm: React.FC<LogInFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  
  
  
  useEffect(()=>{
    if(currentUser){
      router.push('/cart')
      router.refresh()
    }

  },[])
  
  
  
  
  
  
  
  
  
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged In");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return <p className="text-center">LoggedIn , Redirecting</p>;
  }

  return (
    <>
      <Heading title="Sign In for Perfum Shop" />
      <Button
        lable="Continue with google"
        icon={AiOutlineGoogle}
        outline
        onClick={() => {signIn('google')}}
      />
      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="email"
        lable="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        lable="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        lable={isLoading ? "Loading" : "Log In"}
        onClick={handleSubmit(onSubmit)}
      />
      <p>
        Don not have an account? <Link href="/register">Sign Up</Link>
      </p>
    </>
  );
};

export default LogInForm;
