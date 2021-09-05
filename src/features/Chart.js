/** @format */
import "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { info } from "./reducer";

const Chart = () => {
  const state = useSelector(info);
  var topic = state.current[0];
  var tabledata = [];

  state.data[0]?.map((i) => {
    let c = i.country;
    let cc = i.cases;
    return tabledata.push({ country: c, cases: cc });
  });

  const columns = [
    {
      name: "country",
      selector: "country",
    },
    {
      name: "cases",
      selector: "cases",
      sortable: true,
      right: true,
    },
  ];
  const data = {
    labels: Object.keys(state.data[1][topic.topic]),

    datasets: [
      {
        label: "cases",
        data: Object.values(state.data[1][topic.topic]),
        fill: true,
        backgroundColor: "lightcoral",
        borderColor: "red",
        pointBorderColor: "red",
        pointBackgroundColor: "red",
        tension: 1,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };

  return (
    <Container5>
      {" "}
      <DataTable
        title="Live Cases by Country"
        columns={columns}
        theme="solarized"
        data={tabledata}
        fixedHeader={true}
        striped={true}
        dense
        style={{ height: "50%", marginBottom: 0 }}
        highlightOnHover
        overflowY
        allowOverflow
      />
      <div>
        {" "}
        <h3>Worldwide new {topic.title}</h3>
        <Line
          style={{ height: "150px", width: "250px" }}
          data={data}
          type=''
          options={config}
        />
      </div>
    </Container5>
  );
};

const Container5 = styled.div`
  @media only screen and (min-width: 1001px) {
    display: flex;
    padding: 10px;
    box-shadow: 5px 9px 5px 3px gainsboro;

    height: 85%;
    width: 28vw;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
  }
  @media only screen and (max-width: 1000px) {
    height: auto;
    padding: 20px;
    width: 98vw;
    display: flex;
    justify-content: stretch;
    flex-direction: column;
    background-color: white;
  }
  .gpdoAX {
    margin: 0;
    padding-bottom: 0;
  }

  .qdSmh {
    -webkit-flex: 0;
    flex: 0;
  }

  & > h3 {
    color: rgba(0, 0, 0, 0.87);
    background-color: #ffffff;
    margin-bottom: 0;
    max-width: 300px;
    flex-wrap: wrap;
    padding-left: 16px;
    font-size: 22px;
    font-weight: normal;
  }
`;

export default Chart;
