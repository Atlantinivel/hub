"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import atlantinivelLogo from "@/public/atlantinivel-logo-blue.svg";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { email, password } = data;

    if (password === "" || email === "") {
      // toast({
      //   title: 'Fill all fields!',
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // });
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password must be at least 6 characters long",
      });
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);

      if (res?.error == null) {
        router.push("/hub");
        toast({
          title: "Success",
        });
      } else {
        return toast({
          title: "Error occurred while logging in2",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container relative  h-[100vh]  items-center justify-center md:grid  lg:max-w-none lg:grid-cols-2 px-0">
        <div className=" h-64 md:h-full relative">
          <Image
            src="/images/img-1.jpeg"
            width={1280}
            height={843}
            alt="Authentication"
            className=" h-full object-cover flex"
          />
          <Image
            src={atlantinivelLogo}
            alt="Authentication"
            className=" absolute h-[40px] w-auto top-4 left-4 "
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full md:w-2/3 space-y-6 p-10"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className=" flex ml-auto" type="submit">
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Login;
