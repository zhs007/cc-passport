import { queryRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
    code: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(queryRegister, payload);
      // console.log('register ' + response);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      // console.log(payload);
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.code === 0 ? 'ok' : 'error',
        code: payload.code,
      };
    },
  },
};
