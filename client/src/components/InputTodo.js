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
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" class=" img-fluid" alt="Responsive image" style={{width: "100px"}} />
            <h1 className="mt-5 display-4">Bit Predict</h1>
            <div className="text-center mt-5 display-5">
                <span>{ chartName } current price: $ {price}</span>
            </div>
            <form className="d-flex text-center flex-column mt-5 justify-content-center" onSubmit={onSubmitForm}>
                <input
                type="text"
                className="text-center form-control justify-content-center align-self-center w-50 mt-1"
                value={predictedPrice}
                placeholder="Guess tomorrow's price"
                onChange={e => setPredictedPrice(e.target.value)}
                />
                <input
                type="text-area"
                className="text-center form-control justify-content-center align-self-center w-50 mt-1"
                placeholder="Add notes"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <div className="w-100 mt-1">
                    <button className="text-center btn btn-success btn-sm">Add</button>
                </div>
            </form>
        </Fragment>
    )
}

export default InputTodo