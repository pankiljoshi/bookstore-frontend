import {
  PAGEVIEW_SAVE_REQUEST,
  PAGEVIEW_SAVE_SUCCESS,
  PAGEVIEW_SAVE_FAIL,
} from '../constants/pageViewConstants';

function pageViewSaveReducer(state = { pageView: {} }, action) {
    switch (action.type) {
      case PAGEVIEW_SAVE_REQUEST:
        return {};
      case PAGEVIEW_SAVE_SUCCESS:
        return { success: true, pageView: action.payload };
      case PAGEVIEW_SAVE_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  }

  export {
    pageViewSaveReducer
  };