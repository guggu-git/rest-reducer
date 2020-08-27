import { useRef } from 'react';
import uuid from "uuid/v1";
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';

export default function useEasyGet(key) {
  const reduxDispatch = useDispatch();
  const keyVal = useSelector(s => s[key]);
  const ref = useRef({ id: uuid(), args: {} });

  /**
   * Dispatch get action with id and/or query
   * @param {Object} action - action function to dispatch (required)
   * @param {Object<{id?,query?}} args - id and/or query to action
   */
  function dispatch(action, args = {}) {
    const id = args.id || ref.current.id;

    ref.current = { id, args };
    reduxDispatch(action(id, args.query));
  }
  const resource = store.getAll(keyVal, ref.current.args.query) || {};
  const { isLoading: isProcessing, isLoaded: isProcessed, isStale, data } = resource;
  const error = store.getError(resource);

  if (isProcessed || error) {
    ref.current = { id: uuid(), args: {} };
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
