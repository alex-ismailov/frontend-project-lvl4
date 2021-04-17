import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { setCurrentChannelId } from './currentChannelIdSlice.js';
import { toggleModal } from '../../modal/ModalWindowSlice.js';

const buildDefaultChannel = (id, name, btnVariant, handleActiveChannel) => (
  <Nav.Item key={id}>
    <Button
      variant={btnVariant}
      onClick={handleActiveChannel}
      className="nav-link btn-block mb-2 text-left"
    >
      {name}
    </Button>
  </Nav.Item>
);

const buildControlledChannel = (id, name, btnVariant, handleActiveChannel) => (
  <Nav.Item key={id}>
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

const buildNavItem = (channel, currentChannelId, handleActiveChannel) => {
  const { id, name, removable } = channel;
  const btnVariant = id === currentChannelId ? 'primary' : 'light';

  return removable
    ? buildControlledChannel(id, name, btnVariant, handleActiveChannel)
    : buildDefaultChannel(id, name, btnVariant, handleActiveChannel);
};

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const handleActiveChannel = (channelId) => () =>
    dispatch(setCurrentChannelId({ channelId }));

  const addChannel = () => {
    const modalConfig = {
      isVisible: true,
      type: 'adding',
    };
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
          channels.map((channel) =>
            buildNavItem(
              channel,
              currentChannelId,
              handleActiveChannel(channel.id)
            )
          )}
      </Nav>
    </>
  );
};

export default Channels;
