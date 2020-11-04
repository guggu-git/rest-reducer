import uuid from 'uuid/v1';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';
import { EMPTY_OBJECT } from '../utils';

function useRRRPatch(storeKey) {
  const ref = useRef(null);
  const storeValue = useSelector(storeState => storeState[storeKey]);
  const resource = ref.current ? store.patchNew(storeValue, ref.current.requestId) : null;
  const { data, permissions, isProcessing, isProcessed, isProcessingFailed, isStale } =
    resource || EMPTY_OBJECT;
  const error = resource ? store.getError(resource) : null;
  const dispatch = useDispatch();

  function dispatchPatch(action, id, body, meta) {
    ref.current = {
      requestId: uuid(),
      id,
    };

    dispatch(action(ref.current.requestId, ref.current.id, body, meta));
  }

  return {
    dispatchPatch,
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

export default useRRRPatch;
