import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ExpenseContextProvider from './store/ExpenseContextProvider'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ExpenseContextProvider>
        <App />
    </ExpenseContextProvider>
)