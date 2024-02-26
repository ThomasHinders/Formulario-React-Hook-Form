import { useForm, SubmitHandler } from "react-hook-form"
import React from 'react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const App = () => {
  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {errors, isSubmitting},} = useForm<FormFields>({resolver: zodResolver(schema)});

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
      try {
        await new Promise ((resolve) => setTimeout(resolve, 1000));
        console.log(data);
      } catch (error){
        setError("root", {
          message: "Esse email ja existe",
        });
      }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="text" placeholder="email"/>
      {errors.email && (<div>{errors.email.message}</div>)} 
      <input {...register("password")} type="password" placeholder="password"/>
      {errors.password && (<div>{errors.password.message}</div>)} 
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && <div>{errors.root.message}</div>} 
    </form>

  );
};  

export default App;