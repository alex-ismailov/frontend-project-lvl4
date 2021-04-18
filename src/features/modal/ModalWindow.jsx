import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { toggleModal, buildModalConfig } from './ModalWindowSlice.js';
import Feedback from '../../common/Feedback.jsx';
import SocketContext from '../../context/SocketContext.js';
import { loadingStatesMap, setLoadingState } from '../../app/loadingSlice.js';

const submitActionsMap = {
  adding: 'newChannel',
  removing: 'removeChannel',
  renaming: 'renameChannel',
};

const RemovingPanel = ({ channel, closeModal }) => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const action = submitActionsMap.removing;

  const removeChannel = (channelData) => () => {
    dispatch(setLoadingState({ loadingState: loadingStatesMap.loading }));
    try {
      socket.emit(action, channelData, (response) => {
        console.log(`${action} status: ${response.status}`);
      });
      dispatch(setLoadingState({ loadingState: loadingStatesMap.success }));
      closeModal();
    } catch (error) {
      console.log(error);
      dispatch(setLoadingState({ loadingState: loadingStatesMap.failure }));
      closeModal();
    }
  };

  return (
    <>
      Уверены?
      <div className="d-flex justify-content-between">
        <Button onClick={closeModal} variant="secondary" className="mr-2">
          {t('cancel')}
        </Button>
        <Button onClick={removeChannel(channel)} variant="danger">
          {t('remove')}
        </Button>
      </div>
    </>
  );
};

const buildSubmitHandler = (type, socket, closeModal, dispatch) => (
  channel,
  actions
) => {
  dispatch(setLoadingState({ loadingState: loadingStatesMap.loading }));
  const { setSubmitting, resetForm } = actions;
  setSubmitting(false);
  const action = submitActionsMap[type];
  try {
    socket.emit(action, channel, (response) => {
      console.log(`${action} status: ${response.status}`);
    });
    dispatch(setLoadingState({ loadingState: loadingStatesMap.success }));
    resetForm();
    closeModal();
  } catch (error) {
    console.log(error);
    dispatch(setLoadingState({ loadingState: loadingStatesMap.failure }));
  }
};

const SubmitPanel = ({ type, closeModal }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels);
  const channelsNames = channels.map(({ name }) => name);

  const loadingState = useSelector((state) => state.loading);
  const isDisabled = loadingState === loadingStatesMap.loading;

  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const handleSubmit = buildSubmitHandler(type, socket, closeModal, dispatch);

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.focus();
  }, [textInput]);

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
                innerRef={textInput}
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
                  onClick={closeModal}
                  type="button"
                  variant="secondary"
                  className="mr-2"
                >
                  {t('cancel')}
                </Button>
                <Button type="submit" variant="primary" disabled={isDisabled}>
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

const ModalContent = ({ type, channelId, closeModal }) => {
  const channels = useSelector((state) => state.channels);
  const channel = channels.find(({ id }) => id === channelId);

  const modalTitleKeysMap = {
    adding: 'addChannel',
    renaming: 'renameChannel',
    removing: 'removeChannel',
  };

  const { t } = useTranslation();
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t(modalTitleKeysMap[type])}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === 'removing' ? (
          <RemovingPanel channel={channel} closeModal={closeModal} />
        ) : (
          <SubmitPanel type={type} channel={channel} closeModal={closeModal} />
        )}
      </Modal.Body>
    </>
  );
};

const ModalWindow = () => {
  const { isVisible, type, channelId } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const closeModal = () => {
    const modalConfig = buildModalConfig(false);
    dispatch(toggleModal({ modalConfig }));
  };

  return (
    <Modal show={isVisible} onHide={closeModal}>
      <ModalContent type={type} channelId={channelId} closeModal={closeModal} />
    </Modal>
  );
};

export default ModalWindow;
