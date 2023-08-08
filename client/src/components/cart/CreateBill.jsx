import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      console.log(values);

      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title="Create Bill"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout={"vertical"} onFinish={onFinish}>
          <Form.Item
            label="Customer Name"
            name={"customerName"}
            rules={[
              { required: true, message: "Please Enter a Customer Name!" },
            ]}
          >
            <Input placeholder="Enter a Customer Name" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name={"customerPhoneNumber"}
            rules={[
              { required: true, message: "Please Enter a Phone Number!" },
            ]}
          >
            <Input placeholder="Enter a Phone Number" maxLength={11} />
          </Form.Item>
          <Form.Item
            label="Payment Mode"
            name={"paymentMode"}
            rules={[
              { required: true, message: "Please Choose a payment type!" },
            ]}
          >
            <Select placeholder="Choose a payment type">
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Debit/Credit Card">
                Debit/Credit Card
              </Select.Option>
            </Select>
          </Form.Item>

          <Card>
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}$</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Tax %{cart.tax}</span>
              <span className="text-red-600">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                $
              </span>
            </div>
            <div className="flex justify-between">
              <b>Grand Total</b>
              <b>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                $
              </b>
            </div>
            <div className="flex justify-end">
              <Button
                className="mt-4"
                type="primary"
                size="large"
                onClick={() => setIsModalOpen(true)}
                htmlType="submit"
                disabled={cart.cartItems.length === 0}
              >
                Checkout
              </Button>
            </div>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBill;
