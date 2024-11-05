import styles from '../styles/Portfolio.module.css';
import AccountBalanceChart from '../components/AccountBalanceChart.tsx';
import PortfolioDonutChart from '../components/PortfolioDonutChart.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom 사용
import { useRecoilValue } from 'recoil';
import { currencyState } from '../store/currencyState.ts';
import classNames from 'classnames';

export default function Portfolio() {
  const [criterion, setCriterion] = useState('evaluation');
  const navigate = useNavigate(); // navigate 설정
  const currency = useRecoilValue(currencyState); // 현재 선택된 화폐 단위

  // 환율 정보 (예시로 1 USD = 1,200 KRW 설정)
  const exchangeRates = {
    USD: 1,
    KRW: 0.00083, // 1 KRW = 0.00083 USD
  };

  // 화폐 기호 설정
  const currencySymbols = {
    USD: '$',
    KRW: '₩',
  };

  // 가격 변환 함수 (원래 통화에서 사용자 선택 통화로 변환)
  const convertPrice = (price, fromCurrency) => {
    const rate = exchangeRates[fromCurrency] / exchangeRates[currency];
    return price * rate;
  };

  // 포트폴리오 데이터 (각 종목마다 화폐 단위 포함)
  const portfolioData = [
    {
      name: 'Apple',
      quantity: 10,
      purchasePrice: 150,
      currentPrice: 170,
      change: '+13.33%',
      totalValue: 1700,
      currency: 'USD',
    },
    {
      name: 'Samsung Electronics',
      quantity: 20,
      purchasePrice: 70000,
      currentPrice: 75000,
      change: '+7.14%',
      totalValue: 1500000,
      currency: 'KRW',
    },
    {
      name: 'Microsoft',
      quantity: 5,
      purchasePrice: 300,
      currentPrice: 310,
      change: '+3.33%',
      totalValue: 1550,
      currency: 'USD',
    },
    {
      name: 'LG Chem',
      quantity: 10,
      purchasePrice: 800000,
      currentPrice: 820000,
      change: '+2.50%',
      totalValue: 8200000,
      currency: 'KRW',
    },
    {
      name: 'Tesla',
      quantity: 4,
      purchasePrice: 800,
      currentPrice: 850,
      change: '+6.25%',
      totalValue: 3400,
      currency: 'USD',
    },
  ];

  // 최근 거래 데이터 (각 거래마다 화폐 단위 포함)
  const recentTransactions = [
    {
      date: '2024-10-15',
      name: 'Apple',
      type: '매수',
      quantity: 5,
      price: 160,
      currency: 'USD',
    },
    {
      date: '2024-10-16',
      name: 'Samsung Electronics',
      type: '매도',
      quantity: 10,
      price: 74000,
      currency: 'KRW',
    },
    {
      date: '2024-10-18',
      name: 'Microsoft',
      type: '매수',
      quantity: 2,
      price: 305,
      currency: 'USD',
    },
    {
      date: '2024-10-20',
      name: 'LG Chem',
      type: '매도',
      quantity: 5,
      price: 810000,
      currency: 'KRW',
    },
    {
      date: '2024-10-22',
      name: 'Tesla',
      type: '매수',
      quantity: 1,
      price: 845,
      currency: 'USD',
    },
  ];

  // 포트폴리오 총 가치 계산
  const totalPortfolioValue = portfolioData.reduce((sum, item) => {
    const convertedValue = convertPrice(item.totalValue, item.currency);
    return sum + convertedValue;
  }, 0);

  // 보유 종목 수 계산
  const totalHoldings = portfolioData.length;

  return (
    <div className={styles.portfolioWrapper}>
      <div className={styles.portfolioContainer}>
        <div>
          <h2>포트폴리오 구성</h2>
          <section className={styles.sectionWrapper}>
            <div className={styles.criterions}>
              <span
                className={classNames({
                  [styles.activatedCriterion]: criterion === 'evaluation',
                  [styles.deactivatedCriterion]: criterion !== 'evaluation',
                })}
                onClick={() => setCriterion('evaluation')}
              >
                평가금액 비중
              </span>
              <span
                className={classNames({
                  [styles.activatedCriterion]: criterion === 'bid',
                  [styles.deactivatedCriterion]: criterion !== 'bid',
                })}
                onClick={() => setCriterion('bid')}
              >
                매수금액 비중
              </span>
            </div>
            <div style={{ flex: 100 }}>
              <PortfolioDonutChart />
            </div>
          </section>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2>투자 상품 목록</h2>
            <button
              className={styles.editButton}
              onClick={() => navigate('/portfolio/edit')} // 클릭 시 이동
            >
              종목 편집
            </button>
          </div>
          <section
            className={styles.sectionWrapper}
            style={{ height: '300.7px' }}
          >
            <table className={styles.portfolioTable}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th>종목</th>
                  <th>보유수량</th>
                  <th>구매가</th>
                  <th>현재가</th>
                  <th>변동</th>
                  <th>총가치</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((item, index) => (
                  <tr key={index} className={styles.tableData}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {currencySymbols[currency]}
                      {convertPrice(
                        item.purchasePrice,
                        item.currency,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      {currencySymbols[currency]}
                      {convertPrice(
                        item.currentPrice,
                        item.currency,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={
                        item.change.startsWith('+')
                          ? styles.positiveChange
                          : styles.negativeChange
                      }
                    >
                      {item.change}
                    </td>
                    <td>
                      {currencySymbols[currency]}
                      {convertPrice(
                        item.totalValue,
                        item.currency,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <div className={styles.portfolioContainer}>
        <section
          className={styles.sectionWrapper}
          style={{ alignItems: 'flex-start' }}
        >
          <span className={styles.summaryLabel}>포트폴리오 총 가치</span>
          <span className={styles.summaryMoney}>
            {currencySymbols[currency]}
            {totalPortfolioValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </section>
        {/* 일일 수익 및 총 수익은 예시 값으로 설정 */}
        <section
          className={styles.sectionWrapper}
          style={{ alignItems: 'flex-start' }}
        >
          <span className={styles.summaryLabel}>일일 수익</span>
          <span className={styles.summaryMoney}>
            {currencySymbols[currency]}
            {convertPrice(1000, 'USD').toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </section>
        <section
          className={styles.sectionWrapper}
          style={{ alignItems: 'flex-start' }}
        >
          <span className={styles.summaryLabel}>총 수익</span>
          <span className={styles.summaryMoney}>
            {currencySymbols[currency]}
            {convertPrice(1000, 'USD').toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </section>
        <section
          className={styles.sectionWrapper}
          style={{ alignItems: 'flex-start' }}
        >
          <span className={styles.summaryLabel}>보유 종목 수</span>
          <span className={styles.summaryMoney}>{totalHoldings}</span>
        </section>
      </div>
      <div className={styles.portfolioContainer}>
        <div>
          <h2>포트폴리오 성과</h2>
          <section
            className={styles.sectionWrapper}
            style={{ height: '300.7px' }}
          >
            <AccountBalanceChart />
          </section>
        </div>
        <div>
          <h2>최근 거래</h2>
          <section
            className={styles.sectionWrapper}
            style={{ height: '300.7px' }}
          >
            <table className={styles.portfolioTable}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th>날짜</th>
                  <th>종목</th>
                  <th>유형</th>
                  <th>수량</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction, index) => (
                  <tr key={index} className={styles.tableData}>
                    <td>{transaction.date}</td>
                    <td>{transaction.name}</td>
                    <td
                      className={
                        transaction.type === '매수'
                          ? styles.buyType
                          : styles.sellType
                      }
                    >
                      {transaction.type}
                    </td>
                    <td>{transaction.quantity}</td>
                    <td>
                      {currencySymbols[currency]}
                      {convertPrice(
                        transaction.price,
                        transaction.currency,
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}
