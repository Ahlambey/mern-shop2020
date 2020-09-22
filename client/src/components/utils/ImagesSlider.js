import React from "react";
import { Carousel } from "antd";
import { v4 as uuidv4 } from "uuid";

export default function ImagesSlider({ images }) {
  if (images) {
    return (
      <div>
        <Carousel autoplay>
          {images.map((image) => (
            <div key={uuidv4()}>
              <img
                style={{ width: "100%", maxHeight: "150px" }}
                src={`${image}`}
                alt="product image"
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
