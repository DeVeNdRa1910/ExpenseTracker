import React from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid';
import ExpenseContext from '../store/ExpenseContext'

function AddForm() {
  const {register, handleSubmit} = useForm()

  const {addTrip} = useContext(ExpenseContext) 

  const onSubmitHandler = (data) => {
    const newTrip = {
      id: String(uuid()),
      totalExpense: totalExpense-0,
      ...data
    }
    addTrip(newTrip)
    console.log(newTrip);
  }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmitHandler)} >
            <div>
                <label>Trip Place: </label>
                <input type="text" id="place" {...register("place")} placeholder='Kashmir'/>
            </div>
            <div>
                <label>Number Of Persons: </label>
                <input type="number" id="numberOfPersons" {...register("numberOfPersons" , { valueAsNumber: true, })} placeholder='4'/>
            </div>
            <div>
                <label>Total Expense: </label>
                <input type="number" id="totalExpense" {...register("totalExpense" , { valueAsNumber: true, })} placeholder='10000'/>
            </div>
            <div>
              <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddForm