import { useState, useEffect } from "react";
import "../Stats.css";
import StatsRow from "./StatsRow";
import axios from "axios";
import { db, collection, onSnapshot } from "../firebase";

const TOKEN = "cq5h66pr01qhs6ithqj0cq5h66pr01qhs6ithqjg";
const BASE_URL = "https://finnhub.io/api/v1/quote";

export default function Stats() {
  const [stockData, setStockData] = useState([]);

  const [myStocks, setMyStocks] = useState([]);

  const getMyStocks = () => {
    const myStocksCollection = collection(db, "myStocks");
    onSnapshot(myStocksCollection, (snapshot) => {
      let promises = [];
      let tempData = [];
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        promises.push(
          getStocksData(doc.data().ticker).then((res) => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: res.data,
            });
          })
        );
      });
      Promise.all(promises).then(() => {
        console.log(tempData);
        setMyStocks(tempData);
      });
    });
  };

  const getStocksData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  useEffect(() => {
    let tempStocksData = [];
    getMyStocks();
    const stocksList = [
      "AAPL",
      "MSFT",
      "TSLA",
      "META",
      "BABA",
      "UBER",
      "UEC",
      "SBUX",
    ];
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStocksData(stock).then((res) => {
          tempStocksData.push({
            name: stock,
            ...res.data,
          });
        })
      );
    });

    Promise.all(promises).then(() => {
      setStockData(tempStocksData);
      console.log(tempStocksData);
    });
  }, []);

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                shares={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats__lists">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
