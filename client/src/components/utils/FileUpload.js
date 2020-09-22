import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";


function FileUpload(props) {
  const [Images, setImages] = useState([]);
  const imgUrl = [];
 

  // store images inside uploads file
  //   const onDrop = (files) => {
  //     let formData = new FormData();
  //     const config = {
  //       header: { "content-type": "multipart/form-data" },
  //     };
  //     formData.append("file", files[0]);

  //save the Image we chose inside the Node Server
  // Axios.post("/api/product/uploadImage", formData, config).then(
  //   (response) => {
  //     if (response.data.success) {
  //       setImages([...Images, response.data.image]);
  //       props.refreshFunction([...Images, response.data.image]);
  //     } else {
  //       alert("Failed to save the Image in Server");
  //     }
  //   }
  // );
  //   };

// store images in Cloudinary
  const onDrop = async (files) => {
    const URL = "https://api.cloudinary.com/v1_1/dhf7tdtdc/image/upload";
    const imgFormData = files.map((img) => {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "mern-shop");
      formData.append("cloud_name", "dhf7tdtdc");
      return formData;
    });

    

    const imgRequests = imgFormData.map(
      async (fd) => await Axios.post(URL, fd).catch((err) => null)
    );

    try {
      const imgResponses = await Axios.all(imgRequests);
      imgResponses.map((res) => {
        if (res) {
          imgUrl.push(res.data.secure_url);
        }
      });

      setImages([...Images, ...imgUrl]);
      props.refreshFunction([...Images, ...imgUrl]);
    } catch (err) {
      alert("Failed to save the Image in Server");
      console.log(err);
    }
  };

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={true} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div key={uuidv4()} onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
