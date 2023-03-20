
import React,{useState,useEffect} from 'react'
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"


import axios from 'axios'


function Datas() { 
    const admin=localStorage.getItem("Admin")
    const adminT = JSON.parse(admin)
    const admintt=adminT.adminToken
const [data,setdata]=useState([])
const [month, setmonth] = useState(null)



useEffect(() => {
    let dates=[]
  const bookings=async()=>{
    const response=await axios.get(`/api/admin/bookings`,{ headers: { "Authorization": `Bearer ${admintt}` } })
    for(let i=1;i<=12;i++){
        const datas=response.data.filter((data)=>data.month===i)
    let date={month:i,count:datas.length}
dates.push(date)
    }
    setmonth(dates)
}
bookings()
 
}, [])
console.log(month?.map((data)=>data.count))

    const [chartdata, setchartdata] = useState({
        labels:["Jan","Feb","March","April","May","June","July","August","September","October","November","December"],
        datasets:[{
           label:"Bookings",
           data:[month?.map((data)=>data.count)],
        }]
       })
  return (
    <>
    {chartdata.datasets[0].data ?  <Bar  data={chartdata} />:""}
    
    </>
   
  )
}

export default Datas

