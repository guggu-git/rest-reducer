import uuid from 'uuid/v1';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';
import { ITEMS } from '../constants';

export function useEasyPost(key) {
  const reduxDispatch = useDispatch();
  const keyVal = useSelector(s => s[key]);
  const ref = useRef({ id: uuid(), args: {} });

  /**
   * Dispatch get action with id and/or payload
   * @param {Object} action - action function to dispatch (required)
   * @param {Object<{id?,payload?}} args - id and/or payload to action
   */
  function dispatch(action, args = {}) {
    const id = args.id || ref.current.id;

    ref.current = { id, args };
    reduxDispatch(action(id, id, args.payload));
  }
  const resource = keyVal[ITEMS][ref.current.id] || {};
  const { isCreating: isProcessing, isCreated: isProcessed, isStale, data } = resource;
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