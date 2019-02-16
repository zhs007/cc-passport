import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { queryAccountLogin, queryLogout } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    code: 0,
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(queryAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code === 0) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/account/settings'));
      }
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },

    *logout(_, { call, put }) {
      yield call(queryLogout);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          code: -1,
          // status: undefined,
          // currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.code === 0) {
        setAuthority('user');
      } else {
        setAuthority('guest');
      }

      let st;
      if (payload.code >= 0) {
        if (payload.code === 0) {
          st = 'ok';
        } else {
          st = 'error';
        }
      } else {
        st = undefined;
      }

      return {
        ...state,
        code: payload.code,
        status: st,
        type: 'account',
      };
    },
  },
};
