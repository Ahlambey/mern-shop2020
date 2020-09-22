import React, { useEffect, useState } from "react";
import { Button, Descriptions, Modal, Icon } from "antd";
import { Link } from "react-router-dom";

export default function ProductInfo(props) {
  const [Product, setProduct] = useState([]);
  const [Visisble, setVisisble] = useState(false);

  const showModal = () => {
    setVisisble(true);
  };

  const handleOk = () => {
    setVisisble(false);
  };

  const handleCancel = () => {
    setVisisble(false);
  };

  useEffect(() => {
    setProduct(props.details);
  }, [props.details]);

  const addToCartHandler = () => {
    if (props.user) {
      props.user.isAuth === false && showModal();
    }
    props.addToCart(props.details._id);
  };

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
        <Descriptions.Item label="Views">{Product.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {Product.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="large"
          type="danger"
          shape="round"
          onClick={addToCartHandler}
        >
          Add to Cart
        </Button>
        <Modal
          title={
            <h3>
              Please login to buy this awesome product!
              <br />
              <br />
              <Icon
                style={{ color: "#eb2f96", fontSize: "40px" }}
                type="smile"
              />
            </h3>
          }
          visible={Visisble}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ textAlign: "center" }}
        >
          <div>
            <h2>
              <Link to="/login">Login</Link>
            </h2>
            <h2>Dont have an account? </h2>
            <h2>
              <Link to="/register">Create an Account</Link>
            </h2>
          </div>
        </Modal>
      </div>
    </div>
  );
}
