import { atom } from 'recoil';

export const currencyState = atom({
  key: 'currencyState',
  default: 'USD', // 기본 화폐 단위
});
