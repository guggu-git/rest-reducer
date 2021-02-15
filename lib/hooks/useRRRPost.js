import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid/v1';
import store from '../store';

function useRRRPost(storeKey) {
  const ref = useRef(null);
  const storeValue = useSelector(storeState => storeState[storeKey]);
  const resource = ref.current ? store.postNew(storeValue, ref.current.requestId) : null;
  const { data, permissions, isProcessing, isProcessed, isProcessingFailed, isStale } =
    resource || {};
  const error = resource ? store.getError(resource) : null;
  const dispatch = useDispatch();

  const dispatchPost = useCallback(
    (action, body, meta) => {
      ref.current = {
        requestId: uuid(),
      };

      dispatch(action(ref.current.requestId, body, meta));
    },
    [dispatch],
  );

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
