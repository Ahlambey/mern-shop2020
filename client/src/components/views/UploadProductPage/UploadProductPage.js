import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";
// import {response} from "express";

function UploadProductPage(props) {
  const { Title } = Typography;
  const { TextArea } = Input;
  const [images, setImages] = useState([]);
  const [continentValue, setContinentValue] = useState(1);
  const [state, setState] = useState({
    title: "",
    description: "",
    price: null,
  });

  const continents = [
    { key: "1", value: "Africa" },
    { key: "2", value: "Europe" },
    { key: "3", value: "Asia" },
    { key: "4", value: "North America" },
    { key: "5", value: "South America" },
    { key: "6", value: "Australia" },
    { key: "7", value: "Antarctica" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContinentChange = (e) => {
    setContinentValue(e.target.value);
  };

  const uploadImages = (newImages) => {

    setImages(newImages);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!state.title || !state.description || !state.price || images.length===0){
      return alert('Fill all the fields.');
    }
    const variables = {
      writer: props.user.userData._id,
      title: state.title,
      description: state.description,
      price: state.price,
      images,
      continent: continentValue,
    };

    axios.post("/api/product/uplaodProduct", variables).then(response => {
      if (response.data.success) {
        alert("Product succssefully uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload product.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Travel Product</Title>
      </div>
      <Form onSubmit={handleSubmit}>
        {/* drop down zone */}
        <FileUpload refreshFunction={uploadImages} />
        <br />
        <br />
        <label>Title</label>
        <Input name="title" value={state.title} onChange={handleInputChange} />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          name="description"
          value={state.description}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label>Price ($)</label>
        <Input
          name="price"
          min={0}
          type="number"
          value={state.price}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <select onChange={handleContinentChange}>
          {continents.map((continent) => {
            return (
              <option key={continent.key} value={continent.key}>
                {continent.value}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
