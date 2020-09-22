import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImages from "./Sections/ProductImages";
import ProductInfo from "./Sections/ProductInfo";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

export default function DetailsProductPage(props) {

  const dispatch = useDispatch();
  const [Product, setProduct] = useState([]);



  const productId = props.match.params.productId;
  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(
      (res) => {
        
        setProduct(res.data[0]);
      }
    );
  }, []);

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };

  return (
    <div
      className="postProduct"
      style={{ width: "100%", padding: "3rem 4rem" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImages details={Product} />
        </Col>

        <Col lg={12} xs={24}>
          <ProductInfo addToCart={addToCartHandler} details={Product} user={props.user.userData} />
        </Col>
      </Row>
    </div>
  );
}
