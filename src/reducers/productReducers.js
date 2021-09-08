import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
  } from '../constants/productConstants';
  
  function productListReducer(state = { data: {}, loading: true, pageNumber: 0, pageDirection: 'next',  currentPagelastId: 0, pageIds: [0]}, action) {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, data: {} };
      case PRODUCT_LIST_SUCCESS:
        const pageNumber = (action.pageDirection == 'next' ? ++action.pageNumber : --action.pageNumber);
        let  pageIds = action.pageIds;
        if (pageNumber == 1) {
          pageIds = [0, 0];
        }
        return { loading: false, data: action.payload, pageNumber:  pageNumber, currentPagelastId: action.currentPagelastId, pageIds: pageIds};
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function productDetailsReducer(state = { product: {}, loading: true }, action) {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true, product: {} };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  export {
    productListReducer,
    productDetailsReducer,
  };