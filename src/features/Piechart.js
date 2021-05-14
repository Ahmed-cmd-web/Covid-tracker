/** @format */

import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { info } from "./reducer";

const Piechart = () => {
  const state = useSelector(info);

  const data = {
    labels: [
      `Cases:${((state.data[1]?.cases / 7200000000) * 100).toFixed(3)}`,
      `Deaths:${((state.data[1]?.deaths / 7200000000) * 100).toFixed(3)}`,
      `Recovered:${((state.data[1]?.recovered / 7200000000) * 100).toFixed(3)}`,
      `Uninfected:${(
        ((7200000000 - state.data[1]?.cases) / 7200000000) *
        100
      ).toFixed(3)}`,
    ],
    datasets: [
      {
        label: "Worldwide statistics",
        data: [
          state.data[1]?.cases,
          state.data[1]?.deaths,
          state.data[1]?.recovered,
          7200000000 - state.data[1]?.cases,
        ],
        backgroundColor: ["lightcoral", "black", "lightgreen", "white"],
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
      <h2>Worldwide Coronavirus statistics</h2>
      <Pie data={data} options={config}  />
    </Pcontainer>
  );
};

const Pcontainer = styled.div`
  @media only screen and (min-width: 1001px) {
    width: 50%;
    height: 10%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  @media only screen and (max-width: 1000px) {
    width: auto;
    height: 70vh;
    margin-bottom: 90px;
  }
  @media only screen and (max-height: 550px) {
    width: auto;
    height: 70vh;
    margin-bottom: 300px;
  }
`;

export default Piechart;
