const cardContainer = document.querySelector('#container')
const credit = document.querySelector('.credit')
const debit = document.querySelector('.debit')
const updateFormContainer = document.querySelector('.updateFormContainer')
const updateTripFor = document.getElementById('update-trip-For')
const updateNumberOfPersons = document.getElementById('update-number-Of-Persons')
const updateTotalExpense = document.getElementById('update-total-Expense')
const updateSubmitBtn = document.getElementById("update-submit-btn")
const updateCancelBtn = document.getElementById("update-cancel-btn")

updateCancelBtn.addEventListener('click', ()=>{
    updateFormContainer.style.display="none"
})

var tripArr = [];

window.onload = showCards()


async function getter(){
    let resp = await axios.get("http://localhost:3000/trip")
    let tempArr = resp.data;
    if(tempArr.length>0)
        tripArr = [...tempArr]
}

async function showCards(){
    await getter()
    tripArr.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card w-[25vw] h-[28vh] h-auto basis-2/5 px-4 py-2 rounded-xl shadow-md shadow-blue-300 hover:shadow-blue-500 hover:shadow-2xl transition delay-150 '
        card.innerHTML = `
            <h1>Trip : <span>${item.tripFor}</span></h1>
            <h3>Number of persons :  <span>${item.numberOfPeople}</span></h3>
            <h3>Total Expense <span>₹${item.totalExpense}</span></h3>
            <h3>Expense per head <span>₹${(item.totalExpense / item.numberOfPeople).toFixed(2)}</span></h3>
            <h3>You Should Recieve <span>₹${(item.totalExpense - (item.totalExpense / item.numberOfPeople)).toFixed(2)}</span></h3>
            <div class="py-5 h-[4vh] w-full mt-2 flex items-center justify-around">
                <button class="deleteItem px-4 py-1 rounded-lg border border-red-500 text-red-500 hover:shadow-lg hover:shadow-red-600 transition delay-150" data-id="${item.id}">Delete</button>
                <button class="updateItem px-4 py-1 rounded-lg border border-green-500 text-green-500 hover:shadow-lg hover:shadow-green-600 transition delay-150" data-id="${item.id}">Edit</button>
            </div>
            
        `
        cardContainer.appendChild(card)
    });

    const deleteButtons = document.querySelectorAll('.deleteItem');
    deleteButtons.forEach(button => {
        button.addEventListener("click",() => {
            const itemId = button.getAttribute('data-id');
            deleteData(itemId);
        });
    });
    
    const updateButtons = document.querySelectorAll('.updateItem');
    updateButtons.forEach(button => {
        button.addEventListener("click",() => {
            updateFormContainer.style.display='block'
            const itemId = button.getAttribute('data-id');
            updateData(itemId);
        });
    });


    //calculate total credit 
    let totalCredit = tripArr.reduce((acc,curr)=> acc+(curr.totalExpense - (curr.totalExpense / curr.numberOfPeople)), 0)
    let totalDebit = tripArr.reduce((acc,curr)=> acc+(curr.totalExpense)-0, 0)


    credit.textContent = `Income : ₹${totalCredit.toFixed(2)}`
    debit.textContent = `Expense : ₹${totalDebit.toFixed(2)}`

}

// for mantain form
const addBtn = document.querySelector('.formButton');
const formContainer = document.querySelector('.formContainer');


addBtn.addEventListener('click', () => {
    if (formContainer.style.display === 'none') {
        formContainer.style.display = 'block';
    } else {
        formContainer.style.display = 'none';
    }
});

const tripFor = document.getElementById('trip-For')
const numberOfPersons = document.getElementById('number-Of-Persons')
const totalExpense = document.getElementById('total-Expense')
const submitBtn = document.getElementById("submit-btn")
const cancelBtn = document.getElementById("cancel-btn")

cancelBtn.addEventListener('click', ()=>{
    formContainer.style.display="none"
})

submitBtn.addEventListener('click', ()=>{

    const tripObj = {
        id: String(Date.now()),
        tripFor: tripFor.value,
        numberOfPeople: numberOfPersons.value-0,
        totalExpense: totalExpense.value-0,
    }

    async function addDataOnDB(){
        await axios.post("http://localhost:3000/trip", tripObj)
    }
    addDataOnDB()
})

async function deleteData(id){
    await axios.delete(`http://localhost:3000/trip/${id}`)
}

let tripObj = null;

async function updateData(id) {
    let index = tripArr.findIndex(item => item.id === id)
    if (index !== -1) {
        const resp = await axios.get(`http://localhost:3000/trip/${id}`)
        let oldData = resp.data
        updateTripFor.value = oldData.tripFor
        updateNumberOfPersons.value = oldData.numberOfPeople;
        updateTotalExpense.value = oldData.totalExpense;

        
        // if we change updateTripFor field
        updateTripFor.addEventListener('input', (e)=>{
            e.preventDefault()
            tripObj = {
                id: id,
                tripFor: updateTripFor.value,
                numberOfPeople: updateNumberOfPersons.value - 0,
                totalExpense: updateTotalExpense.value - 0
            }
        })

        // if we change updateNumberOfPersons field
        updateNumberOfPersons.addEventListener('input', (e)=>{
            e.preventDefault()
            tripObj = {
                id: id,
                tripFor: updateTripFor.value,
                numberOfPeople: updateNumberOfPersons.value - 0,
                totalExpense: updateTotalExpense.value - 0
            }
        })

        // if we change updateTotalExpense field
        updateTotalExpense.addEventListener('input', (e)=>{
            e.preventDefault()
            tripObj = {
                id: id,
                tripFor: updateTripFor.value,
                numberOfPeople: updateNumberOfPersons.value - 0,
                totalExpense: updateTotalExpense.value - 0
            }
        })
    }
}

updateSubmitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    if (tripObj) {
        const updatedData = await axios.put(`http://localhost:3000/trip/${tripObj.id}`, tripObj);
        await showCards()
    }

    window.location.href = "http://127.0.0.1:5500/index.html"

});