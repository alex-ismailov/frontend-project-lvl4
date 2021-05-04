// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  toggleModal,
  modalTypesMap,
  buildModalConfig,
} from '../modal/ModalWindowSlice.js';
import { setCurrentChannelId } from './channelsSlice.js';

const DefaultChannel = ({ name, btnVariant, handleActiveChannel }) => (
  <Nav.Item className="mr-2 mr-sm-0">
    <Button
      variant={btnVariant}
      onClick={handleActiveChannel}
      className="nav-link btn-block mb-2 text-left"
    >
      {name}
    </Button>
  </Nav.Item>
);

const ControlledChannel = ({
  name,
  btnVariant,
  removeChannel,
  renameChannel,
  handleActiveChannel,
}) => {
  const { t } = useTranslation();
  return (
    <Nav.Item className="mr-2 mr-sm-0">
      <Dropdown as={ButtonGroup} className="d-flex mb-2">
        <Button
          onClick={handleActiveChannel}
          variant={btnVariant}
          className="text-left flex-grow-1 nav-link"
        >
          {name}
        </Button>
        <Dropdown.Toggle split variant={btnVariant} className="flex-grow-0" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={removeChannel}>{t('remove')}</Dropdown.Item>
          <Dropdown.Item onClick={renameChannel}>{t('rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const dispatch = useDispatch();

  const handleActiveChannel = (channelId) => () => dispatch(setCurrentChannelId({ channelId }));

  const addChannel = () => {
    const modalConfig = buildModalConfig(true, modalTypesMap.adding);
    dispatch(toggleModal({ modalConfig }));
  };

  const removeChannel = (channelId) => (e) => {
    e.preventDefault();
    const modalConfig = buildModalConfig(
      true,
      modalTypesMap.removing,
      channelId,
    );
    dispatch(toggleModal({ modalConfig }));
  };

  const renameChannel = (channelId) => (e) => {
    e.preventDefault();
    const modalConfig = buildModalConfig(
      true,
      modalTypesMap.renaming,
      channelId,
    );
    dispatch(toggleModal({ modalConfig }));
  };

  return (
    <>
      <div className="d-flex justify-content-center justify-content-center justify-content-sm-start mb-2">
        <span>{t('channels')}</span>
        <Button
          onClick={addChannel}
          variant="link"
          className="ml-3 ml-sm-auto p-0"
        >
          +
        </Button>
      </div>
      <Nav className="ustify-content-right flex-sm-column nav-sm-pills nav-sm-fill">
        {channels.map(({ id, name, removable }) => {
          const btnVariant = id === currentChannelId ? 'primary' : 'light';
          return removable ? (
            <ControlledChannel
              key={id}
              name={name}
              btnVariant={btnVariant}
              removeChannel={removeChannel(id)}
              renameChannel={renameChannel(id)}
              handleActiveChannel={handleActiveChannel(id)}
            />
          ) : (
            <DefaultChannel
              key={id}
              name={name}
              btnVariant={btnVariant}
              handleActiveChannel={handleActiveChannel(id)}
            />
          );
        })}
      </Nav>
    </>
  );
};

export default Channels;
