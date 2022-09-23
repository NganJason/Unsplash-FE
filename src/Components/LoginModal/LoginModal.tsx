import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import s from "./s.module.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const EMAIL = "email"
const PASSWORD = "password"

const LoginModal = (): JSX.Element => {
    const [loginModalVisible, setLoginModalVisible] = React.useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [search] = useSearchParams();
    const [form] = Form.useForm();
    const { login } = useAuth()

    React.useEffect(() => {
      let isLogin = search.get("login")

      if (isLogin) {
        setLoginModalVisible(true);
      } else {
        setLoginModalVisible(false);
      }
    },[search])

    const loginHandler = async () => {
      await login(
        form.getFieldValue(EMAIL),
        form.getFieldValue(PASSWORD)
      )

      navigate(location.pathname);
    }

    return (
      <div>
        <Modal
          title=""
          closable={false}
          maskClosable={true}
          footer={null}
          width={1000}
          centered
          visible={loginModalVisible}
          onCancel={() => {
            navigate(location.pathname);
          }}
          className={s.loginModal}
        >
          <div className={s.modalContainer}>
            <h1>Login</h1>
            <p>Welcome back</p>

            <Form layout="vertical" form={form}>
              <Form.Item
                label="Email"
                name={EMAIL}
                rules={[{ required: true, message: "Email cannot be empty" }]}
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
                <Input type="password"/>
              </Form.Item>

              <Form.Item>
                <Button onClick={loginHandler} htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className={s.joinContainer}>
            <svg
              className={s.strokeRight}
              width="53"
              height="51"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="M13.81 47.388c-2.05-.767-4.005-1.768-5.967-2.716a64.79 64.79 0 0 0-4.025-1.792c-.063-.025-1.036-.312-.998-.456.081-.313.512-.654.71-.877 1.072-1.197 2.106-2.416 3.004-3.744 1.273-1.882 2.492-4.036 2.763-6.3"></path>
                <path d="M3 42.42c15.225-3.279 28.41-9.747 36.76-23.393C46.038 8.767 50.728-3.093 52.217-15"></path>
              </g>
            </svg>
            <p>
              Don't have an account yet? <a href="/signup">Join</a>
            </p>
          </div>

          <svg
            className={s.strokeLeft}
            width="182"
            height="86"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M43.268 1.471c-11.206.54-22.788 3.669-31.596 10.734C-1.078 22.435-2.35 39.097 9.405 51.12c11.884 12.154 32.194 17.12 48.204 12.741 4.955-1.355 19.666-8.944 13.358-16.521-6.018-7.229-21.23-5.946-28.683-3.458-6.158 2.056-11.646 6.205-12.796 12.96-2.248 13.209 7.936 25.114 17.727 32.555 16.072 12.213 35.92 19.617 55.411 23.973 19.712 4.406 42.14 6.367 61.06-1.73 6.398-2.737 11.807-7.276 16.11-12.636.399-.497 1.542-2.033 1.164-1.52"></path>
          </svg>
        </Modal>
      </div>
    );
}

export default LoginModal

