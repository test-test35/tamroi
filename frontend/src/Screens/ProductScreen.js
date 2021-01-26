import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

// import {
//     withScriptjs,
//     withGoogleMap,
//     GoogleMap,
//     Marker,
//   } from "react-google-maps";


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const productDetails = useSelector( state => state.productDetails );
    const { loading, error, product } = productDetails;
    const productReviewSave = useSelector((state) => state.productReviewSave);
    const { success: productSaveSuccess } = productReviewSave;
    // const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    //     <GoogleMap
    //       defaultZoom={8}
    //       defaultCenter={{ lat: -34.397, lng: 150.644 }}
    //     >
    //       <Marker
    //         position={{ lat: -34.397, lng: 150.644 }}
    //       />
    //     </GoogleMap>
    //   ));
    

    useEffect(() => {
        if (productSaveSuccess) {
            alert('Review submitted successfully.');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
        }
        dispatch(detailsProduct(productId));
        return () => {
            //
        };
    }, [productSaveSuccess]);
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(saveProductReview(productId, {
            name: userInfo.name,
            rating:rating,
            comment:comment,
        }));
    };
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
    
    
    return (
        <div>
            {loading? ( 
            <LoadingBox></LoadingBox>
            ) : error? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                <div>
            <Link to="/">กลับหน้าแรก</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}></img>
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <a href="#reviews">
                            <Rating
                                // rating={product.numReviews}
                                // numReviews={product.numReviews}
                                value={product.rating}
                                text={product.numReviews + ' reviews'}
                            ></Rating>
                            </a>
                        </li>
                        {/* <li>Price : ${product.price}</li> */}
                        <li>
                            <b>Description</b>
                            <p>{product.description}</p>
                            <img className="large" src={product.image2} ></img>
                        </li>
                        <br></br>
                        <li className="reference">
                            <b>อ้างอิง</b>
                            {/* <p><a href={product.reference}>{product.reference}</a></p> */}
                            <p>{product.reference}</p>
                        </li>
                        <br></br>
                        <li>
                            <b>location</b>
                            {/* <MapWithAMarker
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCW2fzdLg2Cahf1PTLjXSEO8_ek5WYmNP4&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                defaultCenter={product.lat,product.lng}
                            /> */}
                            <a>
                            <iframe src={product.location}></iframe>
                            </a>
                        </li>
                        <li>
                            <b>สถานที่ที่ใกล้เคียง</b>
                        <p><a href={product.location2}>{product.namelocation2}</a></p>
                        <p><a href={product.location3}>{product.namelocation3}</a></p>
                        <p><a href={product.location4}>{product.namelocation4}</a></p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            {/* <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <span className="success">In Stock</span>
                                        ) : (
                                            <span className="danger">Unavailable</span>
                                        )}
                                    </div>
                                </div>
                            </li> */}
                            {product.countInStock > 0 && (
                                <>
                                {/* <li>
                                    <div className="row">
                                        <div>Qty</div>
                                        <div>
                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map( (x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li> */}
                                <li>
                                    <button onClick={addToCartHandler} className="primary block">Check In</button>
                                </li>
                                </>  
                                )}   
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <div className="content-margined">
                <h2>Reviews</h2>
                {!product.reviews.length && <div>There is no review</div>}
                <ul className="review" id="reviews">
                    {product.reviews.map(review => (
                        <li key={review._id}>
                            <div>
                                {review.name}
                            </div>
                            <div>
                                <Rating value={review.rating}></Rating>
                            </div>
                            <div>
                                {review.createdAt.substring(0, 10)}
                            </div>
                            <div>
                                {review.comment}
                            </div>
                        </li>
                    ))}
                    <li>
                        <h3>Write a customer review</h3>
                        {userInfo ? (
                        <form onSubmit={submitHandler}>
                            <ul className="form-container">
                                <li>
                                    <label htmlFor="rating">
                                        Rating
                                    </label>
                                    <select name="rating" id="rating" value={rating}
                                    onChange={(e) => setRating(e.target.value)}>
                                        <option value="1">1- Poor</option>
                                        <option value="2">2- Fair</option>
                                        <option value="3">3- Good</option>
                                        <option value="4">4- Very Good</option>
                                        <option value="5">5- Excelent</option>
                                    </select>
                                </li>
                                <li>
                                    <label htmlFor="comment">Comment</label>
                                    <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                </li>
                                <li>
                                    <button type="submit" className="button primary">Submit</button>
                                </li>
                            </ul>
                        </form>
                        ) : (
                        <div>
                            Please <Link to="/signin">Sign-in</Link> to write a review.
                        </div>
                        )}
                    </li>
                </ul>
            </div>
                </>
                )}
        </div>
    );
}

