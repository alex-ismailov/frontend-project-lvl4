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

// это потом уйдет в регистрацию
// const authorizationScheme = yup.object().shape({
//   nickName: yup.string(),
// });

const login = async (loginData, actions, history) => {
  actions.setSubmitting(false);
  try {
    console.log('success');
    const response = await axios.post(routes.loginPath(), loginData);
    const { token } = response.data; // здесь надо еще достать username чтбы прокинуть его в контекст
    // localStorage.clear();
    localStorage.setItem('token', token);
    // надо сохранить username в контекст
    history.push('/');
  } catch (error) {
    actions.setErrors('invalidUsernameOrPassword'); // good
    // надо еще что-то сделать на случай Network error
  }
};

const LoginForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  console.log(history);

  return (
    <div className="container-fluid">
      <Row className="justify-content-center pt-5">
        <Col sm="4">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={(loginData, actions) => {
              login(loginData, actions, history);
            }}
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
                    <a href="/signup">{t('registration')}</a>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
