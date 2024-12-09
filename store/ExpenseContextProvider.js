import React, { useState } from 'react'
import ExpenseContext from './ExpenseContext'
import axios from 'axios'


function ExpenseContextProvider({children}) {
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)


    async function  getTrips() {
      const resp = await axios.get('http://localhost:4000/trips')
      return resp.data
    }

    async function addTrip(trip) {
      await axios.post('http://localhost:4000/trips', trip)
      setIsAdd(false)
    }

    async function remove(id){
      await axios.delete(`http://localhost:4000/trips/${id}`)
    }

    async function update(id, newTrip){
      await axios.put(`http://localhost:4000/trips/${id}`, newTrip)
    }

    async function getTrip(id){
      const resp = await axios.get(`http://localhost:4000/trips/${id}`)
      return resp.data
    }

    const contextValue = {isAdd, setIsAdd, isEdit, setIsEdit, getTrips, addTrip, remove, update, getTrip}

  return (
    <ExpenseContext.Provider value={contextValue}>
        {children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseContextProvider