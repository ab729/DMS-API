const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')


app.use(cors())
app.use(express.json())


app.post("/customers", async (req, res) => {
    try {
        const {customer} = req.body;
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
        const allProductss = await pool.query("SELECT * FROM customers")
        res.json(allProductss)
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

app.delete('/customers/:id', (req, res) => {
        try {
            const {id} = req.params
            const {customer} = req.body
            const deleteCustomer = pool.query(`DELETE FROM customers WHERE customer_id = ${id}`)

        } catch (error) {
            throw new Error(error)
        }
})
/* ------------------------------- Products -------------------------------- */

app.get('/products', async (req, res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM products")
        res.json(allProducts.rows)
    } catch (error) {
        throw new Error(error.message)
    }
})

app.delete('/products/:id', (req, res) => {
    const {id} = req.params
    try {
        pool.query(`DELETE FROM products WHERE product_id = ${id}`)
    } catch (err) {
        throw new Error(err.message)
    }
})

/* ----------------------------- Suppliers ------------------------------------ */

app.get('/suppliers', async(req, res) => {
    try {
        const allSuppliers = await pool.query("SELECT * FROM suppliers")
        res.json(allSuppliers.rows)
    } catch (error) {
        throw new Error(error.message)
    }
})

app.post('/suppliers', async(req, res) => {
    const {supplier_name} = req.body
    const {contact_person} = req.body
    const {contact_email} = req.body
    const {contact_phone} = req.body

    try {
       await pool.query("INSERT INTO suppliers (supplier_name, contact_person, contact_email, contact_phone) VALUES($1, $2, $3, $4) RETURNING *",
        [supplier_name, contact_person, contact_email, contact_phone])
    } catch (error) {
        console.log(error.message);
    }

})

app.delete('/suppliers/:id', (req, res) => {
    try {
    const {id} = req.params
    pool.query(`DELETE FROM suppliers WHERE supplier_id = ${id}`)
    } catch(err) {
        throw new Error(err.message)
    }
})


app.listen(5000, () => {
    console.log("Connected !!!");
})