import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const PortfolioDonutChart = () => {
  // 초기 시리즈와 애니메이션 후 시리즈
  const initialSeries = [1, 1, 1, 1];
  const finalSeries = [40, 30, 20, 10]; // 각각의 자산 비율

  const [series, setSeries] = useState(initialSeries);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeries(finalSeries); // 애니메이션 후 실제 값으로 변경
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // 차트 옵션
  const options = {
    chart: {
      type: 'donut',
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
    theme: {
      palette: 'palette3', // ApexCharts의 내장 색상 팔레트 중 하나를 사용
    },
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="donut" width="400" />;
};

export default PortfolioDonutChart;
