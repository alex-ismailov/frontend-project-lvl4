import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFormik,
} from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import {
  toggleModal,
  buildModalConfig,
  modalTypesMap,
} from './ModalWindowSlice.js';
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
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          value={formik.values.password}
          ref={inputRef}
          onFocus={(e) => e.currentTarget.select()}
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
          aria-label="add channel"
          className="mb-2 form-control"
          data-testid="add-channel"
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.initialName)}
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
          <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
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
    name: yup.string().required(),
  });

  const renameChannel = (channel) => ({ name }, { setSubmitting }) => {
    setSubmitting(false);
    const changedСhannel = { ...channel, name };
    try {
      socket.renameChannel(changedСhannel);
      closeModal();
    } catch (error) {
      console.log(error);
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

  const removeChannel = (channel) => () => {
    try {
      // socket.emit(action, channel, () => {});
      socket.removeChannel(channel);
      closeModal();
    } catch (error) {
      console.log(error);
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

const AddingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const initialName = '';
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelsNames = channels.map(({ name }) => name);
  const validationSchema = yup.object().shape({
    name: yup.string().required().notOneOf(channelsNames),
  });

  const addChannel = ({ name }, { setSubmitting }) => {
    setSubmitting(false);
    const channel = { name };
    try {
      // socket.emit(action, channel, () => {});
      socket.addChannel(channel);
      closeModal();
    } catch (error) {
      console.log(error);
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

const getControllPanel = (type) => {
  switch (type) {
    case modalTypesMap.adding:
      return AddingPanel;
    case modalTypesMap.removing:
      return RemovingPanel;
    case modalTypesMap.renaming:
      return RenamingPanel;
    case modalTypesMap.idle:
      return null;
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
    const modalConfig = buildModalConfig(false);
    dispatch(toggleModal({ modalConfig }));
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
        {isVisible && <ControllPanel closeModal={closeModal} />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
