import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
import { replace } from 'react-router-redux';

const API_URL = 'http://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking';
const APP_ID = 'dj00aiZpPTdUbVc1ZEN0dmJYVSZzPWNvbnN1bWVyc2VjcmV0Jng9MzM-';

const startRequest = categoryId => ({
  type: 'START_REQUEST', payload: { categoryId }
});

const receiveData = (categoryId, error, response) => ({
  type: 'RECEIVE_DATA', payload: { categoryId, error, response }
});

const finishRequest = categoryId => ({
  type: 'FINISH_REQUEST', payload: { categoryId }
});

export const fetchRanking = categoryId => {
  return async (dispatch, getState) => {
    const categories = getState().shopping.categories;
    const category = categories.find(category => (category.id === categoryId));

    if (typeof category === 'undefined') {
      dispatch(replace('/'));
      return;
    }

    dispatch(startRequest(categoryId));

    const queryString = qs.stringify({
      appid: APP_ID,
      category_id: categoryId,
    });

    try {
      const response = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await response.json();
      dispatch(receiveData(categoryId, null, data));
    } catch (error) {
      dispatch(receiveData(categoryId, error));
    }
    dispatch(finishRequest(categoryId));
  };
};