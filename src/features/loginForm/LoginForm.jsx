import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
// import * as yup from 'yup';
import { Row, Col, Button, FormGroup, FormLabel } from 'react-bootstrap';
import cn from 'classnames';
import axios from 'axios';
import Feedback from '../../common/Feedback.jsx';
import routes from '../../common/routes.js';
import Header from '../../common/Header.jsx';

const login = async (loginData, actions, history) => {
  actions.setSubmitting(false);
  try {
    const response = await axios.post(routes.loginPath(), loginData);
    const { token, username } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    history.push('/');
  } catch (error) {
    console.log(error);
    actions.setErrors('invalidUsernameOrPassword');
    // надо еще что-то сделать на случай Network error
  }
};

const LoginForm = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const redirectToSignupForm = (e) => {
    e.preventDefault();
    history.push('signup');
  };

  return (
    <>
      <Header render={null} />
      <div className="container-fluid">
        <Row className="justify-content-center pt-5">
          <Col sm="4">
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              onSubmit={(loginData, actions) =>
                login(loginData, actions, history)
              }
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ isValid, errors: errorKey }) => {
                const inputClasses = cn('form-control', {
                  'is-invalid': !isValid,
                });
                return (
                  <Form className="p-3">
                    <FormGroup>
                      <FormLabel htmlFor="username">
                        {t('yourNickname')}
                      </FormLabel>
                      <Field
                        autoFocus
                        type="text"
                        name="username"
                        required
                        id="username"
                        className={inputClasses}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="password">{t('password')}</FormLabel>
                      <Field
                        type="password"
                        name="password"
                        required
                        id="password"
                        className={inputClasses}
                      />
                      {!isValid && <Feedback message={t(errorKey)} />}
                    </FormGroup>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                    >
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
              }}
            </Formik>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginForm;
