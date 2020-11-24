import { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';
import { EMPTY_OBJECT } from '../utils';

function useRRRGet(storeKey) {
  const ref = useRef(null);
  const storeValue = useSelector(storeState => storeState[storeKey]);
  const resource = ref.current
    ? store.get(storeValue, ref.current.id, ref.current.query)
    : EMPTY_OBJECT;
  const {
    data,
    permissions,
    isProcessing,
    isProcessed,
    isProcessingFailed,
    isStale,
  } = resource;
  const error = resource ? store.getError(resource) : null;
  const dispatch = useDispatch();

  const dispatchGet = useCallback(
    (action, id, query, meta) => {
      ref.current = {
        id,
        query,
      };

      dispatch(action(id, query, meta));
    },
    [dispatch],
  );

  return {
    dispatchGet,
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

export default useRRRGet;
