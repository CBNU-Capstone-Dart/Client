import React from 'react';

import styles from '../styles/NavBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import cx from 'classnames';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className={styles.navBarWrapper}>
      <Link to="/">로고</Link>
      <div className={styles.links}>
        <Link
          to="/"
          className={cx({
            [styles.activatedLink]: location.pathname === '/',
            [styles.nonActivatedLink]: location.pathname !== '/',
          })}
        >
          홈
        </Link>
        <Link
          to="/news"
          className={cx({
            [styles.activatedLink]: location.pathname === '/news',
            [styles.nonActivatedLink]: location.pathname !== '/news',
          })}
        >
          뉴스
        </Link>
        <Link
          to="/market"
          className={cx({
            [styles.activatedLink]: location.pathname === '/market',
            [styles.nonActivatedLink]: location.pathname !== '/market',
          })}
        >
          시장
        </Link>
        <Link
          to="/portfolio"
          className={cx({
            [styles.activatedLink]: location.pathname === '/portfolio',
            [styles.nonActivatedLink]: location.pathname !== '/portfolio',
          })}
        >
          포트폴리오
        </Link>
        <button className={styles.searchButton}>
          <svg
            width="16"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" stroke="#a5afb9" stroke-miterlimit="10">
              <circle
                cx="10.389"
                cy="10.388"
                r="7.395"
                stroke-width="2.032"
              ></circle>
              <path
                d="m15.64 15.638 5.517 5.517"
                stroke-linecap="round"
                stroke-width="2.001"
              ></path>
            </g>
          </svg>
          <span style={{ marginLeft: '12px' }}>검색어를 입력해주세요</span>
        </button>
      </div>
      <Link to="/login">
        <button className={styles.loginButton}>로그인</button>
      </Link>
    </nav>
  );
}
