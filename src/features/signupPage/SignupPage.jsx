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

  const validationSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
  });

  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  });

  const registerNewUser = async ({ username, password }, actions) => {
    actions.setSubmitting(false);
    console.log(actions);
    const credentials = { username, password };
    try {
      const response = await axios.post(routes.signupPath(), credentials);
      const { data } = response;
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      history.push('/');
    } catch (e) {
      console.log(e);
      if (!e.response) {
        actions.setStatus('failure');
        actions.setFieldTouched('confirmPassword', true);
        actions.setFieldError('confirmPassword', 'networkError');
        return;
      }
      actions.setStatus('failure');
      actions.setFieldTouched('confirmPassword', true);
      actions.setFieldError('confirmPassword', 'userAlreadyExists');
      //
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
      // validateOnBlur={false}
      onSubmit={registerNewUser}
    >
      {(props) => {
        const { isValid, errors, touched, status } = props;
        return (
          <Form className="p-3">
            <FormGroup>
              <FormLabel htmlFor="username">{t('username')}</FormLabel>
              <Field
                innerRef={usernameInput}
                onFocus={(e) => e.currentTarget.select()}
                // autoFocus
                type="text"
                name="username"
                placeholder={t('minMaxSymbols')}
                autoComplete="username"
                id="username"
                className={cn('form-control', {
                  'is-invalid': (errors.username && touched.username) || status,
                })}
              />
              <ErrorMessage
                name="username"
                render={() => <Feedback message="minMaxSymbols" />}
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
                  'is-invalid': (errors.password && touched.password) || status,
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
                  'is-invalid': (errors && touched.confirmPassword) || status,
                })}
              />
              <ErrorMessage
                name="confirmPassword"
                render={(message) => <Feedback message={message} />}
              />
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
        );
      }}
    </Formik>
  );
};

const SignupPage = () => (
  <>
    <Header render={null} />
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
