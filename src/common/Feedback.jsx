import React from 'react';
import { useTranslation } from 'react-i18next';

const Feedback = ({ message }) => {
  const { t } = useTranslation();

  return <div className="invalid-feedback">{t(message)}</div>;
};

export default Feedback;
