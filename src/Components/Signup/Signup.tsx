import React from "react";
import s from "./s.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button, Form, Input } from "antd";
import { useAuth } from "../../hooks/useAuth";

const EMAIL = "email"
const PASSWORD = "password"
const USERNAME = "username"
const FIRST_NAME = "first_name"
const LAST_NAME = "last_name"

const Signup = (): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();

    const { signup } = useAuth()
    const [form] = Form.useForm()

    const signupHandler = async () => {
      try {
        await signup(
          form.getFieldValue(EMAIL),
          form.getFieldValue(PASSWORD),
          form.getFieldValue(USERNAME),
          form.getFieldValue(FIRST_NAME),
          form.getFieldValue(LAST_NAME)
        );

        navigate("/")
      } catch(err) {}
    }

    return (
      <div className={s.signupContainer}>
        <div className={s.heroImg}>
          <img src="https://images.unsplash.com/photo-1661937303423-f251f4b80c8f?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb" />

          <div className={s.heroHeader}>
            <Link to="/">
              <img
                className={s.logo}
                src="https://unsplash.com/assets/core/logo-white-8962708214629a3e8f9fbf5b87b70c3ace41c4175cbcc267f7fbb8449ac45bdd.svg"
              />
            </Link>
            <div className={s.content}>
              <h1>Creation starts here</h1>
              <h2>
                Access 4,272,746 free, high-resolution photos you can’t find
                anywhere else
              </h2>
            </div>
          </div>
        </div>

        <div className={s.formContainer}>
          <div className={s.form}>
            <h1>Join Unsplash</h1>
            <p>
              Already have an account?{" "}
              <a href={location.pathname + "?login=true"}>Login</a>
            </p>

            <Form layout="vertical" className={s.inlineForm} form={form}>
              <Form.Item
                label="First name"
                name={FIRST_NAME}
                rules={[{ required: true, message: "First name cannot be empty" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last name"
                name={LAST_NAME}
                rules={[
                  { required: true, message: "Last name cannot be empty" },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>

            <Form layout="vertical" className={s.verticalForm} form={form}>
              <Form.Item
                label="Email"
                name={EMAIL}
                rules={[{ required: true, message: "Email cannot be empty" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name={USERNAME}
                rules={[
                  { required: true, message: "Username cannot be empty" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name={PASSWORD}
                rules={[
                  { required: true, message: "Password cannot be empty" },
                ]}
              >
                <Input type="password" />
              </Form.Item>

              <Form.Item>
                <Button onClick={signupHandler} htmlType="submit">
                  Join
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
}

export default Signup