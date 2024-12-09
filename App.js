import React, { useContext, useState } from 'react'
import Header from './components/Header'
import Trips from './components/Trips'
import AddForm from './components/AddForm'

import ExpenseContext from './store/ExpenseContext'



function App() {
  
  const {isAdd, setIsAdd, isEdit} = useContext(ExpenseContext)

  return (
    <div>
      <Header />
      <Trips />
      {isAdd && <AddForm />}
      <div>
        <button onClick={setIsAdd}>+</button>
      </div>
    </div>
  )
}

export default App