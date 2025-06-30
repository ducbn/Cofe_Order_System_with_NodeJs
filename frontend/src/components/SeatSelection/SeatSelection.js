import React, { useState } from 'react';
import { FaAngleDoubleDown } from "react-icons/fa";
import './Tab.css';

const seatList = [
    "1A","1B","1C","2A","2B","2C","3A","3B","3C","4A","4B","4C",
    "5A","5B","5C","6A","6B","6C","7A","7B","7C","8A","8B","8C",
    "9A","9B","9C","10A","10B","10C"
];
const reservedInit = ["1A", "2A", "2B", "3B", "4A", "5C", "6A", "7B", "7C", "8B", "9B", "9C"];

export default function SeatSelection() {
    const [reservedSeat] = useState(reservedInit);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [passengerData, setPassengerData] = useState({});
    const [arrowDown, setArrowDown] = useState(false);

    const handleSeatChange = (e) => {
        const seat = e.target.value;
        if (e.target.checked) {
            setSelectedSeats([...selectedSeats, seat]);
        } else {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
            setPassengerData(prev => {
                const copy = { ...prev };
                delete copy[seat];
                return copy;
            });
        }
    };

    const handleInputChange = (seat, field, value) => {
        setPassengerData(prev => ({
            ...prev,
            [seat]: { ...prev[seat], [field]: value }
        }));
    };

    const handleSubmitDetails = e => {
        e.preventDefault();
        setArrowDown(true);
        localStorage.setItem("reservedSeats", JSON.stringify(selectedSeats));
        localStorage.setItem("passengerData", JSON.stringify(passengerData));
        // console.log(selectedSeats, passengerData);
    };

    return (
        <div className="ss">
            <div className="row">
                <div className="column1">
                    <div className="plane">
                        <form>
                            <ol className="cabin fuselage">
                                {[...Array(10)].map((_, rowIdx) => (
                                    <li className={`row row--${rowIdx + 1}`} key={rowIdx}>
                                        <ol className="seats" type="A">
                                            {["A", "B", "C"].map(col => {
                                                const seat = `${rowIdx + 1}${col}`;
                                                return (
                                                    <li className="seat" key={seat}>
                                                        <input
                                                            type="checkbox"
                                                            id={seat}
                                                            value={seat}
                                                            disabled={reservedSeat.includes(seat)}
                                                            checked={selectedSeats.includes(seat)}
                                                            onChange={handleSeatChange}
                                                        />
                                                        <label htmlFor={seat}>{seat}</label>
                                                    </li>
                                                );
                                            })}
                                        </ol>
                                    </li>
                                ))}
                            </ol>
                        </form>
                    </div>
                </div>
                <div className="column2">
                    <div className="seatInfo">
                        <form className="form-group">
                            {selectedSeats.map(seat => (
                                <div key={seat} className="form seatfrm">
                                    <p className="text-capitalize text-center">Seat No: {seat}</p>
                                    <input
                                        className="form-control seatInp"
                                        type="text"
                                        name="passenger-name"
                                        placeholder="Enter Name"
                                        value={passengerData[seat]?.name || ""}
                                        onChange={e => handleInputChange(seat, "name", e.target.value)}
                                    />
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`gender-${seat}`}
                                            id={`male-${seat}`}
                                            value="Male"
                                            checked={passengerData[seat]?.gender === "Male"}
                                            onChange={e => handleInputChange(seat, "gender", e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={`male-${seat}`}>Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`gender-${seat}`}
                                            id={`female-${seat}`}
                                            value="Female"
                                            checked={passengerData[seat]?.gender === "Female"}
                                            onChange={e => handleInputChange(seat, "gender", e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={`female-${seat}`}>Female</label>
                                    </div>
                                </div>
                            ))}
                        </form>
                        <div>
                            <button onClick={handleSubmitDetails} className="btn btn-info seatBT">
                                Confirm Details
                            </button>
                        </div>
                        <div className={arrowDown ? "activeArrow2" : "nonActive"}>
                            <FaAngleDoubleDown />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
