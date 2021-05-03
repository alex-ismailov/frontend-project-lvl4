import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';
import axios from 'axios';
import routes from '../../common/routes.js';
import Header from '../../common/Header.jsx';
import useAuth from '../../hooks/useAuth.jsx';

const LoginForm = () => {
  const [isFailedAuth, setIsFailedAuth] = useState(false);
  const { t } = useTranslation();
  const auth = useAuth();
  const history = useHistory();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (loginData, actions) => {
      setIsFailedAuth(false);
      try {
        const response = await axios.post(routes.loginPath(), loginData);
        const { token, username } = response.data;
        auth.logIn(token, username);
        const { from } = window.location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (error) {
        setIsFailedAuth(true);
        // TODO: что делать с ошибками сети
        inputRef.current.select();
        actions.setErrors({ authStatus: 'invalidUsernameOrPassword' });
      }
    },
  });

  const redirectToSignupForm = (e) => {
    e.preventDefault();
    history.push('signup');
  };

  return (
    <Form onSubmit={formik.handleSubmit} className="p-3">
      <Form.Group>
        <Form.Label htmlFor="username">{t('yourNickname')}</Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="username"
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={isFailedAuth}
          required
          ref={inputRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">{t('password')}</Form.Label>
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
          name="password"
          id="password"
          autoComplete="current-password"
          isInvalid={isFailedAuth}
          required
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.authStatus)}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('login')}
      </Button>
      <div className="d-flex flex-column align-items-center">
        <span className="small mb-2">{t('haveNoAccount')}</span>
        <a onClick={redirectToSignupForm} href="/signup">
          {t('registration')}
        </a>
      </div>
    </Form>
  );
};

const LoginPage = () => (
  <>
    <Header />
    <Row className="justify-content-center pt-5">
      <Col sm="4">
        <LoginForm />
      </Col>
    </Row>
  </>
);

export default LoginPage;
