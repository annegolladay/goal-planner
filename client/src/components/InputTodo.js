import React, { Fragment, useState, useEffect } from "react"
import { api } from '../fetch/fetch'

const InputTodo = () => {
    const [description, setDescription] = useState("")
    const [currentPrice, setCurrentPrice] = useState({})
    const [predictedPrice, setPredictedPrice] = useState("")

    const { bpi, chartName, time} = currentPrice
    const price = bpi?.USD.rate

    useEffect(() => {
        api.get('/bitcoin/current_price')
        .then(res => {
          console.log(res)
          setCurrentPrice(res)
        })
    }, [])
  
    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { 
                date: time?.updated,
                price: price,
                predicted_price: predictedPrice,
                notes: description
            }
            const response = await fetch("http://localhost:5000/prediction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }
    

    return (
        <Fragment>
            <h1 className="text-center mt-5">Bit Predict</h1>
            <div>
                <span>{ chartName } current price: {price}</span>
            </div>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                type="text"
                className="form-control"
                value={predictedPrice}
                placeholder="Guess tomorrow's price"
                onChange={e => setPredictedPrice(e.target.value)}
                />
                <input
                type="text"
                className="form-control"
                placeholder="Add notes"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo