import React from 'react';
import DashboardCard from './DashboardCard';
import { Area, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StationPieChart from './StationPieChart';

const dashboardCard = [
    {
        name: "Total Tickets",
        quantity: "714K",
        path: "M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z",
        gStop1: "3eb98f",
        gStop2: 'eefee7',
        id: "gradient1"
    },
    {
        name: "Total User",
        quantity: "714K",
        path: "M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z",
        gStop1: 'c084fc',
        gStop2: 'f2e6fe',
        id: "gradient2"
    },
    {
        name: "Total Train",
        quantity: "714K",
        path: "M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 128c0-17.7 14.3-32 32-32h80c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM272 96h80c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H272c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32zM64 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm288-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z",
        gStop1: "f8b320",
        gStop2: 'fdefce',
        id: "gradient3"
    },
]

const data = [
    {
        name: "2023",
        ticket: 590,
        user: 1400,
    },
    {
        name: "Feb 03",
        ticket: 868,
        user: 1506,
    },
    {
        name: "Mar 03",
        ticket: 1397,
        user: 989,
    },
    {
        name: "Apr 03",
        ticket: 1480,
        user: 1228,
    },
    {
        name: "May 03",
        ticket: 1520,
        user: 1100,
    },
    {
        name: "Jun 03",
        ticket: 1400,
        user: 1700,
    },
]

const DashboardPage = () => {
    return (
        <div className='mt-8 space-y-6 min-h-screen'>
            <div className='text-3xl font-bold'>
                <h2>Dashboard</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center w-full gap-6'>
                {
                    dashboardCard.map((item, i) => <DashboardCard item={item} key={i}></DashboardCard>)
                }
            </div>
            <div className='flex flex-col lg:flex-row w-full gap-8'>
                <div className='rounded-xl shadow-md bg-[#f9fafb] py-8 lg:py-10 md:px-8 lg:px-12 grow'>
                    <div className='text-xl font-semibold text-gray-600 mb-6'>
                        <h3>Number of User & Ticket sells</h3>
                    </div>
                    <div>
                        <ResponsiveContainer width="100%" height={400}>
                            <ComposedChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                }}
                            >
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fff3da" />
                                        <stop offset="95%" stopColor="#fffefd" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="name" axisLine={false} />
                                <YAxis axisLine={false} />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="user"
                                    fill="url(#colorUv)"
                                    stroke="#ff7300"
                                    strokeWidth={3}
                                />
                                <Line type="monotone" dataKey="ticket" stroke="#00b8d9" strokeWidth={3} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='rounded-xl shadow-md bg-[#f9fafb] py-8 lg:py-10 md:px-8 lg:px-12 '>
                    <div className='text-xl font-semibold text-gray-600 mb-6'>
                        <h3>Top-selling station.</h3>
                    </div>
                    <StationPieChart />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;