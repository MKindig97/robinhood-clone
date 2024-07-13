import React from "react";
import "../StatsRow.css";
import StockSVG from "../stock.svg";
import NegStockSVG from "../negStock.svg";
import {
  db,
  collection,
  query,
  where,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
} from "../firebase";

function StatsRow(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  const buyStock = async () => {
    const myStocksCollection = collection(db, "myStocks");
    const q = query(myStocksCollection, where("ticker", "==", props.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        const docRef = doc(db, "myStocks", document.id);
        const newShares = document.data().shares + 1;
        try {
          await updateDoc(docRef, { shares: newShares });
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      });
    } else {
      try {
        await addDoc(collection(db, "myStocks"), {
          ticker: props.name,
          shares: 1,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const sellStock = async () => {
    const myStocksCollection = collection(db, "myStocks");
    const q = query(myStocksCollection, where("ticker", "==", props.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        const docRef = doc(db, "myStocks", document.id);
        const currentShares = document.data().shares;
        const newShares = currentShares - 1;

        if (newShares > 0) {
          try {
            await updateDoc(docRef, { shares: newShares });
          } catch (error) {
            console.error("Error updating document: ", error);
          }
        } else {
          try {
            await deleteDoc(docRef);
          } catch (error) {
            console.error("Error deleting document: ", error);
          }
        }
      });
    }
  };

  return (
    <div className="row">
      <div className="row__intro">
        <h1>{props.name}</h1>
        <p>{props.shares && `${props.shares} shares`}</p>
      </div>
      <img
        src={percentage >= 0 ? StockSVG : NegStockSVG}
        height={16}
        alt="Stock chart"
      />
      <div className="row__numbers">
        <p className="row__price">{props.price}</p>
        <p
          className={`row__percentage ${
            percentage >= 0 ? "positive" : "negative"
          }`}
        >
          {Number(percentage).toFixed(2)}%
        </p>
      </div>
      {props.shares > 0 ? (
        <button onClick={sellStock}>Sell</button>
      ) : (
        <button onClick={buyStock}>Buy</button>
      )}
    </div>
  );
}

export default StatsRow;
