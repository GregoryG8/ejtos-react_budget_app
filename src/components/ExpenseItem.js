
import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import { createSvgIcon } from '@mui/material/utils';
import RemoveIcon from '@mui/icons-material/Remove';
const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);
    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };
    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };
        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    const decreaseAllocation = (name) => {
        dispatch({
            type: 'MINUS_EXPENSE',
            payload: { name, cost: 10 }
        });
    };

    const PlusIcon = createSvgIcon(
        // credit: plus icon from https://heroicons.com/
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>,
        'Plus',
      );

    
    return (
        <tr>
        <td >{props.name}</td>
        <td>{currency}{props.cost}</td>
        <td style={{ textAlign: "center", verticalAlign: "middle", width: "200px" }}><button style={{border: "none", backgroundColor: "transparent"}} onClick={event=> increaseAllocation(props.name)}><PlusIcon /></button></td>
        <td style={{ textAlign: "center", verticalAlign: "middle", width: "200px" }}><button style={{border: "none", backgroundColor: "transparent"}} onClick={event=> decreaseAllocation(props.name)}><RemoveIcon /></button></td>
        <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};
export default ExpenseItem;