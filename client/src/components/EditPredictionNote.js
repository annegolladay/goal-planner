import React, { Fragment, useState } from "react"
import { sortData } from '../utils/utils'
import "./ListPrediction.css"

const EditPredictionNote = ({ prediction, setPredictions }) => {
    const [notes, setNotes] = useState(prediction.notes)

    const updateNotes = async e => {
        e.preventDefault()
        try {
            const body = { notes }
            const response = await fetch(
                `http://localhost:5000/predictions/${prediction.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            )
            const jsonData = await response.json()
            const sortedData = sortData(jsonData)
            setPredictions(sortedData)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <button
                type="button"
                class="btn btn-warning btn-outline-light btn-sm"
                data-toggle="modal"
                data-target={`#id${prediction.id}`}
            >
                Edit
            </button>

            {/* 
                id = id10
            */}
            <div
                class="modal"
                id={`id${prediction.id}`}
                onClick={() => setNotes(prediction.notes)}
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Note</h4>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                onClick={() => setNotes(prediction.notes)}
                            >
                                &times;
                            </button>
                        </div>

                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                            />
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-warning"
                                data-dismiss="modal"
                                onClick={e => updateNotes(e)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setNotes(prediction.notes)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditPredictionNote;