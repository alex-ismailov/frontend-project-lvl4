import { Formik, Field, ErrorMessage, Form } from 'formik';
import React, { useRef, useEffect } from 'react';
import * as yup from 'yup';
import cn from 'classnames';
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Feedback from '../../common/Feedback.jsx';
import Header from '../../common/Header.jsx';
import routes from '../../common/routes.js';

const SignupForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const usernameInput = useRef(null);

  useEffect(() => {
    usernameInput.current.focus();
  });

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null]),
  });

  const registerNewUser = async ({ username, password }, actions) => {
    actions.setSubmitting(false);
    const credentials = { username, password };
    try {
      const response = await axios.post(routes.signupPath(), credentials);
      const { data } = response;
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      history.push('/');
    } catch (e) {
      if (e.message === 'Network Error') {
        actions.setStatus({ isValid: false, message: 'networkError' });
        return;
      }
      usernameInput.current.focus();
      actions.setStatus({ isValid: false, message: 'userAlreadyExists' });
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={registerNewUser}
    >
      {({ isValid, errors, touched, status }) => (
        <Form className="p-3">
          <FormGroup>
            <FormLabel htmlFor="username">{t('username')}</FormLabel>
            <Field
              innerRef={usernameInput}
              onFocus={(e) => e.currentTarget.select()}
              type="text"
              name="username"
              placeholder={t('minMaxSymbols')}
              autoComplete="username"
              id="username"
              className={cn('form-control', {
                'is-invalid':
                  (errors.username && touched.username) ||
                  (status && !status.isValid),
              })}
            />
            <ErrorMessage
              name="username"
              render={(msg) => {
                const message = msg === 'required' ? msg : 'minMaxSymbols';
                return <Feedback message={message} />;
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">{t('password')}</FormLabel>
            <Field
              type="password"
              name="password"
              placeholder={t('minChars')}
              autoComplete="new-password"
              id="password"
              className={cn('form-control', {
                'is-invalid':
                  (errors.password && touched.password) ||
                  (status && !status.isValid),
              })}
            />
            <ErrorMessage
              name="password"
              render={(message) => <Feedback message={message} />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="confirmPassword">
              {t('confirmPassword')}
            </FormLabel>
            <Field
              type="password"
              name="confirmPassword"
              placeholder={t('passwordsMustMatch')}
              autoComplete="new-password"
              id="confirmPassword"
              className={cn('form-control', {
                'is-invalid':
                  (errors.confirmPassword && touched.confirmPassword) ||
                  (status && !status.isValid),
              })}
            />
            <ErrorMessage
              name="confirmPassword"
              render={(message) => <Feedback message={message} />}
            />
            {status && !status.isValid && <Feedback message={status.message} />}
          </FormGroup>
          <Button
            type="submit"
            disabled={!isValid}
            variant="outline-primary"
            className="w-100"
          >
            {t('signup')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const SignupPage = () => (
  <>
    <Header />
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col sm={4}>
          <SignupForm />
        </Col>
      </Row>
    </Container>
  </>
);

export default SignupPage;
