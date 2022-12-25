import { Alert, Space } from 'antd';
import styles from './error-message.module.css';
import cn from 'classnames';

type TErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: TErrorMessageProps): JSX.Element => {
  return (
    <div>
      <Space className={styles.errorContainer} direction="vertical">
        <Alert
          className={cn({ [styles.errorHidden]: !error })}
          message={error}
          type="error"
        />
      </Space>
    </div>
  );
};
