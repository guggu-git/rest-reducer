import uuid from 'uuid/v1';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';

function useRRRPost(storeKey) {
  const ref = useRef(null);
  const storeValue = useSelector(storeState => storeState[storeKey]);
  const resource = ref.current ? store.postNew(storeValue, ref.current.requestId) : null;
  const { data, permissions, isProcessing, isProcessed, isProcessingFailed, isStale } =
    resource || {};
  const error = resource ? store.getError(resource) : null;
  const dispatch = useDispatch();

  function dispatchPost(action, body, meta) {
    ref.current = {
      requestId: uuid(),
    };

    dispatch(action(ref.requestId, body, meta));
  }

  return {
    dispatchPost,
    resource,
    data,
    permissions,
    isProcessing: !!isProcessing,
    isProcessed: !!isProcessed,
    isProcessingFailed: !!isProcessingFailed,
    isStale: !!isStale,
    error,
  };
}

export default useRRRPost;
