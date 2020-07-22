import { useEffect, useState } from 'react';
import uuid from "uuid/v1";
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';

export default function useEasyGet(key) {
  const reduxDispatch = useDispatch();
  const keyVal = useSelector(s => s[key]);
  const ref = useRef({ id: uuid(), payload: {} });

  /**
   * Dispatch get action with id and/or query
   * @param {Object} action - action function to dispatch (required)
   * @param {Object<{id?,query?}} payload - id and/or query to action
   */
  function dispatch(action, payload = {}) {
    const id = payload.id || ref.current.id;

    reduxDispatch(action(id, payload.query));
    ref.current = { id, payload };
  }
  const resource = store.get(keyVal, ref.current.id, ref.current.payload.query) || {};
  const { isLoading: isProcessing, isLoaded: isProcessed, isStale, data } = resource;
  const error = store.getError(resource);

  if (isProcessed || error) {
    ref.current = { id: uuid(), payload: {} };
  }

  return {
    dispatch,
    resource,
    error,
    isProcessed,
    isProcessing,
    isStale,
    data,
    keyVal,
    id: ref.current.id,
  };
}
