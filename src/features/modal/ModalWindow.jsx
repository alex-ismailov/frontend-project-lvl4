import React, { useContext } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { handleModal, modalTypesMap } from './ModalWindowSlice.js';
import Feedback from '../../common/Feedback.jsx';
import SocketContext from '../../context/SocketContext.js';

const RemovingPanel = () => <h2>Removing Panel STUB !!!</h2>;

const SubmitPanel = ({ handleClosing, handleSubmit }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels);
  const channelsNames = channels.map(({ name }) => name);
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required().notOneOf(channelsNames),
      })}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => {
        const inputClasses = cn('mb-2', 'form-control', {
          'is-invalid': !isValid,
        });

        return (
          <Form>
            <FormGroup>
              <Field
                autoFocus
                type="text"
                name="name"
                aria-label="add channel"
                className={inputClasses}
              />
              <ErrorMessage
                name="name"
                render={(message) => <Feedback message={message} />}
              />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={handleClosing}
                  type="button"
                  variant="secondary"
                  className="mr-2"
                >
                  {t('cancel')}
                </Button>
                <Button type="submit" variant="primary">
                  {t('send')}
                </Button>
              </div>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

const submitActionsMap = {
  adding: 'newChannel',
  removing: 'removeChannel',
  renaming: 'renameChannel',
};

const buildSubmitHandler = (type, socket, closeModal) => (channel, actions) => {
  const { setSubmitting, resetForm } = actions;
  setSubmitting(false);
  const action = submitActionsMap[type];

  try {
    socket.emit(action, channel, (response) => {
      console.log(`${action} status: ${response.status}`);
    });
    resetForm();
    closeModal();
  } catch (error) {
    console.log(error);
  }
};

const ControlPanel = ({ type, handleClosing }) => {
  const socket = useContext(SocketContext);
  const handleSubmit = buildSubmitHandler(type, socket, handleClosing);

  switch (type) {
    case 'adding':
    case 'renaming':
      return (
        <SubmitPanel
          handleClosing={handleClosing}
          handleSubmit={handleSubmit}
        />
      );
    case 'removing':
      return (
        <RemovingPanel
          handleClosing={handleClosing}
          handleSubmit={handleSubmit}
        />
      );
    default:
      throw new Error(`Unknown control panel type: ${type}`);
  }
};

const modalTitleKeysMap = {
  adding: 'addChannel',
  renaming: 'renameChannel',
  removing: 'removeChannel',
};

const ModalContent = ({ type, handleClosing }) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t(modalTitleKeysMap[type])}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ControlPanel type={type} handleClosing={handleClosing} />
      </Modal.Body>
    </>
  );
};

const ModalWindow = () => {
  const { isVisible, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClosing = () => {
    const modalConfig = {
      isVisible: false,
      type: modalTypesMap.idle,
    };
    dispatch(handleModal({ modalConfig }));
  };

  return (
    <Modal show={isVisible} onHide={handleClosing}>
      {type !== modalTypesMap.idle && (
        <ModalContent type={type} handleClosing={handleClosing} />
      )}
    </Modal>
  );
};

export default ModalWindow;
