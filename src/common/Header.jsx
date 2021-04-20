import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const Header = ({ render }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const redirectToHome = (e) => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <Navbar className="mb-3" expand="lg" bg="light">
      <Navbar.Brand onClick={redirectToHome}>{t('hexletChat')}</Navbar.Brand>
      {render && render()}
    </Navbar>
  );
};

export default Header;
