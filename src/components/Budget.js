import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Budget = () => {
  const { budget, expenses, dispatch, currency } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);
  const [localCurrency, setLocalCurrency] = useState(currency);

  useEffect(() => {
    setNewBudget(budget);
  }, [budget]);

  useEffect(() => {
    setLocalCurrency(currency);
  }, [currency]);

  const handleBudgetChange = (event) => {
    const value = Number(event.target.value);

    if (value > 20000) {
      alert("Budget cannot exceed £20,000.");
    } else {
      setNewBudget(value);
    }
  };

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setLocalCurrency(newCurrency);
    dispatch({ type: "CHG_CURRENCY", payload: newCurrency });
  };

  const handleBlur = () => {
    const totalExpenses = expenses.reduce(
      (total, item) => total + item.cost,
      0
    );
    if (newBudget < totalExpenses) {
      alert("You cannot reduce the budget value lower than the spending.");
    } else {
      dispatch({ type: "SET_BUDGET", payload: newBudget });
    }
  };

  return (
    <div className="alert alert-secondary">
      <span>Budget: </span>
      <input
        type="number"
        step="10"
        min={"0"}
        max={"20000"}
        value={newBudget}
        onChange={handleBudgetChange}
        onBlur={handleBlur}
      />
      <label htmlFor="currency">Currency: </label>
      <select id="currency" value={currency} onChange={handleCurrencyChange}>
        <option value="$">$ Dollar</option>
        <option value="£">£ Pound</option>
        <option value="€">€ Euro</option>
        <option value="₹">₹ Ruppee</option>
      </select>
    </div>
  );
};

export default Budget;
