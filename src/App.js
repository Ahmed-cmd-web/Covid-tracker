/** @format */
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./features/Header";
import Map from "./features/Map";
import axios from "axios";
import { reducer1, reducer2 } from "./features/reducer";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Chart from "./features/Chart";
import Piechart from "./features/Piechart";
function App() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    let func = async () => {
      try {
        setloading(true);
        const r = await axios.get("https://disease.sh/v3/covid-19/countries");
        if (!r) return console.log("error1");
        const r2 = await axios.get("https://disease.sh/v3/covid-19/all");
        if (!r2) return console.log("error2");
        const r3 = await axios.get(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=10"
        );
        if (!r3) return console.log("error3");
        dispatch(reducer1(r.data));
        dispatch(reducer1(r3.data));
        dispatch(reducer1(r2.data));
        dispatch(reducer2(r2.data));

      } catch (error) {
        setloading(false);
        console.log(error);
      }
      setloading(false);
    };
    func();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loader">
        {" "}
        <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="column">
          {" "}
          <Header />
          <Map />
          <Piechart />
        </div>
        <div className="column">
          <Chart />
        </div>
      </div>
    );
  }
}

export default App;
