// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const NoMatch = () => {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <div>
      <h1>404</h1>
      <h3>
        <p>
          {t('notFound')}
          <code>{location.pathname}</code>
        </p>
      </h3>
      <p>{t('maybeThisPageMoved')}</p>
      <hr />
      <p>
        {t('letsGo')}
        <a href="/">
          {' '}
          {t('home')}
          {' '}
        </a>
        {t('andTryFromThere')}
        .
      </p>
    </div>
  );
};

export default NoMatch;
