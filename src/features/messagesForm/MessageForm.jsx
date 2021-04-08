import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import UserNameContext from '../../context/UserNameContext.js';
import routes from '../../common/routes.js';

const sendMessage = async (currentChannelId, messageData, resetForm) => {
  const url = routes.channelMessagesPath(currentChannelId);
  const postData = {
    data: {
      attributes: {
        ...messageData,
      },
    },
  };
  try {
    await axios.post(url, postData);
    resetForm();
  } catch (error) {
    setTimeout(() => {
      sendMessage(currentChannelId, messageData, resetForm);
    }, 3000);
  }
};

const MessageForm = () => {
  const userName = useContext(UserNameContext);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  return (
    <Formik
      initialValues={{
        body: '',
      }}
      validationSchema={yup.object().shape({
        body: yup.string().required('Required'),
      })}
      validateOnBlur={false}
      onSubmit={async ({ body }, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        const messageData = {
          nickname: userName,
          body,
        };
        sendMessage(currentChannelId, messageData, resetForm);
      }}
    >
      {({ isValid }) => {
        const inputContainerClasses = cn('input-group', {
          'has-validation': !isValid,
        });
        const inputClasses = cn('form-control', {
          'is-invalid': !isValid,
        });

        return (
          <div className="mt-auto">
            <Form noValidate>
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
                  render={(msg) => (
                    <div className="invalid-feedback">{msg}</div>
                  )}
                />
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default MessageForm;
