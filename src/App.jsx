import "./App.css";
import Header from "./Components/Header";
import Newsfeed from "./Components/Newsfeed";
import Stats from "./Components/Stats";

function App() {
  return (
    <div>
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
        <div className="app__container">
          <Newsfeed />
          {/* stats */}
          <Stats />
        </div>
      </div>
      {/* body */}
    </div>
  );
}

export default App;
