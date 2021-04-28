// @ts-check

import React, { useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SocketContext from '../../../context/SocketContext.js';
import {
  loadingStatesMap,
  setLoadingState,
} from '../../../app/loadingSlice.js';

// const sendMessage = async (message, socket, dispatch) => {
//   dispatch(setLoadingState({ loadingState: loadingStatesMap.loading }));
//   try {
//     socket.emit('newMessage', message, (response) => {
//       console.log(`Message sending status: ${response.status}`);
//     });
//     dispatch(setLoadingState({ loadingState: loadingStatesMap.success }));
//   } catch (error) {
//     console.log(error);
//     // setTimeout(() => {
//     //   sendMessage(message, socket);
//     // }, 3000); // Это пока под вопросом
//     dispatch(setLoadingState({ loadingState: loadingStatesMap.failure }));
//   }
// };

const MessageForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const username = localStorage.getItem('username');
  // @ts-ignore
  const currentChannelId = useSelector((state) => state.currentChannelId);
  // @ts-ignore
  const loadingState = useSelector((state) => state.loading);
  const isDisabled = loadingState === loadingStatesMap.loading;
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup.string().required(),
    }),
    validateOnBlur: false,
    // onSubmit: async ({ body }, { setSubmitting, resetForm }) => {
    //   setSubmitting(false);
    //   const message = {
    //     nickname: username,
    //     body,
    //     channelId: currentChannelId,
    //   };
    //   await sendMessage(message, socket, dispatch);
    //   resetForm();
    // },
    onSubmit: ({ body }, { setSubmitting, resetForm }) => {
      setSubmitting(false);
      dispatch(setLoadingState({ loadingState: loadingStatesMap.loading }));
      const message = {
        nickname: username,
        body,
        channelId: currentChannelId,
      };
      try {
        socket.emit('newMessage', message, (response) => {
          console.log(`Message sending status: ${response.status}`);
        });
        dispatch(setLoadingState({ loadingState: loadingStatesMap.success }));
        resetForm();
      } catch (error) {
        console.log(error);
        dispatch(setLoadingState({ loadingState: loadingStatesMap.failure }));
      }
    },
  });

  return (
    <div className="mt-auto">
      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
      >
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            aria-label="body"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.body}
            name="body"
            id="body"
            isInvalid={!formik.isValid}
            ref={inputRef}
          />
          <InputGroup.Append>
            <Button type="submit" variant="primary" disabled={isDisabled}>
              {t('send')}
            </Button>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
            {t(formik.errors.body)}
          </Form.Control.Feedback>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
