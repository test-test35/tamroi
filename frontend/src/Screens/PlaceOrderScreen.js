import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>วัน เดือน ปี ที่ไป</h2>
                                <p>
                                    {cart.shippingAddress.day} {cart.shippingAddress.month} {cart.shippingAddress.year}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>สถานที่ที่ได้ไป</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    เช็คอิน
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}