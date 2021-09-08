import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    LIMIT,
  } from '../constants/productConstants';
  import axios from 'axios';
import { API_BASE_ADDRESS } from '../api';
  
  const listProducts = (pageDirection) => async (dispatch, getState) => {
    const { productList } = getState();
    let lastPageId = productList.currentPagelastId;
    console.log(productList.pageIds);
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      let since_id = 0;
      switch (pageDirection) {
        case 'next':
          since_id = productList.currentPagelastId;
          break;
        case 'prev':
          since_id = productList.pageIds[productList.pageNumber-1];
          break;
      }
      const { data } = await axios.get(`${API_BASE_ADDRESS}/shopify/books?since_id=${since_id}&limit=${LIMIT}`);
      let pageIds = productList.pageIds;
      pageIds.push(lastPageId);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data, pageDirection: pageDirection, pageNumber: productList.pageNumber, currentPagelastId: data.books.slice(-1).pop().id, pageIds: pageIds });
    } catch (error) {-
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };
  
  const detailsProduct = (productId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
      const { data } = await axios.get(`${API_BASE_ADDRESS}/shopify/books/${productId}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  };
  
  export {
    listProducts,
    detailsProduct
  };