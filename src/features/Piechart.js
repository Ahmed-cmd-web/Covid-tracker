/** @format */

import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { info } from "./reducer";

const Piechart = () => {
  const state = useSelector(info);

  const data = {
    labels: ["Cases", "Deaths", "Recoverd"],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          state.data[1]?.cases,
          state.data[1]?.deaths,
          state.data[1]?.recovered,
        ],
        backgroundColor: ["lightcoral", "black", "lightgreen"],
        hoverOffset: 1,
      },
    ],
  };
  const config = {
    type: "pie",
    data: data,
  };
  return (
    <Pcontainer>
      <Pie data={data} options={config} />
    </Pcontainer>
  );
};

const Pcontainer = styled.div`
@media only screen and (min-width: 1001px) {
  width: 50%;
  height: 10%;}
  @media only screen and (max-width: 1000px) {
    width: auto;
    height: 50vh;
    display: flex;
  }
`;

export default Piechart;
