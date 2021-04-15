import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import UserNameContext from '../../../context/UserNameContext.js';
import SocketContext from '../../../context/SocketContext.js';

const sendMessage = async (message, socket) => {
  try {
    // Магический сокет, я отключил инет в браузере, но сообщения
    // все равно отправляются и приходят новые
    // поэтому пока не понятно как увидеть в работе блок catch ?
    socket.emit('newMessage', message, (response) => {
      console.log(`Message sending status: ${response.status}`);
    });
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      sendMessage(message, socket);
    }, 3000);
  }
};

const MessageForm = () => {
  const username = useContext(UserNameContext);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const socket = useContext(SocketContext);

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
        const message = {
          nickname: username,
          body,
          channelId: currentChannelId,
        };
        await sendMessage(message, socket);
        resetForm();
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
