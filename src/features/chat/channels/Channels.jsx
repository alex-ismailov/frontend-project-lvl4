import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Nav, Button } from 'react-bootstrap';
import { setCurrentChannelId } from './currentChannelIdSlice.js';
import { handleModal } from '../../modal/ModalWindowSlice.js';

const buildNavItem = (id, name, currentChannelId, handleChannel) => {
  const classes = cn('nav-link btn-block mb-2 text-left btn', {
    'btn-primary': id === currentChannelId,
    'btn-light': id !== currentChannelId,
  });
  return (
    <Nav.Item key={id}>
      <button type="button" className={classes} onClick={handleChannel(id)}>
        {name}
      </button>
    </Nav.Item>
  );
};

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const handleChannel = (channelId) => () =>
    dispatch(setCurrentChannelId({ channelId }));

  const addChannel = () => {
    const modalConfig = {
      isVisible: true,
      type: 'adding',
    };
    dispatch(handleModal({ modalConfig }));
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
          channels.map(({ id, name }) =>
            buildNavItem(id, name, currentChannelId, handleChannel)
          )}
      </Nav>
    </>
  );
};

export default Channels;
