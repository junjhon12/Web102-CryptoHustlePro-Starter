import { useEffect, useState } from 'react'
import './App.css'
import CoinInfo from "./Components/CoinInfo"
 
const API_KEY = import.meta.env.VITE_APP_API_KEY
 
function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")
 
  useEffect(() => {
    const controller = new AbortController();

    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
          {
            headers: {
              "x-cg-demo-api-key": API_KEY,
            },
            signal: controller.signal 
          }
        )
        const json = await response.json()
        setList(json)
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted because user navigated away");
        } else {
          console.error(error);
        }
      }
    }
    
    fetchAllCoinData();

    return () => controller.abort();
  }, [])
 
  const searchItems = searchValue => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = list.filter(coin =>
        coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(list)
    }
  }
 
  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <ul>
        {searchInput.length > 0
          ? filteredResults.map(coin => (
              <CoinInfo
                key={coin.id}
                id={coin.id}
                image={coin.image}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
              />
            ))
          : list?.map(coin => (
              <CoinInfo
                key={coin.id}
                id={coin.id}
                image={coin.image}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
              />
            ))}
      </ul>
    </div>
  )
}
 
export default App