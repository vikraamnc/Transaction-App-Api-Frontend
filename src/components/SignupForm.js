import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { postUser } from "../heper/axiosHelper";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const SignupForm = () => {
  const [form, setForm] = useState(initialState);
  const [resp, setResp] = useState({
    status: "",
    message: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const { confirmPassword, ...rest } = form;
    //let's check passwords if they match
    if (confirmPassword !== rest.password) {
      return alert("Password do not match");
    }
    // call axios helper to make post api call
    setIsPending(true);
    const data = await postUser(rest);
    setResp(data);
    setIsPending(false);
    data.status === "success" && setForm(initialState);
  };

  const inputs = [
    {
      label: "Name",
      type: "text",
      name: "name",
      required: true,
      placeholder: "John",
      value: form.name,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      placeholder: "John@emial.com",
      value: form.email,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      required: true,
      placeholder: "xxxxxx",
      value: form.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      required: true,
      placeholder: "xxxxxx",
      value: form.confirmPassword,
    },
  ];

  return (
    <Form onSubmit={handleOnSubmit}>
      {resp.message && (
        <Alert variant={resp.status === "success" ? "success" : "danger"}>
          {" "}
          {resp.message}
        </Alert>
      )}

      {inputs.map((item, i) => (
        <CustomInput key={i} {...item} onChange={handleOnChange} />
      ))}

      <div className="d-grid">
        <Button variant="primary" type="submit" disabled={isPending}>
          {isPending ? <Spinner variant="warning" /> : "Submit"}
        </Button>
      </div>

      <div className="text-end mt-4">
        Already user? <a href="/">Login</a> now
      </div>
    </Form>
  );
};
