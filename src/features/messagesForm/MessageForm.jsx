import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import UserNameContext from '../../context/UserNameContext.js';
import routes from '../../common/routes.js';

const sendMessage = async (currentChannelId, messageData) => {
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
    // вместо тела нового сообщения из response лучше воспользоваться
    // websocketom
  } catch (error) {
    // если что пошло не так надо как то сообщить об этом
    // через feedback под инпутом
    console.log(error);
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
      onSubmit={({ body }, actions) => {
        // alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
        actions.resetForm();
        // это функция еще меняет состояние приложения
        // loading: {
        //   processState: loadingStateMap.idle, // см. 3 проект
        //   error: null,
        // },
        const messageData = {
          nickname: userName,
          body,
        };
        sendMessage(currentChannelId, messageData);
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
