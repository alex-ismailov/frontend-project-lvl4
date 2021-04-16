import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { FormGroup, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { handleModal, modalTypesMap } from './ModalWindowSlice.js';
// import Feedback from '../../common/Feedback.jsx';

const RemovingPanel = () => <h2>Removing Panel STUB !!!</h2>;

const SubmitPanel = ({ handleClosing, handleSubmit }) => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <FormGroup>
            <Field
              autoFocus
              type="text"
              name="name"
              aria-label="add channel"
              className="mb-2 form-control"
            />
            {/* {!isValid && <Feedback message={t(errorKey)} />} */}
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
      )}
    </Formik>
  );
};

const buildSubmitHandler = (type) => {
  switch (type) {
    case 'adding':
      // eslint-disable-next-line
      return (value, actions) => {
        console.log('ADD NEW CHANNEL');
        // TODO: handle adding channel
      };
    case 'renaming':
      // eslint-disable-next-line
      return (value, actions) => {
        console.log('RENAME CHANNEL');
        // TODO: handle renaming channel
      };
    case 'removing':
      return () => {
        console.log('REMOVE CHANNEL');
        // TODO: handle removing channel
      };
    default:
      throw new Error(`Unknown submit handler type: ${type}`);
  }
};

const ControlPanel = ({ type, handleClosing }) => {
  const handleSubmit = buildSubmitHandler(type);
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
