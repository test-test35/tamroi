import Axios from "axios";
import axios from 'axios';
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS } from "../constants/productConstants"

export const listProducts = () => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch(error){
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};

export const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try{
        const {
            userSignin: {
                userInfo: { token }
            },
        } = getState();
        dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
        const { data } = await axios.post(
            `/api/products/${productId}/reviews`,
            review,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );
        dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch(error){
        //report error
        dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
    }
}