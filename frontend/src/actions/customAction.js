import axios from "axios";

import {
    NEW_CUSTOM_REQUEST,
    NEW_CUSTOM_SUCCESS,
    NEW_CUSTOM_FAIL,
    NEW_CUSTOM_RESET,
    CUSTOM_DETAILS_REQUEST,
    CUSTOM_DETAILS_FAIL,
    CUSTOM_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from '../constants/customConstants'

// Create Product
export const createCustom = (customtData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_CUSTOM_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/user/custom/new`,
            customtData,
            config
        );

        dispatch({
            type: NEW_CUSTOM_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_CUSTOM_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Custom Details
export const getCustomDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CUSTOM_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/custom/details/${id}`);

        dispatch({
            type: CUSTOM_DETAILS_SUCCESS,
            payload: data.custom,
        });
    } catch (error) {
        dispatch({
            type: CUSTOM_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};