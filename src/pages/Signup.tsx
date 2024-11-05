import { useState } from 'react';
import styles from '../styles/Login.module.css';
import classNames from 'classnames/bind';
import { passwordRegex, emailRegex } from '../utils/regex.ts';

const cx = classNames.bind(styles);

export default function Signup() {
  // 입력 상태
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tosAgree, setTosAgree] = useState(false);

  // 검증 상태
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPasswordMessage, setShowPasswordMessage] = useState(false);

  // 에러 메시지 상태
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [tosError, setTosError] = useState('');

  // 입력 변경 핸들러
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError) setNameError(''); // 변경 시 에러 메시지 초기화
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(''); // 변경 시 에러 메시지 초기화
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPassword(e.target.value);
    if (passwordError) setPasswordError(''); // 변경 시 에러 메시지 초기화
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) setConfirmPasswordError(''); // 변경 시 에러 메시지 초기화
  };

  const handleTosAgreeChange = (e) => {
    setTosAgree(e.target.checked);
    if (tosError) setTosError(''); // 변경 시 에러 메시지 초기화
  };

  const handlePasswordFocus = () => setShowPasswordMessage(true);
  const handlePasswordBlur = () => setShowPasswordMessage(false);

  const checkPassword = (password) => {
    setPasswordValid(passwordRegex.test(password));
  };

  // 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // 이름 검증
    if (!name) {
      setNameError('이름을 입력하셔야 됩니다.');
      valid = false;
    } else {
      setNameError('');
    }

    // 이메일 검증
    if (!emailRegex.test(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      valid = false;
    } else {
      setEmailError('');
    }

    // 비밀번호 검증
    if (!passwordRegex.test(password)) {
      setPasswordError(
        '비밀번호는 8자리 이상이며 알파벳 대소문자, 숫자, 특수문자를 혼합해야 합니다.',
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    // 약관 동의 검증
    if (!tosAgree) {
      setTosError('이용약관에 동의해야 합니다.');
      valid = false;
    } else {
      setTosError('');
    }

    if (valid) {
      // 폼 제출 처리 (예: API 호출)
      console.log('폼 제출:', {
        name,
        email,
        password,
        confirmPassword,
        tosAgree,
      });
      // 필요에 따라 폼 리셋 또는 리디렉션
    } else {
      // 첫 번째 에러 입력 필드에 포커스
      if (nameError) {
        document.getElementById('name').focus();
      } else if (emailError) {
        document.getElementById('email').focus();
      } else if (passwordError) {
        document.getElementById('password').focus();
      } else if (confirmPasswordError) {
        document.getElementById('confirmPassword').focus();
      }
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* 이메일 입력 */}
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

          {/* 이름 입력 */}
          <div>
            <input
              id="name"
              className={cx('inputForm', { inputError: nameError })}
              type="text"
              placeholder="이름"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && (
              <div className={styles.errorMessage}>{nameError}</div>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <input
              id="password"
              className={cx('inputForm', { inputError: passwordError })}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
            <div
              className={cx('passwordMessage', { show: showPasswordMessage })}
            >
              {passwordValid ? (
                <>
                  <span style={{ color: 'green', marginRight: '5px' }}>✔</span>
                  비밀번호 조건이 충족되었습니다.
                </>
              ) : (
                '비밀번호는 8자리 이상이며 알파벳 대소문자, 숫자, 특수문자를 혼합해야 합니다.'
              )}
            </div>
            {passwordError && (
              <div className={styles.errorMessage}>{passwordError}</div>
            )}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div>
            <input
              id="confirmPassword"
              className={cx('inputForm', { inputError: confirmPasswordError })}
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && (
              <div className={styles.errorMessage}>{confirmPasswordError}</div>
            )}
          </div>

          {/* 이용약관 동의 */}
          <div>
            <input
              type="checkbox"
              id="tos"
              name="tos"
              checked={tosAgree}
              onChange={handleTosAgreeChange}
            />
            <label htmlFor="tos" style={{ fontSize: '12px' }}>
              이용약관 개인정보 수집 및 정보 이용에 동의합니다.
            </label>
            {tosError && <div className={styles.errorMessage}>{tosError}</div>}
          </div>

          {/* 제출 버튼 */}
          <div
            className={styles.loginFooter}
            style={{ justifyContent: 'flex-end' }}
          >
            <button type="submit" className={styles.loginButton}>
              계정 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
