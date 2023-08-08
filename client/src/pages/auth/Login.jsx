import { Button, Carousel, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const user = await res.json();
      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("User login successfully!");
        navigate("/");
        setLoading(false);
      } else if (res.status === 404) {
        message.error("User not found!");
      }
    } catch (error) {
      message.error("User login failed!");
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Please enter an email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Please enter a password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Form.Item name={"remember"} valuePropName="checked">
                <div className="flex justify-between items-center">
                  <Checkbox>Remember me</Checkbox>
                  <Link to="/forgot-password" className="float-right">
                    Forgot password?
                  </Link>
                </div>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Don't have an account?&nbsp;
            <Link to="/register" className="text-blue-600">
              Register Now
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="with all device dimensions"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title=""
                  desc="statistic description"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Customer Satisfaction"
                  desc="customer satisfaction description"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Admin Panel"
                  desc="admin panel description"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
