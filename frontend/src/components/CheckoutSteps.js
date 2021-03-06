import React from 'react';

export default function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>เข้าสู่ระบบ</div>
            <div className={props.step2 ? 'active' : ''}>ระบุข้อมูล</div>
            <div className={props.step3 ? 'active' : ''}>เช็คอิน</div>
        </div>
    );
}