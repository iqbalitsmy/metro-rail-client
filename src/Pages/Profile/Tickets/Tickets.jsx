import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import canRefundTicket from './checkTime';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);

    // Station List data
    useEffect(() => {
        const fetchData = async () => {
            // Make a GET request with cookies using fetch
            try {
                const response = await axios.get('http://localhost:3001/api/v1/user-tickets', { withCredentials: true });
                // console.log(response.data);
                setTickets(response.data);
            } catch (error) {
                // setError(error.message || 'An error occurred');
                console.log("Error :", error)
            }
        }
        fetchData()
    }, [])

    const handleCancelTickets = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:3001/api/v1/cancel-ticket/${id}`,
                { payment: "request for refund" },
                { withCredentials: true } // This should be outside the request body
            );

            // console.log(response.data);
            console.log(response);

        } catch (error) {
            // setError(error.message || 'An error occurred');
            console.log("Error :", error)
        }
    }

    return (
        <div className="overflow-x-auto bg-white shadow-lg p-4 rounded-md">
            <h1 className='text-2xl font-medium mb-6'>Tickets</h1>
            <hr className='border-t border-[#e00] mb-6' />
            <table className="table-auto border-collapse w-full rounded-md">
                <thead className='bg-[#FFF2F2]'>
                    <tr className='h-16'>
                        <th className="border-l border-y px-4 py-2 text-left">Source</th>
                        <th className="border-y px-4 py-2 text-left">Destination</th>
                        <th className="border-y px-4 py-2 text-left">Num of Seat</th>
                        <th className="border-y px-4 py-2">Price</th>
                        <th className="border-y px-4 py-2">Date</th>
                        <th className="border-y px-4 py-2">Time</th>
                        <th className="border-y px-4 py-2 text-left">Payment Status</th>
                        <th className="border-r border-y px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        tickets.map(({ _id, fromStation, toStation, price, quantity, time, purchaseDate, payment }) => (
                            <tr className='border-b h-16' key={_id}>
                                <td className="border-l border-y px-4 py-2">{fromStation}</td>
                                <td className="border-y px-4 py-2">{toStation}</td>
                                <td className="border-y px-4 py-2">{quantity}</td>
                                <td className="border-y px-4 py-2">{price}৳</td>
                                <td className="border-y px-4 py-2 text-center">{dayjs(purchaseDate).format('YYYY-MM-DD')}</td>
                                <td className="border-y px-4 py-2 text-center">{dayjs(time).format('h:mm A')}</td>
                                <td className="border-y px-4 py-2">{payment} </td>
                                <td className="border-r border-y px-4 py-2 relative">
                                    {
                                        canRefundTicket(time) && payment === "Paid" ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCancelTickets(_id)}>Cancel Ticket</button> : ""
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Tickets;