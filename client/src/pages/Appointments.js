import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'
const Appointments = () => {
    const [appointments, setAppointments] = useState([])
    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/user/user-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        /* {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.doctorId.firstName} {record.doctorId.lastName}
                </span>
            )
        }, */
        /* {
            title: 'Phone',
            dataIndex: 'phone',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.phone}
                </span>
            )
        }, */
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },


    ]

    return (
        <div>
            <Layout>
                <h1>Appointments list</h1>
                <Table dataSource={appointments} columns={columns}/>
            </Layout>
        </div>
    )
}

export default Appointments