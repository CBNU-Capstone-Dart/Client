import { useState } from 'react';
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <h2>로그인</h2>
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
                />
                <div className={styles.loginFooter}>
                    <Link to='/signup'>계정 만들기</Link>
                    <button className={styles.loginButton}>로그인</button>
                </div>
            </div>
        </div>
    );
}