import React, { Fragment, useEffect, useState } from "react"
import moment from 'moment';
import './ListPrediction.css';
import PredictionsChart from "./PredictionsChart";
import EditPredictionNote from "./EditPredictionNote"
import { sortData } from '../utils/utils'

const ListPredictions = () => {
    const [predictions, setPredictions] = useState([])
    const [chartData, setChartData] = useState({})

    //delete prediction function

    const deletePrediction = async id => {
        try {
            const deletePrediction = await fetch(`http://localhost:5000/predictions/${id}`, {
                method: "DELETE"
        })

            setPredictions(predictions.filter(prediction => prediction.id !== id))
        } catch (err) {
            console.error(err.message)
        }
    }

    const getPredictions = async () => {
        try {
            const response = await fetch("http://localhost:5000/predictions")
            const jsonData = await response.json()
            const sortedData = sortData(jsonData)

            setPredictions(sortedData)

            console.log('jsonData', jsonData)

            //constformatChartData(jsonData)
            
            const data = [
                {
                  id: "Price",
                  color: "hsl(302, 70%, 50%)",
                  data: [
                    {
                      x: "01/2/1990",
                      y: 45768.99
                    },
                    {
                      x: "01/3/1990",
                      y: 57890.56
                    }
                  ]
                },
                {
                  id: "Predicted_Price",
                  color: "hsl(302, 50%, 20%)",
                  data: [
                    {
                      x: "01/2/1990",
                      y: 45798.99
                    },
                    {
                      x: "01/3/1990",
                      y: 54210.56
                    }
                  ]
                } 
              ]
              console.log("set data", data)
            setChartData(data)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getPredictions()
    }, [])

    console.log("PREDICTIONS", predictions)

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Predicted Price</th>
                    <th>Notes</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {predictions?.map(prediction => (
                    <tr key={prediction.id}>
                    <td>{moment(prediction.date).format('ll')}</td>
                    <td>${prediction.price}</td>
                    <td>${prediction.predicted_price}</td>
                    <td>
                        <div>
                          {prediction.notes}
                          <EditPredictionNote 
                            class="Edit-Prediction-Note"
                            prediction={prediction} 
                            setPredictions={setPredictions} 
                          /> 
                        </div>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => deletePrediction(prediction.id)}
                        >
                            Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{height: '1000px', width: '1000px'}}>
              {/* {chartData && <PredictionsChart data={chartData} />} */}
            </div>
        </Fragment>
    )
}

export default ListPredictions