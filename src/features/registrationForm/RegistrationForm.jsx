import { Formik, Field, ErrorMessage, Form } from 'formik';
import React from 'react';
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

const RegistrationForm = () => {
  const { t } = useTranslation();

  return (
    <Formik>
      {() => (
        <Form className="p-3">
          <FormGroup>
            <FormLabel htmlFor="username">{t('username')}</FormLabel>
            <Field
              autoFocus
              type="text"
              name="username"
              placeholder={t('from3to20symbols')}
              autoComplete="username"
              id="username"
              className="form-control" // if is not valid + is-invalid class
            />
            <ErrorMessage
              name="username"
              render={(message) => <Feedback message={message} />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">{t('password')}</FormLabel>
            <Field
              type="password"
              name="password"
              placeholder={t('atLeast6chars')}
              autoComplete="new-password"
              id="password"
              className="form-control" // if is not valid + is-invalid class
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
              className="form-control" // if is not valid + is-invalid class
            />
            <ErrorMessage
              name="password"
              render={(message) => <Feedback message={message} />}
            />
          </FormGroup>
          <Button type="submit" variant="outline-primary" className="w-100">
            {t('signup')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const RegistrationPage = () => (
  <>
    <Header render={null} />
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col sm={4}>
          <RegistrationForm />
        </Col>
      </Row>
    </Container>
  </>
);

export default RegistrationPage;
