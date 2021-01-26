import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo) {
        props.history.push('/signin');
    }
    const [day, setDay] = useState(shippingAddress.day);
    const [month, setMonth] = useState(shippingAddress.month);
    const [year, setYear] = useState(shippingAddress.year);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({day, month, year})
        );
        props.history.push('/placeorder');
        //TODO: dispatch save shipping address action
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>ระบุ วัน เดือน ปี ที่ได้ไป</h1>
                </div>
                <div>
                    <label htmlFor="day">วัน</label>
                    <input
                        type="text"
                        id="fday"
                        placeholder="Enter Day"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="month">เดือน</label>
                    <input
                        type="text"
                        id="month"
                        placeholder="Enter Day"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="year">ปี</label>
                    <input
                        type="text"
                        id="year"
                        placeholder="Enter Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        ต่อไป
                    </button>
                </div>
            </form>
        </div>
    );
}