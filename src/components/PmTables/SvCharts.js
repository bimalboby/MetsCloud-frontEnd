import { Grid } from "@chakra-ui/react";
import LineChartCard from "Comp/Charts/LineChartCard/LineChartCard";
import Axios from "Config/Axios/Axios";
import React, { useEffect, useState } from "react";

const SvCharts = () => {
    const [charts, setCharts] = useState([])

    useEffect(() => {
        const getchart = async() => {
            const res = await Axios.post("/iiot-chart")
            console.log(res.data);
            setCharts(res.data);
          }
          if(charts!=[])
          getchart()
    }, [])

    return (
    <Grid
      templateColumns={{ sm: "1fr", md: "1fr 1fr", "2xl": "2fr 1.2fr 1.5fr" }}
      my="26px"
      gap="18px"
    >
      {
        charts.map((chart)=>(
            <LineChartCard lineChartDataDashboard={chart.chartdata.dataArray} lineChartOptionsDashboard={chart.chartoption} />
        ))
      }
    </Grid>
  )
};

export default SvCharts;
