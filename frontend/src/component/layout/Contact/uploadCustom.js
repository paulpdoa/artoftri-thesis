import React, { Fragment, useEffect, useState } from "react";
import "./UploadCustom.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createCustom } from "../../../actions/customAction";
import { Link } from 'react-router-dom';
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import MetaData from "../MetaData"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import StorageIcon from "@material-ui/icons/Storage";
import { NEW_CUSTOM_RESET } from "../../../constants/customConstants";

const NewProduct = ({ history }) => {
  
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id, loading, error, success } = useSelector((state) => state.newCustom);
  
  const price = 300;

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [Stock, setStock] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Uploaded Successfully");
      history.push(`/custom/details/${id}`);
      dispatch({ type: NEW_CUSTOM_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("price", price);
    myForm.set("Stock", Stock);
    myForm.set("description", description);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createCustom(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Upload Design" />
      <div className="UploadContainer">
        <div className="newCustomContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <Link className="go-home-upload" to='/'>Go home</Link>
            <h1>Upload Design </h1>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                readOnly
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />
              <select value={description} onChange={(e) => setDescription(e.target.value)} required>
                <option hidden>Select size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              {/* <input
                placeholder="Item Size"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input> */}
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="How many shirts?"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createCustomFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createCustomBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Upload Design
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
