import {
  PAGEVIEW_SAVE_REQUEST,
  PAGEVIEW_SAVE_SUCCESS,
  PAGEVIEW_SAVE_FAIL,
} from '../constants/pageViewConstants';
import Axios from 'axios';
import { API_BASE_ADDRESS } from '../api';

const publicIp = require('public-ip');


const savePageView = (pageView) => async (dispatch) => {
    try {
      const ip = await getIp();
      dispatch({ type: PAGEVIEW_SAVE_REQUEST, payload: pageView });
      const { data } = await Axios.post(`${API_BASE_ADDRESS}/page-views`, {
        url: window.location.href,
        ip: ip,
        user_agent: navigator.userAgent
      });
      dispatch({ type: PAGEVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PAGEVIEW_SAVE_FAIL, payload: error.message });
    }
  };

const getIp = async () => {
  return await publicIp.v4();
};

  export {
    savePageView
  };