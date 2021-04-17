// @ts-check

import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import UserNameContext from '../../../context/UserNameContext.js';
import SocketContext from '../../../context/SocketContext.js';
import Feedback from '../../../common/Feedback.jsx';
import {
  loadingStatesMap,
  setLoadingState,
} from '../../../app/loadingSlice.js';

const sendMessage = async (message, socket, dispatch) => {
  console.log(message);
  dispatch(setLoadingState({ loadingState: loadingStatesMap.loading }));
  try {
    socket.emit('newMessage', message, (response) => {
      console.log(`Message sending status: ${response.status}`);
    });
    dispatch(setLoadingState({ loadingState: loadingStatesMap.success }));
  } catch (error) {
    console.log(error);
    // setTimeout(() => {
    //   sendMessage(message, socket);
    // }, 3000); // Это пока под вопросом
    dispatch(setLoadingState({ loadingState: loadingStatesMap.failure }));
  }
};

const MessageForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const username = useContext(UserNameContext);
  // @ts-ignore
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const loadingState = useSelector((state) => state.loading);
  const isDisabled = loadingState === loadingStatesMap.loading;

  return (
    <Formik
      initialValues={{
        body: '',
      }}
      validationSchema={yup.object().shape({
        body: yup.string().required(),
      })}
      validateOnBlur={false}
      onSubmit={async ({ body }, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        const message = {
          nickname: username,
          body,
          channelId: currentChannelId,
        };
        await sendMessage(message, socket, dispatch);
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
                  <Button type="submit" variant="primary" disabled={isDisabled}>
                    {t('send')}
                  </Button>
                </div>
                <ErrorMessage
                  name="body"
                  render={(message) => <Feedback message={message} />}
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
