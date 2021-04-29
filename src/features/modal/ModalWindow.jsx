import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { FormGroup, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import {
  toggleModal,
  buildModalConfig,
  modalTypesMap,
} from './ModalWindowSlice.js';
import Feedback from '../../common/Feedback.jsx';
import SocketContext from '../../context/SocketContext.js';
import { loadingStatesMap, setLoadingState } from '../../app/loadingSlice.js';

const submitActionsMap = {
  add: 'newChannel',
  remove: 'removeChannel',
  rename: 'renameChannel',
};

const PanelForm = ({
  initialName,
  validationSchema,
  handleSubmit,
  closeModal,
}) => {
  const textInput = useRef(null);
  const { t } = useTranslation();
  const loadingState = useSelector((state) => state.loading);
  const isDisabled = loadingState === loadingStatesMap.loading;

  useEffect(() => {
    textInput.current.focus();
  });

  return (
    <Formik
      initialValues={{
        name: initialName,
      }}
      validationSchema={validationSchema}
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
                onFocus={(e) => e.currentTarget.select()}
                type="text"
                name="name"
                aria-label="add channel"
                className={inputClasses}
                data-testid="add-channel"
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

const RemovingPanel = ({ channels, channelId, closeModal }) => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const action = submitActionsMap.remove;
  const currentChannel = channels.find(({ id }) => id === channelId);

  const removeChannel = (channel) => () => {
    dispatch(setLoadingState({ loadingState: loadingStatesMap.loading }));
    try {
      socket.emit(action, channel, (response) => {
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
        <Button onClick={removeChannel(currentChannel)} variant="danger">
          {t('remove')}
        </Button>
      </div>
    </>
  );
};

const RenamingPanel = ({ channels, channelId, closeModal }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const currentChannel = channels.find(({ id }) => id === channelId);
  const initialName = currentChannel.name;
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const renameChannel = (channel) => ({ name }, { setSubmitting }) => {
    setSubmitting(false);
    const changedСhannel = { ...channel, name };
    const action = submitActionsMap.rename;
    try {
      socket.emit(action, changedСhannel, (response) => {
        console.log(`${action} status: ${response.status}`);
      });
      dispatch(setLoadingState({ loadingState: loadingStatesMap.success }));
      closeModal();
    } catch (error) {
      console.log(error);
      dispatch(setLoadingState({ loadingState: loadingStatesMap.failure }));
    }
  };

  return (
    <PanelForm
      initialName={initialName}
      validationSchema={validationSchema}
      handleSubmit={renameChannel(currentChannel)}
      closeModal={closeModal}
    />
  );
};

const AddingPanel = ({ channels, closeModal }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const initialName = '';
  const channelsNames = channels.map(({ name }) => name);
  const validationSchema = yup.object().shape({
    name: yup.string().required().notOneOf(channelsNames),
  });

  const addChannel = ({ name }, { setSubmitting }) => {
    setSubmitting(false);
    const action = submitActionsMap.add;
    const channel = { name };
    try {
      socket.emit(action, channel, (response) => {
        console.log(`${action} status: ${response.status}`);
      });
      dispatch(setLoadingState({ loadingState: loadingStatesMap.success }));
      closeModal();
    } catch (error) {
      console.log(error);
      dispatch(setLoadingState({ loadingState: loadingStatesMap.failure }));
    }
  };

  return (
    <PanelForm
      initialName={initialName}
      validationSchema={validationSchema}
      handleSubmit={addChannel}
      closeModal={closeModal}
    />
  );
};

const ControllPanel = ({ type, channelId, closeModal }) => {
  const channels = useSelector((state) => state.channels);
  switch (type) {
    case modalTypesMap.adding:
      return <AddingPanel channels={channels} closeModal={closeModal} />;
    case modalTypesMap.removing:
      return (
        <RemovingPanel
          channels={channels}
          channelId={channelId}
          closeModal={closeModal}
        />
      );
    case modalTypesMap.renaming:
      return (
        <RenamingPanel
          channels={channels}
          channelId={channelId}
          closeModal={closeModal}
        />
      );
    default:
      throw new Error(`Unknown controll panel type: ${type}`);
  }
};

const ModalWindow = () => {
  const { t } = useTranslation();
  const { isVisible, type, channelId } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const closeModal = () => {
    const modalConfig = buildModalConfig(false);
    dispatch(toggleModal({ modalConfig }));
  };

  const modalTitleKeysMap = {
    adding: 'addChannel',
    renaming: 'renameChannel',
    removing: 'removeChannel',
  };

  return (
    isVisible && (
      <Modal show={isVisible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t(modalTitleKeysMap[type])}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ControllPanel
            type={type}
            channelId={channelId}
            closeModal={closeModal}
          />
        </Modal.Body>
      </Modal>
    )
  );
};

export default ModalWindow;
