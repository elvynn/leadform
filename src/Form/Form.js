import React from 'react';
import {useForm} from "react-hook-form"

const Form = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    //Custom validation rules
    const isName = (name) => {
      const regexp= "^[A-Z][-a-zA-Z]+$";
      return regexp.test(name);
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("name", { required: true, validate: isName })} />
      {errors.name && errors.nanme === "required" && <span>This field is required</span>}
      {errors.name && errors.nanme === "validate" && <span>Your name cannot contain numbers, spaces or special characters</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Form;