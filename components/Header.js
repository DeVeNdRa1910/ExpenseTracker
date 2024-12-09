import React, { useEffect, useState } from 'react'
import ExpenseContext from '../store/ExpenseContext'
import { useContext } from 'react'

function Header() {
  const [trips, setTrips] = useState([])
  const {getTrips, isEdit, isAdd} = useContext(ExpenseContext)
  useEffect(() => {
    async function fetchData() {
      const temp = await getTrips();
      setTrips(temp);
    }
    fetchData();
    
  }, [isAdd, isEdit]);
  console.log(trips);
  let credit = 0;
  let debit = 0;
  trips.forEach(item => {
    credit = credit + (item.totalExpense - (item.totalExpense/item.numberOfPersons))
  })
  trips.forEach(item=> {
    debit = debit+item.totalExpense
  })
  return (
    <div>
      <div>
        <span>Total Expense: {debit}</span>
        <span>Income: {credit}</span>
      </div>
    </div>
  )
}

export default Header