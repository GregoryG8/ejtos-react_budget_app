import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState('');
    
    useEffect(() => {
        setNewBudget(budget);
    }, [budget]);

    const handleBudgetChange = (event) => {
        const value = Number(event.target.value);

         if (value > 20000) {
            alert("Budget cannot exceed £20,000.");
        } else {
            setNewBudget(value);
        }
    };

    const handleBlur = () => {
        const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
        if (newBudget < totalExpenses) {
            alert("You cannot reduce the budget value lower than the spending.");
            
        }else{
            dispatch({ type: 'SET_BUDGET', payload: newBudget });
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: £{budget}</span>
            <input 
                type="number" 
                step="10" 
                min={"0"}
                max={"20000"} 
                value={newBudget} 
                onChange={handleBudgetChange} 
                onBlur={handleBlur}
            />
        </div>
    );
};

export default Budget;
