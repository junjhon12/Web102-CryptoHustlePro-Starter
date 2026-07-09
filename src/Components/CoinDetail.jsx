import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import CoinChart from "./CoinChart";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        // Fetch both price data and descriptive data
        const [detailsResponse, descriptionResponse] = await Promise.all([
          fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`),
          fetch(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`)
        ]);

        const detailsData = await detailsResponse.json();
        const descripData = await descriptionResponse.json();
      
        // Ensure both pieces of data exist before setting state
        if (detailsData.RAW && detailsData.RAW[symbol] && detailsData.RAW[symbol].USD) {
            setFullDetails({
              numbers: detailsData.RAW[symbol].USD,
              textData: descripData.Data[symbol] // Holds description, algorithm, full name, etc.
            });
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
      <div className="flex items-center gap-6 mb-6 border-b border-gray-600 pb-6">
        <img 
            src={`https://www.cryptocompare.com${fullDetails.numbers?.IMAGEURL || ''}`} 
            alt={`Icon for ${symbol}`} 
            className="w-20 h-20"
        />
        <div>
          {/* Using textData for the Full Name */}
          <h1 className="text-4xl font-bold mb-2">{fullDetails.textData?.FullName || symbol}</h1>
          <p className="text-gray-400 text-lg">Current Price: <span className="text-white">${fullDetails.numbers?.PRICE}</span></p>
        </div>
      </div>

      {/* New Section for Description and Algorithm */}
      <div className="mb-8 text-gray-300 leading-relaxed bg-[#2a2d2a] p-6 rounded-lg">
        <p className="mb-4">{fullDetails.textData?.Description}</p>
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-white">Algorithm:</span> {fullDetails.textData?.Algorithm}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400 w-1/2">Market</th>
              <td className="py-4 px-2">{fullDetails.numbers.MARKET}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400">Highest Price (Today)</th>
              <td className="py-4 px-2">${fullDetails.numbers.HIGH24HOUR}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400">Lowest Price (Today)</th>
              <td className="py-4 px-2">${fullDetails.numbers.LOW24HOUR}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400">24h Change</th>
              <td className={`py-4 px-2 ${fullDetails.numbers.CHANGEPCT24HOUR >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {fullDetails.numbers.CHANGEPCT24HOUR}%
              </td>
            </tr>
            <tr className="border-b border-gray-700">
              <th className="py-4 px-2 font-semibold text-gray-400">Market Cap</th>
              <td className="py-4 px-2">${fullDetails.numbers.MKTCAP}</td>
            </tr>
            <tr>
              <th className="py-4 px-2 font-semibold text-gray-400">Volume (24h)</th>
              <td className="py-4 px-2">{fullDetails.numbers.VOLUME24HOUR}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CoinChart
        symbol={symbol}
        market={fullDetails.numbers.MARKET}
      />
    </div>
  );
};

export default CoinDetail;