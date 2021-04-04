import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';

const MessageForm = () => (
  <Formik
    initialValues={{
      body: '',
    }}
    validationSchema={yup.object().shape({
      body: yup.string().required('Required'),
    })}
    validateOnBlur={false}
    onSubmit={(values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
      actions.resetForm();
      // здесь мы получим данные из формы values, т.е. сообщение
      // далле передаем в async функцию которая отправит его на сервер
      // это функция еще меняет состояние приложения
      // loading: {
      //   processState: loadingStateMap.idle, // см. 3 проект
      //   error: null,
      // },
    }}
  >
    {({ isValid }) => {
      const inputContainerClasses = cn('input-group', {
        'has-validation': !isValid, // bool ГДе храниить это состояние ???
      });
      const inputClasses = cn('form-control', {
        'is-invalid': !isValid, // bool ГДе храниить это состояние ???
      });

      return (
        <div className="mt-auto">
          <Form noValidate class>
            <div className={inputContainerClasses}>
              <Field
                type="text"
                name="body"
                aria-label="body"
                className={inputClasses}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  aria-label="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
              <ErrorMessage
                name="body"
                render={(msg) => <div className="invalid-feedback">{msg}</div>}
              />
            </div>
          </Form>
        </div>
      );
    }}
  </Formik>
);

export default MessageForm;
