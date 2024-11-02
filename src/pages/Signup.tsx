import { useState } from 'react';
import styles from "../styles/Login.module.css";
import classNames from 'classnames/bind';
import { passwordRegex } from '../utils/regex.ts';

const cx = classNames.bind(styles);

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tosAgree, setTosAgree] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPasswordMessage, setShowPasswordMessage] = useState(false);  // 추가: 비밀번호 메시지를 표시할지 여부

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleTosAgreeChange = (e) => setTosAgree(e.target.checked);
    const handlePasswordFocus = () => setShowPasswordMessage(true);  // 추가: 포커스 시 메시지 표시
    const handlePasswordBlur = () => setShowPasswordMessage(false);  // 추가: 포커스 해제 시 메시지 숨김

    const checkPassword = (password) => {
        setPasswordValid(passwordRegex.test(password));
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <h2>회원가입</h2>
                <input
                    className={styles.inputForm}
                    type="text"
                    placeholder="이메일"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    className={styles.inputForm}
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                />
                <div className={cx('passwordMessage', { show: showPasswordMessage })}>
                    {passwordValid ? (
                        <>
                            <span style={{ color: 'green', marginRight: '5px' }}>✔</span>
                            비밀번호 조건이 충족되었습니다.
                        </>
                    ) : "비밀번호는 8자리 이상이며 알파벳 대소문자, 숫자, 특수문자를 혼합해야 합니다."}
                </div>
                <input
                    className={styles.inputForm}
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <div className={styles.tosAgree}>
                    <input
                        type="checkbox"
                        id="tos"
                        name="tos"
                        checked={tosAgree}
                        onChange={handleTosAgreeChange}
                    />
                    <label htmlFor="tos">이용약관 개인정보 수집 및 정보 이용에 동의합니다.</label>
                </div>
                <div className={styles.loginFooter} style={{ justifyContent: 'flex-end' }}>
                    <button className={styles.loginButton}>계정 등록</button>
                </div>
            </div>
        </div>
    );
}