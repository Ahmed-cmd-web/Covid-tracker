/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info, reducer2 } from "./reducer";
import styled from "styled-components";
import Card from "./Card";
function Header() {
  const Formatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };
  const state = useSelector(info);
  const dispatch = useDispatch();
  const handle = (e) => {
    if (e.target.value === "Worldwide") {
      dispatch(reducer2(state.data[1]));
    } else {
      let index = state.data[0].findIndex((i) => i.country === e.target.value);
      dispatch(reducer2(state.data[0][index]));
    }
  };
  return (
    <Container>
      <Row>
        <h1>COVID-19 Tracker</h1>
        <select onChange={handle}>
          <option value="Worldwide" key="world">
            Worldwide
          </option>
          {state.data[0]?.map((i) => (
            <option value={i.country} key={i.country}>
              {i.country}
            </option>
          ))}
        </select>
      </Row>
      <Row>
        <Card
          topic="cases"
          title="Coronavirus Cases"
          pcolor="red"
          num={Formatter(state.selcted[0]?.todayCases)}
          sub={Formatter(state.selcted[0]?.cases)}
          sec="rgb(255, 107, 107)"
        />
        <Card
          topic="recovered"
          title="Recovered"
          pcolor="lightgreen"
          num={Formatter(state.selcted[0]?.todayRecovered)}
          sub={Formatter(state.selcted[0]?.recovered)}
          sec="rgb(143, 253, 143)"
        />
        <Card
          topic="deaths"
          title="Deaths"
          pcolor="black"
          num={Formatter(state.selcted[0]?.todayDeaths)}
          sub={Formatter(state.selcted[0]?.deaths)}
          sec="grey"
        />
      </Row>
    </Container>
  );
}

const Container = styled.div`
  width: 65vw;
  height: auto;
  display: flex;
  flex-direction: column;
  
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  select {
    width: 100px;
    height: 35px;
    border-radius: 3px;
    border-width: 2px;
    border-color: gainsboro;
    font-size: auto;
    white-space: pre-wrap;
  }

  option {
    width: 50px;
  }
  & > h1 {
    color: red;
  }
`;

export default Header;
