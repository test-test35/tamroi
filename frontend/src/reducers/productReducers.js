const {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_REVIEW_SAVE_REQUEST,
    PRODUCT_REVIEW_SAVE_SUCCESS,
    PRODUCT_REVIEW_SAVE_FAIL,
    PRODUCT_REVIEW_SAVE_RESET,
} = require('../constants/productConstants');

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.patload };
        default:
            return state;
    }
};

export const productDetailsReducer = (
    state = { product: { reviews: [] }, loading: true },
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productReviewSaveReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_SAVE_REQUEST:
            return { loading: true };
        case PRODUCT_REVIEW_SAVE_SUCCESS:
            return { loading: false, review: action.payload, success: true };
        case PRODUCT_REVIEW_SAVE_FAIL:
            return { loading: false, review: action.payload };
        case PRODUCT_REVIEW_SAVE_RESET:
            return {};
        default:
            return state;
    }
};