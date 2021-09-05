/** @format */

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { info } from "./reducer";
const Map = () => {
  const selected = useSelector(info);
  const calcradii = (cases) => {
    var radius = (cases / 10000000) * 20;
    return radius;
  };
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
  const [map, setmap] = useState(null);
  var s = selected.selcted[0];
  useEffect(() => {
    if (s.countryInfo) {
      map?.setView(
        {
          lat: s.countryInfo?.lat,
          lng: s.countryInfo?.long,
        },
        5
      );
    }
  }, [s, map]);
  return (
    <Container2>
      <MapContainer
        center={[45, 45]}
        zoom={3}
        style={{ height: "100%" }}
        whenCreated={(e) => setmap(e)}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selected.data[0]?.map((i) => (
          <CircleMarker
            key={i.country}
            center={[i.countryInfo.lat, i.countryInfo.long]}
            pathOptions={{
              fillColor: selected.current[0].sec,
              color: selected.current[0].pcolor,
            }}
            radius={
              selected.current[0].topic === "cases"
                ? calcradii(i.cases)
                : selected.current[0].topic === "recovered"
                ? calcradii(i.recovered)
                : calcradii(i.deaths * 20)
            }
          >
            <Popup className="pop">
              <img className="flag" src={i.countryInfo.flag} alt={i.country} />

              <div className="info">
                {" "}
                {i.country}
                <span>Cases:{Formatter(i.cases)}</span>
                <span>Recovered:{Formatter(i.recovered)}</span>
                <span>Deaths:{Formatter(i.deaths)}</span>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </Container2>
  );
};

const Container2 = styled.div`
  @media only screen and (min-width: 1001px) {
    height: 100vh;
    padding: 15px;
    margin: 10px auto;
    width: 95%;
    border-radius: 20px;
    min-height: 20vh;
    box-shadow: -4px 10px 8px 5px gainsboro;

    background-color: white;
  }
  @media only screen and (max-width: 1000px) {
    height: 50vh;
    padding: 15px;
    margin: 10px auto;

    width: 90%;
    background-color: white;

    border-radius: 20px;
    box-shadow: -4px 10px 8px 5px gainsboro;
  }
  .flag {
    width: auto;
    height: 60px;
    width: 100%;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .leaflet-popup-content-wrapper {
    height: max-content;
  }
`;

export default Map;
