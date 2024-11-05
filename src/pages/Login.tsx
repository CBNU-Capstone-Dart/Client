import { useState } from 'react';
import styles from '../styles/Login.module.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 에러 메시지 상태
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <h2>로그인</h2>
        <form>
          <div>
            <input
              id="email"
              className={cx('inputForm', { inputError: emailError })}
              type="email"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <div className={styles.errorMessage}>{emailError}</div>
            )}
          </div>
          <div>
            <input
              id="password"
              className={cx('inputForm', { inputError: passwordError })}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <div className={styles.errorMessage}>{passwordError}</div>
            )}
          </div>
          <div className={styles.loginFooter}>
            <Link to="/signup">계정 만들기</Link>
            <button type="submit" className={styles.loginButton}>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
