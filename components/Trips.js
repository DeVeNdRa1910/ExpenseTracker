import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import ExpenseContext from '../store/ExpenseContext';
import { useForm } from 'react-hook-form';

function Trips() {
  const [trips, setTrips] = useState([]);
  const [prevData, setPrevData] = useState({
    place: '',
    numberOfPersons: '',
    totalExpense: ''
  });

  const { getTrips, remove, isAdd, isEdit, setIsEdit, getTrip, update } = useContext(ExpenseContext);

  useEffect(() => {
    async function fetchData() {
      const temp = await getTrips();
      setTrips(temp);
    }
    fetchData();
  }, [isAdd, isEdit]);


  const updateHandler = async (id) => {
    setIsEdit(true); 
    const data = await getTrip(id); 
    setPrevData(data); 
  };


  const { register, handleSubmit, setValue } = useForm();


  const onUpdateHandler = async (data) => {
    const newTrip = {
      id: prevData.id,
      ...data
    };
    await update(prevData.id, newTrip);
    setIsEdit(false);
  };


  useEffect(() => {
    if (isEdit) {
      setValue("place", prevData.place || "");
      setValue("numberOfPersons", prevData.numberOfPersons || "");
      setValue("totalExpense", prevData.totalExpense || "");
    }
  }, [isEdit, prevData, setValue]);

  return (
    <div>
      {/* Display trip details */}
      {trips.map((item) => (
        <div key={item.id}>
          <h1>{item.place}</h1>
          <h3>Number of Persons: {item.numberOfPersons}</h3>
          <h3>Total Expense: {item.totalExpense}₹</h3>
          <h3>You should received: {item.totalExpense - (item.totalExpense/item.numberOfPersons)}</h3>
          <div>
            <button onClick={() => remove(item.id)}>Delete</button>
            <button onClick={() => updateHandler(item.id)}>Edit</button>
          </div>
        </div>
      ))}

      {/* Render form if in edit mode */}
      {isEdit && (
        <div>
          <form onSubmit={handleSubmit(onUpdateHandler)}>
            <div>
              <label>Trip Place: </label>
              <input
                type="text"
                id="place"
                {...register("place")}
                placeholder="Kashmir"
              />
            </div>
            <div>
              <label>Number Of Persons: </label>
              <input
                type="number"
                id="numberOfPersons"
                {...register("numberOfPersons")}
                placeholder="4"
              />
            </div>
            <div>
              <label>Total Expense: </label>
              <input
                type="number"
                id="totalExpense"
                {...register("totalExpense")}
                placeholder="10000"
              />
            </div>
            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Trips;
