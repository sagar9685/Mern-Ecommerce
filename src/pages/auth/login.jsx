import { loginFormContorls, registerFormContorls } from "@/config";
import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast, useToast } from "@/hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};

const login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-wd space-y-6">
      <div className="text-+center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Dont Have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormContorls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default login;
