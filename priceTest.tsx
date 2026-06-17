import { useState, useMemo } from "react";

interface Instrument {
  symbol: string;
  price: number;
}

const instruments: Instrument[] = [
  { symbol: "AAPL", price: 182.5 },
  { symbol: "GOOGL", price: 141.3 },
  { symbol: "MSFT", price: 415.2 },
  { symbol: "TSLA", price: 178.9 },
  { symbol: "AMZN", price: 178.2 },
];

function SearchableList() {
  // TODO 1 : state pour la recherche
  const [search, setSearch] = useState("");
  // TODO 2 : liste filtrée mémorisée avec useMemo
  const filterList = (search) => {
    return instruments.filter((item) =>
      item.symbol.toLowerCase().includes(search.toLowerCase()),
    );
  };
  const filteredList = useMemo(() => filterList(search), [search]);

  return (
    <div>
      {/* TODO 3 : champ de recherche */}
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search"
      />
      {/* TODO 4 : liste filtrée */}
      {filteredList.map((item) => (
        <div key={item.symbol}>
          {item.price} {item.symbol}
        </div>
      ))}
    </div>
  );
}

export default SearchableList;

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span style={count > 10 ? { color: "red" } : { color: "green" }}>
        {count}
      </span>
      <button onClick={() => setCount(count + 1)} disabled={count === 0}>
        {"-"}
      </button>
      <button onClick={() => setCount(count - 1)}> {"+"}</button>
      <button onClick={() => setCount(0)}>{"Reset"}</button>
    </div>
  );
}
