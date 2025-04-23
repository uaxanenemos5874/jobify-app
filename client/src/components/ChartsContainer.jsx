import { useState } from "react";

import Wrapper from "../assets/wrappers/ChartsContainer";
import AreaChartComponent from "./AreaChart";
import BarChartComponent from "./BarChart";

function ChartsContainer({ data }) {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)} title="Toggle Chart-Type?">
        {barChart ? "Area Chart 📈" : "Bar Chart 📊"}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
}

export default ChartsContainer;
