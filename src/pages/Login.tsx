import { useState } from 'react';
import { useAuth } from './AuthContext.tsx';
import styles from "../styles/Login.module.css";
import classNames from 'classnames/bind';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';


const cx = classNames.bind(styles);

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { setToken } = useAuth(); // AuthContext에서 setToken 가져오기
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError(''); // 에러 메시지 초기화
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) setPasswordError(''); // 에러 메시지 초기화
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        // 입력 값 검증
        if (!email) {
            setEmailError("이메일을 입력해주세요.");
            return;
        }
        if (!password) {
            setPasswordError("비밀번호를 입력해주세요.");
            return;
        }

        try {
            // 로그인 API 호출
            const response = await axios.post('http://localhost:8000/login', { email, password });
            const token = response.data.access_token;

            // JWT 토큰 저장
            setToken(token); // AuthContext를 통해 토큰 설정 -> AutoContext.tsx 만듬
            localStorage.setItem('jwtToken', token); // 로컬 스토리지에 토큰 저장
            alert("로그인 성공");
            navigate("/");


        } catch (error) {
            // 에러 메시지 처리
            const errorMessage = error.response?.data?.detail || "로그인 실패";
            alert(errorMessage);
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <h2>로그인</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <input
                            id="email"
                            className={cx('inputForm', { 'inputError': emailError })}
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <div className={styles.errorMessage}>{emailError}</div>}
                    </div>
                    <div>
                        <input
                            id="password"
                            className={cx('inputForm', { 'inputError': passwordError })}
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
                    </div>
                    <div className={styles.loginFooter}>
                        <Link to='/signup'>계정 만들기</Link>
                        <button type="submit" className={styles.loginButton}>로그인</button>
                    </div>
                </form>
            </div>
        </div>
    );
}