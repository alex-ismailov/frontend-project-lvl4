import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { setCurrentChannelId } from './currentChannelIdSlice.js';
import { toggleModal, modalTypesMap } from '../../modal/ModalWindowSlice.js';

const DefaultChannel = ({ name, btnVariant, handleActiveChannel }) => (
  <Nav.Item>
    <Button
      variant={btnVariant}
      onClick={handleActiveChannel}
      className="nav-link btn-block mb-2 text-left"
    >
      {name}
    </Button>
  </Nav.Item>
);

const ControlledChannel = ({ name, btnVariant, handleActiveChannel }) => (
  <Nav.Item>
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
      <Button
        onClick={handleActiveChannel}
        variant={btnVariant}
        className="text-left flex-grow-1 nav-link"
      >
        {name}
      </Button>
      <Dropdown.Toggle
        split
        variant={btnVariant}
        id="dropdown-split-basic"
        className="flex-grow-0"
      />
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Nav.Item>
);

const buildModalConfig = (isVisible, type) => ({
  isVisible,
  type,
});

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const handleActiveChannel = (channelId) => () =>
    dispatch(setCurrentChannelId({ channelId }));

  const addChannel = () => {
    const modalConfig = buildModalConfig(true, modalTypesMap.adding);
    dispatch(toggleModal({ modalConfig }));
  };

  const removeChannel = () => () => {
    const modalConfig = buildModalConfig(true, modalTypesMap.removing);
    dispatch(toggleModal({ modalConfig }));
  };

  const renameChannel = () => () => {
    const modalConfig = buildModalConfig(true, modalTypesMap.renaming);
    dispatch(toggleModal({ modalConfig }));
  };

  return (
    <>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Button onClick={addChannel} variant="link" className="ml-auto p-0">
          +
        </Button>
      </div>
      <Nav className="flex-column nav-pills nav-fill">
        {channels.length > 0 &&
          channels.map(({ id, name, removable }) => {
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
