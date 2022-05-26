import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "../../Product/ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getCustomDetails } from "../../../actions/customAction";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import axios from "axios"
import { useParams } from "react-router-dom"
import { addCustomToCart } from "../../../actions/cartAction";


const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();
  const { loading, error } = useSelector((state) => state.customDetails);
  const [customDetails, setCustomDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const addToCartHandler = () => {
    dispatch(addCustomToCart(customDetails.custom._id, customDetails.custom.Stock));
    alert.success("Item Added To Cart");
    console.log(customDetails.custom._id, customDetails.custom.Stock)
  };

  useEffect(() => {
    const customDetails = async () => {
      try {
        const data = await axios.get(`/api/v1/custom/details/${id}`)
        setCustomDetails(data.data)
        console.log(data.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    customDetails();

  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ?
        <Loader />
        :
        <>
          {isLoading ? <h1>Please Wait</h1> :
            customDetails &&
            <Fragment>
              <MetaData title={`Custom Design -- ARTOFTRI`} />
              <div className="ProductDetails">
                <div>
                  <Carousel>
                    {customDetails.custom.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                  </Carousel>
                </div>
                <div>
                  <div className="detailsBlock-1">
                    <h2>Design Tshirt</h2>
                    <p>Custom # {customDetails.custom._id}</p>
                  </div>
                  <div className="detailsBlock-3">
                    <h1>{`₱${customDetails.custom.price}`}</h1>
                    <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <input readOnly type="number" value={customDetails.custom.Stock} />

                      </div>
                      <button
                        disabled={customDetails.custom.Stock < 1 ? true : false}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="detailsBlock-4">
                    Description : <p>{customDetails.custom.description}</p>
                  </div>
                </div>
              </div>
            </Fragment>


          }

        </>
      }
    </Fragment>
  );
};

export default ProductDetails;
