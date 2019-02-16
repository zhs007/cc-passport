import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    // showError: false,
    // errCode: undefined,
  };

  // componentDidUpdate() {
  //   const { form, login } = this.props;
  //   // const account = form.getFieldValue('mail');
  //   if (login.code) {
  //     if (login.code !== 0) {
  //       this.showError(login.code);
  //     }
  //   }
  // }

  // onEndErrorMsg = () => {
  //   const { showError } = this.state;
  //   if (showError) {
  //     this.setState({
  //       showError: false,
  //     });
  //   }
  // };

  // showError = errcode => {
  //   const { showError, errCode } = this.state;
  //   if (!showError && errCode !== errcode) {
  //     Modal.error({
  //       title: 'Something is wrong',
  //       content: `errcode is ${errcode}`,
  //       onOk: this.onEndErrorMsg,
  //     });

  //     this.setState({
  //       showError: true,
  //       errCode: errcode,
  //     });
  //   }
  // };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    // const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          // email: values.UserName,
          // password: values.password,
          ...values,
          // type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {login.status === 'error' &&
            !submitting &&
            this.renderMessage(`${formatMessage({ id: 'app.login.error-code' })}${login.code}`)}
          <UserName
            name="email"
            placeholder={formatMessage({ id: 'form.email.placeholder' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.email.required' }),
              },
              {
                type: 'email',
                message: formatMessage({ id: 'validation.email.wrong-format' }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={formatMessage({ id: 'form.password.placeholder' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.password.required' }),
              },
              {
                min: 8,
                max: 20,
                message: formatMessage({ id: 'validation.password.length' }),
              },
            ]}
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
