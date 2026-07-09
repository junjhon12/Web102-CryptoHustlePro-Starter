import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const data = await response.json();
      
        if (data.RAW && data.RAW[symbol] && data.RAW[symbol].USD) {
            setFullDetails(data.RAW[symbol].USD);
        }
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };
    
    fetchCoinDetails();
  }, [symbol]); 

  if (!fullDetails) {
    return <div className="text-xl text-center mt-20">Loading coin data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-[#1d1f1d] p-8 rounded-xl shadow-lg">
      <div className="flex items-center gap-6 mb-8 border-b border-gray-600 pb-6">
        <img 
            src={`https://www.cryptocompare.com${fullDetails.IMAGEURL}`} 
            alt={`Icon for ${symbol}`} 
            className="w-20 h-20"
        />
        <div>
          <h1 className="text-4xl font-bold mb-2">{symbol}</h1>
          <p className="text-gray-400 text-lg">Current Price: <span className="text-white">${fullDetails.PRICE}</span></p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400 w-1/2">Market</th>
              <td className="py-4 px-2">{fullDetails.MARKET}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400">Highest Price (Today)</th>
              <td className="py-4 px-2">${fullDetails.HIGH24HOUR}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400">Lowest Price (Today)</th>
              <td className="py-4 px-2">${fullDetails.LOW24HOUR}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400">24h Change</th>
              <td className={`py-4 px-2 ${fullDetails.CHANGEPCT24HOUR >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {fullDetails.CHANGEPCT24HOUR}%
              </td>
            </tr>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400">Market Cap</th>
              <td className="py-4 px-2">${fullDetails.MKTCAP}</td>
            </tr>
            <tr>
              <th className="py-4 px-2 font-semibold text-gray-400">Volume (24h)</th>
              <td className="py-4 px-2">{fullDetails.VOLUME24HOUR}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinDetail;