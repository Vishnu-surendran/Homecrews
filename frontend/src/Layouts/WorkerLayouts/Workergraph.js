
import React,{useState,useEffect} from 'react'
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"




function Workergraph() { 

const [data,setdata]=useState([])
const [month, setmonth] = useState([])


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

export default Workergraph

