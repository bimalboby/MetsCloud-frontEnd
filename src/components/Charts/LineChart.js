/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ lineChartData, lineChartOptions } ) => {
  const [chartData, setChartData] = useState([])
  const [chartOptions, setChartOptions] = useState({})
  const [datachanger, setDatachanger] = useState(false)

  useEffect(() => {
    setChartData(lineChartData)
    setChartOptions(lineChartOptions)
  }, [lineChartData,lineChartOptions])

  useEffect(() => {
    setInterval(() => {
      setDatachanger(pre=>!pre)
    }, 5000);
  }, [])
  
  
  return (
    <ReactApexChart
        options={chartOptions}
        series={chartData}
        type='line'
        width='100%'
        height='100%'
      />
  )
}

export default LineChart
