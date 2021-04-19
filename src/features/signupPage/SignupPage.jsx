import { Formik, Field, ErrorMessage, Form } from 'formik';
import React from 'react';
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
import Feedback from '../../common/Feedback.jsx';
import Header from '../../common/Header.jsx';

const SignupForm = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        console.log('SUBMIT !!!');
        console.log(values);
      }}
    >
      {({ isValid, errors, touched }) => (
        <Form className="p-3">
          <FormGroup>
            <FormLabel htmlFor="username">{t('username')}</FormLabel>
            <Field
              autoFocus
              type="text"
              name="username"
              placeholder={t('minMaxSymbols')}
              autoComplete="username"
              id="username"
              className={cn('form-control', {
                'is-invalid': errors.username && touched.username,
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
                'is-invalid': errors.password && touched.password,
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
                'is-invalid': errors.confirmPassword && touched.confirmPassword,
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
      )}
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
