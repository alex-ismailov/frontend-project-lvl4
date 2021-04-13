import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Header = ({ render }) => {
  const { t } = useTranslation();

  return (
    <Navbar className="mb-3" expand="lg" bg="light">
      <a className="mr-auto navbar-brand" href="/">
        {t('hexletChat')}
      </a>
      {render && render()}
    </Navbar>
  );
};

export default Header;
