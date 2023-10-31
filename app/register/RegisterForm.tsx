"use client";
import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { safeUser } from "@/types";

interface RegisterFormProps {
  currentUser: safeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("Submitted Data:", data);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created");
        console.log(data);

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            console.log("Redirecting to /cart...");
            router.push("/cart");
            console.log("Redirected to /cart.");
            router.refresh();
            toast.success("Logged In");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch((error) => {
        toast.error("Something went Wrong");
        console.log(error);
      })

      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return <p className="text-center">Redirecting</p>;
  }

  return (
    <>
      <Heading title="Sign up for Perfum Shop" />
      <Button
        lable="Sign Up with google"
        icon={AiOutlineGoogle}
        outline
        onClick={() => {signIn('google')}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        lable="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        lable={isLoading ? "Loading" : "Sign UP"}
        onClick={handleSubmit(onSubmit)}
      />
      <p>
        Already have an account? <Link href="/login">Log In</Link>
      </p>
    </>
  );
};

export default RegisterForm;
