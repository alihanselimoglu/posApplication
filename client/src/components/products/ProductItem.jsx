import { message } from "antd";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = ({item}) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({
      ...item,
      quantity: 1,
    }));
    message.success("Product added to cart");
  };


  return (
    <div className="product-item border hover:shadow-lg cursor-pointer
     transition-all select-none rounded-lg" onClick={handleClick}>
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}$</span>
      </div>
    </div>
  );
};

export default ProductItem;