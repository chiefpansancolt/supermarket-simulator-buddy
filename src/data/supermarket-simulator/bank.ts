import type { Bank, Loan } from "@/types";

const loans: Loan[] = [
  {
    dailyInterest: 0.01,
    originalAmount: 750,
    minTermLength: 5,
    maxTermLength: 25,
    storeLevel: 0,
  },
  {
    dailyInterest: 0.02,
    originalAmount: 2000,
    minTermLength: 5,
    maxTermLength: 25,
    storeLevel: 10,
  },
  {
    dailyInterest: 0.025,
    originalAmount: 5000,
    minTermLength: 5,
    maxTermLength: 25,
    storeLevel: 20,
  },
  {
    dailyInterest: 0.04,
    originalAmount: 15000,
    minTermLength: 5,
    maxTermLength: 25,
    storeLevel: 30,
  },
  {
    dailyInterest: 0.06,
    originalAmount: 50000,
    minTermLength: 5,
    maxTermLength: 25,
    storeLevel: 50,
  },
];

export const bank: Bank = {
  loans,
};
