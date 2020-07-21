import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';

export default function useEasyGet(key) {
  const reduxDispatch = useDispatch();
  const keyVal = useSelector(s => s[key]);
  const [pl, setPayload] = useState([]);
  const dispatch = (action, payload) => {
    reduxDispatch(action(...payload));
    setPayload(payload);
  };
  const clear = () => {
    setPayload([]);
  };
  const [state, setState] = useState(() => ({ dispatch, key, clear }));

  useEffect(() => {
    const resource = store.get(keyVal, ...pl) || {};
    const { isLoading: isInProcess, isLoaded: isProcessed, isStale, data } = resource;
    const error = store.getError(resource);

    setState({
      ...state,
      isInProcess,
      isProcessed,
      isStale,
      error,
      data,
      resource,
    });
  }, [key, pl, keyVal]);

  return state;
}
