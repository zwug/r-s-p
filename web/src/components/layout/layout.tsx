import { ReactNode } from 'react';
import styles from './layout.module.css';

export const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return <div className={styles.root}>{children}</div>;
};
