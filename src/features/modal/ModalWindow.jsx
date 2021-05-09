// @ts-check

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { closeModalWindow } from './ModalWindowSlice.js';
import useSocket from '../../hooks/useSocket.js';

const PanelForm = ({
  initialName,
  validationSchema,
  handleSubmit,
  closeModal,
}) => {
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      name: initialName,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          value={formik.values.name}
          ref={inputRef}
          onFocus={(e) => e.currentTarget.select()}
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
          aria-label="add channel"
          className="mb-2 form-control"
          data-testid="add-channel"
          isInvalid={!formik.isValid}
          autoComplete="off"
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.name)}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            disabled={formik.isSubmitting}
            onClick={closeModal}
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
      </Form.Group>
    </Form>
  );
};

const RenamingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const channelId = useSelector((state) => state.modal.channelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = channels.find(({ id }) => id === channelId);
  const initialName = currentChannel.name;
  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3).max(20),
  });

  const renameChannel = (channel) => ({ name }, { setErrors }) => {
    const changedСhannel = { ...channel, name };
    try {
      socket.renameChannel(changedСhannel);
      closeModal();
    } catch (error) {
      setErrors({ name: error.message });
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

const RemovingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.modal.channelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = channels.find(({ id }) => id === channelId);

  const removeChannel = (channel) => ({ setErrors }) => {
    try {
      socket.removeChannel(channel);
      closeModal();
    } catch (error) {
      setErrors({ name: error.message });
    }
  };

  return (
    <>
      <p>{t('areYouSure')}</p>
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

const AddingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const initialName = '';
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelsNames = channels.map(({ name }) => name);
  const validationSchema = yup.object().shape({
    name: yup.string().required().notOneOf(channelsNames).min(3)
      .max(20),
  });

  const addChannel = ({ name }, { setErrors }) => {
    const channel = { name };
    try {
      socket.addChannel(channel);
      closeModal();
    } catch (error) {
      setErrors({ name: error.message });
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

const EmptyPanel = () => null;

const getControllPanel = (type) => {
  switch (type) {
    case 'adding':
      return AddingPanel;
    case 'removing':
      return RemovingPanel;
    case 'renaming':
      return RenamingPanel;
    case null:
      return EmptyPanel;
    default:
      throw new Error(`Unknown controll panel type: ${type}`);
  }
};

const ModalWindow = () => {
  const { t } = useTranslation();
  const isVisible = useSelector((state) => state.modal.isVisible);
  const type = useSelector((state) => state.modal.type);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalWindow());
  };

  const modalTitleKeysMap = {
    adding: 'addChannel',
    renaming: 'renameChannel',
    removing: 'removeChannel',
  };

  const ControllPanel = getControllPanel(type);

  return (
    <Modal show={isVisible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t(modalTitleKeysMap[type])}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ControllPanel closeModal={closeModal} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
