import getAction from './actions/get';
import getAllAction from './actions/getAll';
import postAction from './actions/post';
import patchAction from './actions/patch';
import putAction from './actions/put';
import removeAction from './actions/remove';
import removeAllAction from './actions/removeAll';
import { isArray, isObject } from './helpers';

export default function actions(globalParams = {}, config = {}) {
  const mergeAll = ({ MERGE_ALL }) => (items, primaryKey) => dispatch => {
    if (!primaryKey) {
      throw new Error('mergeAll requires primary key for merging');
    }

    if (isArray(items) || isObject(items)) {
      dispatch({
        type: MERGE_ALL,
        payload: {
          value: items,
          primaryKey,
        },
      });
    } else {
      throw new Error('mergeAll requires items to be an Array or An Object');
    }
  };

  const getAll = (url, ACTIONS, params = {}) => (query, meta) => async (
    dispatch,
    getState,
  ) => {
    await getAllAction({
      ACTIONS,
      url,
      query,
      meta,
      params,
      globalParams,
      config,
      dispatch,
      getState,
    });
  };

  const get = (url, ACTIONS, params = {}) => (id, query, meta) => async (
    dispatch,
    getState,
  ) => {
    await getAction({
      ACTIONS,
      url,
      id,
      query,
      meta,
      params,
      globalParams,
      config,
      dispatch,
      getState,
    });
  };

  const put = (url, ACTIONS, params = {}, raw = false) => (id, value, meta) => async (
    dispatch,
    getState,
  ) => {
    await putAction({
      ACTIONS,
      url,
      id,
      value,
      meta,
      params,
      raw,
      globalParams,
      config,
      dispatch,
      getState,
    });
  };

  const post = (url, ACTIONS, params = {}, raw = false) => (id, value, meta) => async (
    dispatch,
    getState,
  ) => {
    await postAction({
      ACTIONS,
      url,
      id,
      value,
      meta,
      params,
      raw,
      globalParams,
      config,
      dispatch,
      getState,
    });
  };

  const patch = (url, ACTIONS, params = {}, raw = false) => (
    patchId,
    id,
    value,
    meta,
  ) => async (dispatch, getState) => {
    await patchAction({
      ACTIONS,
      url,
      patchId,
      id,
      value,
      meta,
      params,
      raw,
      globalParams,
      config,
      dispatch,
      getState,
    });
  };

  const remove = (url, ACTIONS, params = {}, raw = false) => (id, meta) => async (
    dispatch,
    getState,
  ) => {
    await removeAction({
      ACTIONS,
      url,
      id,
      meta,
      params,
      raw,
      globalParams,
      config,
      dispatch,
      getState,
    });
  };

  const removeAll = (url, ACTIONS, params = {}, raw = false) => (
    id,
    ids,
    value,
    meta,
  ) => async (dispatch, getState) => {
    await removeAllAction({
      ACTIONS,
      url,
      id,
      ids,
      value,
      meta,
      params,
      raw,
      globalParams,
      config,
      dispatch,
      getState,
    });
  };

  return {
    mergeAll,
    getAll,
    get,
    put,
    post,
    patch,
    remove,
    removeAll,
  };
}
