import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import Proptypes from "prop-types";

import Button from "components/common/Button";

import styles from "./Modal.module.css";

const Modal = ({
  content,
  visible,
  children,
  onActionClick,
  actionLabel,
  cancelLabel,
  onCancelClick,
}) => {
  const [t] = useTranslation();

  useEffect(() => {
    if (visible) {
      document.querySelector("body").classList.add("disabled-scroll");
    } else {
      document.querySelector("body").classList.remove("disabled-scroll");
    }
  }, [visible]);

  if (!content || !visible) return null;

  return ReactDOM.createPortal(
    <div className={`${styles.overlay} centered-container`}>
      <section className={styles.section}>
        <header className={styles.header}>
          <button onClick={onCancelClick} className={styles.closeButton}>
            x
          </button>
        </header>
        {content?.title && <h1 className={styles.title}>{content.title}</h1>}
        {content?.message && (
          <p className={styles.message}>{content.message}</p>
        )}
        {children}
        <footer className={styles.footer}>
          {onCancelClick && (
            <Button
              text={cancelLabel || t("actions.close")}
              onClick={onCancelClick}
              role="secondary"
            />
          )}
          {onActionClick && (
            <Button
              text={actionLabel || t("actions.accept")}
              onClick={onActionClick}
            />
          )}
        </footer>
      </section>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  content: Proptypes.shape({
    title: Proptypes.string,
    message: Proptypes.string,
  }),
  visible: Proptypes.any,
  children: Proptypes.node,
  onActionClick: Proptypes.func,
  actionLabel: Proptypes.string,
  cancelLabel: Proptypes.string,
  onCancelClick: Proptypes.func,
};

export default Modal;
