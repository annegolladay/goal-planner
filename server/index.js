const express = require("express")
const app = express()
const fetch = require('./fetch')
const cors = require("cors")
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json()) //req.body

//ROUTES//

//get current bitcoin price

app.get('/api/bitcoin/current_price', cors(), (req, res) => {
    fetch.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => {
        // save this data in database
        console.log('here')
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})

app.post("/prediction", async (req, res) => {
    try {
        const { date, price, predicted_price, notes } = req.body
        const newPrediction = await pool.query(
            "INSERT INTO predictions (date, price, predicted_price, notes) VALUES($1, $2, $3, $4) RETURNING *",
            [date, price, predicted_price, notes]
        )

        res.json(newPrediction.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create a todo

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )

        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get all todos

app.get("/predictions", async (req, res) => {
    try {
      const allPredictions = await pool.query("SELECT * FROM predictions")
        res.json(allPredictions.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
            id
    ])

        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        )

        res.json("Todo was updated!")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
            id
        ])
        res.json("Todo was deleted!")
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})