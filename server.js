const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')


app.use(cors())
app.use(express.json())


app.post("/customers", async (req, res) => {
    try {
        const { customer } = req.body;
        const {bank_acc} = req.body;
        const {bank_name} =  req.body;
        const {username} = req.body;
        const {password} = req.body;

        const newCustomer = await pool.query("INSERT INTO customers (customer, bank_acc, bank_name, username, password) VALUES($1, $2, $3, $4 ,$5) RETURNING *",
        [customer, bank_acc, bank_name, username, password])

        res.json(newCustomer)
    } catch (err) {
        throw new Error(err)
    }

})

app.get('/customers', async (req, res) => {
    try {
        const allCustomers = await pool.query("SELECT * FROM customers")
        res.json(allCustomers.rows)
    } catch (error) {
        throw new Error(error.message)
    }
})

app.get('/customers/:id', async (req, res) => {
    let request = await pool.query(`SELECT * FROM customers WHERE customer_id = ${req.params.id}`)
    res.send(request)
})


// app.put('/customers/:id', async (req, res) => {
//     try {
//         const {id} = req.params
//         const {customer} = req.body

//         const updatedCustomer = await pool.query("UPDATE customers SET customer = ($1) WHERE customer_id = ($2)",
//         [id, customer])
        
//         console.log("updated")
//         res.send("done")
//     } catch (error) {
//         throw Error(error.message)
//     }
// })

app.delete('/customers/:id', async (req, res) => {
        try {
            const {id} = req.params
            const {customer} = req.body
            const deleteCustomer = pool.query(`DELETE FROM customers WHERE customer_id = ${id}`)

        } catch (error) {
            throw new Error(error)
        }
})

app.listen(5000, () => {
    console.log("Connected !!!");
})