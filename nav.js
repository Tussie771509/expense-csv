// Navigate to Dashboard
function goToDashboard() {
  window.location.href = '/dashboard';
}

// Display user-specific data
async function displayExpenses() {
  const response = await fetch('/api/expenses');
  const expenses = await response.json();

  const expensesContainer = document.getElementById('expenses');
  expenses.forEach(expense => {
    const expenseItem = document.createElement('div');
    expenseItem.textContent = `${expense.date}: ${expense.amount} - ${expense.description}`;
    expensesContainer.appendChild(expenseItem);
  });
}
