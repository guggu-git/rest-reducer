import uuid from 'uuid/v1';
import { ERROR, ITEMS, LIST, PATCHES } from './constants';
import { defaultList } from './defaults';
import { sortedStringify } from './helpers';
import { EMPTY_OBJECT } from './utils';

const getAll = (data, query = {}) => {
  const qs = sortedStringify(query);

  return data[LIST][qs] || defaultList;
};

const get = (data, id, query) => {
  const qs = query ? `${id}::${sortedStringify(query)}` : id;

  return data[ITEMS][qs] || EMPTY_OBJECT;
};

const getPatch = data => id => {
  return data[PATCHES][id] || null;
};

const post = (data, id) => {
  if (!id) {
    return {
      id: uuid(),
      current: null,
      resolved: null,
    };
  }

  const item = data[ITEMS][id] || null;

  if (item && (item.isCreated || item.isCreatingFailed)) {
    return {
      id: uuid(),
      current: null,
      resolved: item,
    };
  }

  return {
    id,
    current: item,
    resolved: null,
  };
};

const postNew = (data, id) => {
  if (!id) {
    return null;
  }

  return data[ITEMS][id] || null;
};

const patch = (data, id) => {
  if (!id) {
    return {
      id: uuid(),
      current: null,
      resolved: null,
    };
  }

  const item = data[PATCHES][id] || null;

  if (item && (item.isPatched || item.isPatchingFailed)) {
    return {
      id: uuid(),
      current: null,
      resolved: item,
    };
  }

  return {
    id,
    current: item,
    resolved: null,
  };
};

const patchNew = (data, id) => {
  if (!id) {
    return null;
  }

  return data[PATCHES][id] || null;
};

const removeAll = (data, id) => {
  if (!id) {
    return {
      id: uuid(),
      current: null,
      resolved: null,
    };
  }

  const item = data[PATCHES][id] || null;

  if (item && (item.isDeleted || item.isDeletingFailed)) {
    return {
      id: uuid(),
      current: null,
      resolved: item,
    };
  }

  return {
    id,
    current: item,
    resolved: null,
  };
};

const createRequest = ({ key, action, args }) => {
  return {
    id: uuid(),
    key,
    action,
    args,
  };
};

const getError = resource => {
  return resource[ERROR] || null;
};

export default {
  createRequest,
  postNew,
  patchNew,
  getError,
  get,
  getPatch,
  getAll,
  patch,
  post,
  removeAll,
};
