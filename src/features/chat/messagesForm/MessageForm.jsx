// @ts-check

import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SocketContext from '../../../context/SocketContext.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const username = localStorage.getItem('username');
  // @ts-ignore
  const currentChannelId = useSelector((state) => state.currentChannelId);
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
    onSubmit: ({ body }, { setSubmitting, resetForm }) => {
      setSubmitting(false);
      const message = {
        nickname: username,
        body,
        channelId: currentChannelId,
      };
      try {
        socket.emit('newMessage', message, () => {});
        resetForm();
      } catch (error) {
        console.log(error);
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
            data-testid="new-message"
          />
          <InputGroup.Append>
            <Button type="submit" variant="primary">
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
