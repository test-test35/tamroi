import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);
    return loading? (
        <LoadingBox></LoadingBox>
        ) : error? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            {/* <CheckoutSteps step1 step2 step3 ></CheckoutSteps> */}
            {/* {order.orderItems.map((item) => (
            <h1>{item.name}</h1>
            ))} */}
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>วัน เดือน ปีที่ไป</h2>
                                <p>
                                    {order.shippingAddress.day} {order.shippingAddress.month} {order.shippingAddress.year}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>สถานที่ที่ไป</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    Place Order
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div> */}
            </div>
        </div>
    )
}