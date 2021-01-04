import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Row, Col, Card } from "antd";
import ImagesSlider from "../../utils/ImagesSlider";
import { v4 as uuidv4 } from "uuid";

import CheckBox from "./Sections/CheckBox";
import RdioBox from "./Sections/RdioBox";
import SearchFeature from "./Sections/Search";
import { price } from "./Sections/data";

// import { response } from "express";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [SearchTerm, setSearchTerm] = useState("");
  const [Filters, setFilters] = useState({
    continent: [],
    price: [],
  });
  const { Meta } = Card;
  



 

  useEffect(() => {
  
    const variables = {
      skip: skip,
      limit: limit,
    };

    getProducts(variables);
  }, []);

  const handleLoadMore = () => {
    let newSkip = skip + limit;
    const variables = {
      skip: newSkip,
      limit: limit,
      loadMore: true,
    };
    getProducts(variables);
    setSkip(newSkip);
  };

  const getProducts = (variables) => {
    axios
      .post("/api/product/getProducts", variables)
      .then((response) => {
        if (response.data.success) {
          
          if (variables.loadMore) {
            setProducts([...products, ...response.data.products]);
          } else {
            setProducts(response.data.products);
          }
          setPostSize(response.data.postSize);
        } else {
          alert("Failed to get products.");
        }
      })
      .catch((error) => console.log(error));
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col key={uuidv4()} lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<a href={`/product/${product._id}`}><ImagesSlider images={product.images} /></a>}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilterResults = (filters) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters,
    };

    getProducts(variables);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === value) {
        array = data[key].priceArr;
      }
    }

    return array;
  };

  const handleFilters = (filters, category) => {
    console.log("filters:", filters);
    let newFilters = { ...Filters };
    newFilters[category] = filters;
    if (category === "price") {
      let priceValue = handlePrice(filters);
      newFilters[category] = priceValue;
    }
    showFilterResults(newFilters);
    setFilters(newFilters);
    
  };

  const updatedSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters:Filters,
      searchTerm: newSearchTerm
    };
    setSkip(0)
    setSearchTerm(newSearchTerm);

    getProducts(variables);
  };

  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Travel The world with us! <Icon type="rocket" />
          </h2>
        </div>

        {/* filters */}
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <CheckBox
              handleFilters={(filters) => handleFilters(filters, "continent")}
            />
          </Col>
          <Col lg={12} xs={24}>
            <RdioBox
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </Col>
        </Row>

        {/* search */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem auto",
          }}
        >
          <SearchFeature refrechFuction={updatedSearchTerms} />
        </div>

        {products.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>No Posts Yet...</h2>
          </div>
        ) : (
          <div>
            <Row gutter={[16, 16]}>{renderCards}</Row>
          </div>
        )}
        <br />
        <br />

        {postSize >= limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleLoadMore}>Load more</button>
          </div>
        )}
      </div>
    </>
  );
}

export default LandingPage;
