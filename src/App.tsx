import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo w-36 h-36 mb-5 rounded-full overflow-hidden shadow-[0_0_20px_7px_rgba(0,0,0,0.3)] dark:shadow-[0_0_15px_5px_rgba(255,255,255,0.3)] ">
          <img alt="" className="w-80 bg-white dark:bg-gray-800" src={`https://server.ansarmirzayi.ir/images/settings/IMG_20220316_193825_419.jpg`} />
        </div>
        <p>Special Ansar's template</p>
        <p className="flex gap-2">
          <a href="http://reactjs.org">react</a>
,
          <a href="https://typescript">typescript</a>
,
          <a href="https://typescript">tailwindcss</a>
,
          <a href="https://axios-http.com/">axios</a>
          ,
          <a href="https://redux.js.org/">redux , redux-toolkit , redux-thunk</a>
        </p>
        <a
          className="App-link"
          href="https://ansarmirzayi.ir"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
