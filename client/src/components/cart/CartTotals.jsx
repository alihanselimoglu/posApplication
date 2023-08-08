import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCart, increase, decrease, reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-300 text-center py-4 text-white font-bold tracking-wide">
        Basket
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 overflow-y-auto py-2">
        {cart.cartItems.length > 0 ? (
          cart.cartItems.map((item) => (
            <li className="cart-item flex justify-between" key={item._id}>
              <div className="flex items-center">
                <img
                  src={item.img}
                  alt=""
                  className="w-16 h-16 object-cover cursor-pointer"
                  onClick={() => {
                    dispatch(deleteCart(item));
                    message.success("Product deleted from cart");
                  }}
                />
                <div className="flex flex-col ml-2">
                  <b>{item.title}</b>
                  <span>
                    {item.price}$ x {item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-1">
                <Button
                  type="primary"
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full"
                  icon={<PlusCircleOutlined />}
                  onClick={() => dispatch(increase(item))}
                />
                <span className="font-bold w-6 inline-block text-center">
                  {item.quantity}
                </span>
                <Button
                  type="primary"
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full"
                  icon={<MinusCircleOutlined />}
                  onClick={() => {
                    if (item.quantity === 1) {
                      if (
                        window.confirm("Sure you wanna delete this product?")
                      ) {
                        dispatch(deleteCart(item));
                        message.success("Product deleted from cart");
                      }
                    }
                    if (item.quantity > 1) {
                      dispatch(decrease(item));
                    }
                  }}
                />
              </div>
            </li>
          ))
        ) : (
          <h2 className="text-center text-xl bg-red-200 mx-4 rounded-2xl justify-center flex flex-col h-screen my-40">
            Your basket is empty
          </h2>
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Subtotal</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0} $</span>
          </div>
          <div className="flex justify-between p-2">
            <b>Tax %{cart.tax}</b>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              $
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-600">Grand Total</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              $
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Place Order
          </Button>
          <Button
            type="primary"
            size="large"
            danger
            disabled={cart.cartItems.length === 0}
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            onClick={() => {
              if (window.confirm("Sure you wanna clear basket?")) {
                dispatch(reset());
                message.success("Basket cleared");
              }
            }}
          >
            Clear Basket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
