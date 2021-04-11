import React from 'react';
import { Formik, Form, Field } from 'formik';
// import * as yup from 'yup';
import { Row, Col, Button, FormGroup, FormLabel } from 'react-bootstrap';
import Feedback from '../../common/Feedback.jsx';

// это потом уйдет в регистрацию
// const authorizationScheme = yup.object().shape({
//   nickName: yup.string(),
// });

const LoginForm = () => (
  <div className="container-fluid">
    <Row className="justify-content-center pt-5">
      <Col sm="4">
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false);
            alert(JSON.stringify(values, null, '  '));
            // const isValidUser = await validateLoginPassword();
            actions.resetForm();
          }}
        >
          {({ isValid }) => (
            <Form className="p-3">
              <FormGroup>
                <FormLabel htmlFor="username">Ваш ник</FormLabel>
                <Field
                  type="text"
                  name="username"
                  autoComplete="username"
                  aria-label="username"
                  required
                  id="username"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="password">Пароль</FormLabel>
                <Field
                  name="password"
                  type="password"
                  required
                  id="password"
                  className="form-control"
                />
                {!isValid && (
                  <Feedback message="Неверные имя пользователя или пароль" />
                )}
              </FormGroup>
              <Button
                type="submit"
                variant="outline-primary"
                className="w-100 mb-3"
              >
                Войти
              </Button>
              <div className="d-flex flex-column align-items-center">
                <span className="small mb-2">Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  </div>
);

export default LoginForm;
