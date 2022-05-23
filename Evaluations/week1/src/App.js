import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";
import axios from "axios";
import { disabled } from "express/lib/application";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [salaryOrder, setSalaryOrder] = useState("asc");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData({
      page,
      salaryOrder,
    });
  }, [page, salaryOrder]);

  const getData = ({ page, salaryOrder }) => {
    setLoading(true);
    axios({
      method: "GET",
      url: "http://localhost:8080/candidates",
      params: {
        _page: page,
        _limit: 5,
        _sort: "salary",
        _order: salaryOrder,
      },
    })
      .then((res) => {
        // console.log(res.data)
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err)
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div>
        <div id="loading-container">{loading && <div>...loading</div>}</div>
        <Button
          onClick={() => setSalaryOrder("desc")}
          id="SORT_BUTTON"
          title={
            salaryOrder === "asc"
              ? "Sort by Descending Salary"
              : "Sort by Ascending Salary"
          }
        />
        <Button  title="PREV" id="PREV"  />
        <Button id="NEXT" title="NEXT"  />
      </div>
      {data.map((item) => (
        <CandidateCard key={item.id} {...item} />
      ))}
    </div>
  );
}
