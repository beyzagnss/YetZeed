// Default categories tailored for mushroom farming
const defaultIncomes = [
  { id: 1, name: 'Taze Mantar Satışı', amount: 0 },
  { id: 2, name: 'Tohum / Misel Satışı', amount: 0 },
  { id: 3, name: 'Eğitim / Danışmanlık', amount: 0 }
];

const defaultExpenses = [
  { id: 1, name: 'Tohum / Misel Alımı', amount: 0 },
  { id: 2, name: 'Elektrik', amount: 0 },
  { id: 3, name: 'Su', amount: 0 },
  { id: 4, name: 'Kira', amount: 0 },
  { id: 5, name: 'Kompost / Hammadde', amount: 0 },
  { id: 6, name: 'Ambalaj / Paketleme', amount: 0 },
  { id: 7, name: 'Pazarlama / Reklam', amount: 0 }
];

const defaultDebts = [
  { id: 1, name: 'KOSGEB / Banka Kredisi', amount: 0 },
  { id: 2, name: 'Kredi Kartı', amount: 0 },
  { id: 3, name: 'Ekipman Taksidi', amount: 0 }
];

export const getMonthlyData = (userId = 'default', year, month) => {
  const key = `finance_data_${userId}_${year}_${month}`;
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return {
    incomes: [...defaultIncomes.map(item => ({ ...item }))],
    expenses: [...defaultExpenses.map(item => ({ ...item }))],
    debts: [...defaultDebts.map(item => ({ ...item }))]
  };
};

export const saveMonthlyData = (userId = 'default', year, month, data) => {
  const key = `finance_data_${userId}_${year}_${month}`;
  localStorage.setItem(key, JSON.stringify(data));
};

export const getAnnualTotals = (userId = 'default', year) => {
  let annualIncome = 0;
  let annualExpense = 0;
  let annualDebt = 0;
  
  for(let m = 1; m <= 12; m++) {
    const data = getMonthlyData(userId, year, m);
    annualIncome += data.incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    annualExpense += data.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    annualDebt += data.debts.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }
  
  return {
    annualIncome,
    annualExpense, 
    annualDebt,
    netProfit: annualIncome - annualExpense - annualDebt
  };
};
