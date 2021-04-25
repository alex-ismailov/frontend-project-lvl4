import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const Header = ({ children }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const redirectToHome = (e) => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <Navbar className="mb-3" expand="lg" bg="light">
      <Navbar.Brand className="mr-auto" onClick={redirectToHome}>
        {t('hexletChat')}
      </Navbar.Brand>
      {children}
    </Navbar>
  );
};

export default Header;
