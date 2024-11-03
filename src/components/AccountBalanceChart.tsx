import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const AccountBalanceChart = () => {
  // 임의의 데이터 생성
  const data = [];
  const numberOfDays = 30;
  let balance = 1000; // 시작 금액

  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - numberOfDays + 1
  );

  for (let i = 0; i < numberOfDays; i++) {
    // 일일 금액 변동을 시뮬레이션
    const dailyChange = (Math.random() - 0.5) * 20; // -10에서 +10 사이의 변동
    balance += dailyChange;
    data.push({
      x: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000),
      y: parseFloat(balance.toFixed(2)),
    });
  }

  // 초기 시리즈와 애니메이션 후 시리즈
  const initialSeriesData = data.map((point) => ({ x: point.x, y: 0 })); // y값이 0인 초기 데이터
  const finalSeriesData = data; // 실제 데이터

  const [series, setSeries] = useState([
    {
      name: '금액',
      data: initialSeriesData,
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeries([
        {
          name: '금액',
          data: finalSeriesData,
        },
      ]);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false, // 툴바 숨기기
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800, // 애니메이션 속도 조정 (밀리초 단위)
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MM/dd',
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        width="400px"
        height="270px"
      />
    </div>
  );
};

export default AccountBalanceChart;