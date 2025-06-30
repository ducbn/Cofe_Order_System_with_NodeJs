import React, { useState } from 'react'
import './Routeselector.css'
import * as apiCall from './routeApifunc'
import BusList from '../BusList/BusList'

export default function Routeselector() {
    const [dataInp, setData] = useState([])
    const [startCity, setStartCity] = useState('')
    const [destination, setDestination] = useState('')

    const handleToCity = (e) => {
        const value = e.target.value
        setDestination(value)
        localStorage.setItem("destination", value)
    }

    const handleFromCity = (e) => {
        const value = e.target.value
        setStartCity(value)
        localStorage.setItem("startCity", value)
    }

    const handleDate = (e) => {
        const value = e.target.value
        localStorage.setItem("date", value)
    }

    const getRoutes = (e) => {
        e.preventDefault()
        if (!startCity || !destination) {
            alert("Vui lòng chọn đầy đủ điểm đi và điểm đến.")
            return
        }

        apiCall.getRoutesFromApi(startCity, destination)
            .then(response => response.data)
            .then(data => {
                setData(data.buses || [])
            })
            .catch(err => {
                console.error("API Error:", err)
                alert("Có lỗi xảy ra khi tìm chuyến xe.")
            })
    }

    const renderBusList = () => {
        if (Array.isArray(dataInp) && dataInp.length > 0) {
            return <BusList value={dataInp} />
        }
        return <p style={{ marginTop: "20px" }}>Không tìm thấy tuyến xe phù hợp.</p>
    }

    return (
        <div className="rdc">
            <div className="main-container">
                <form className="form-inline" onSubmit={getRoutes}>
                    <select className="selectpicker" onChange={handleFromCity} value={startCity}>
                        <option value="">Chọn điểm đi</option>
                        <option>Hà Nội</option>
                        <option>TP.HCM</option>
                        <option>Đà Nẵng</option>
                        <option>Hải Phòng</option>
                        <option>Huế</option>
                        <option>Buôn Ma Thuột</option>
                        <option>Vũng Tàu</option>
                        <option>Cần Thơ</option>
                        <option>Nam Định</option>
                        <option>Lào Cai</option>
                    </select>

                    <select className="selectpicker" onChange={handleToCity} value={destination}>
                        <option value="">Chọn điểm đến</option>
                        <option>Đà Nẵng</option>
                        <option>TP.HCM</option>
                        <option>Hà Nội</option>
                        <option>Quảng Ninh</option>
                        <option>Gia Lai</option>
                        <option>Nha Trang</option>
                        <option>Long An</option>
                        <option>Huế</option>
                        <option>Hà Tĩnh</option>
                        <option>Vinh</option>
                    </select>

                    <input onChange={handleDate} type="date" className="date-picker" />

                    <input type="submit" className="btn btn-primary btn-md getRoute" value="Tìm tuyến xe" />
                </form>

                <div>
                    {renderBusList()}
                </div>
            </div>
        </div>
    )
}
