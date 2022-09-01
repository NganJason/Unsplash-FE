import React from "react";
import s from "./s.module.scss";
import { Link, useLocation } from "react-router-dom";

import { Button, Form, Input } from "antd";

const Signup = (): JSX.Element => {
    const location = useLocation();

    return (
      <div className={s.signupContainer}>
        <div className={s.heroImg}>
          <img src="https://images.unsplash.com/photo-1661937303423-f251f4b80c8f?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb"></img>

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

            <Form layout="vertical" className={s.inlineForm}>
              <Form.Item label="First name">
                <Input />
              </Form.Item>

              <Form.Item label="Last name">
                <Input />
              </Form.Item>
            </Form>

            <Form layout="vertical" className={s.verticalForm}>
              <Form.Item label="Email">
                <Input />
              </Form.Item>

              <Form.Item label="Username">
                <Input />
              </Form.Item>

              <Form.Item label="Password">
                <Input />
              </Form.Item>

              <Form.Item>
                <Button>Join</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
}

export default Signup