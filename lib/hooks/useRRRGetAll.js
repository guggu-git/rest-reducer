import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';
import { EMPTY_OBJECT } from '../utils';

function useRRRGetAll(storeKey, initialQuery) {
  const ref = useRef(
    initialQuery
      ? {
          query: initialQuery,
        }
      : null,
  );
  const storeValue = useSelector(storeState => storeState[storeKey]);
  const resource = ref.current
    ? store.getAll(storeValue, ref.current.query)
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

  const dispatchGetAll = useCallback(
    (action, query, meta) => {
      ref.current = {
        query,
      };

      dispatch(action(query, meta));
    },
    [dispatch],
  );

  return {
    dispatchGetAll,
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

export default useRRRGetAll;
