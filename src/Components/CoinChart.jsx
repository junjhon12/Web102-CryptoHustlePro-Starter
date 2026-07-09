import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinChart = ({ symbol, market }) => {
  const [histData, setHistData] = useState(null);

  useEffect(() => {
    const getCoinHist = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=30&api_key=${API_KEY}`
        );
        const json = await response.json();
        
        if (json.Data && json.Data.Data) {
            setHistData(cleanData(json.Data.Data));
        }
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    getCoinHist();
  }, [symbol, market]);

  const cleanData = (data) => {
    let filteredData = [];
    let countDays = 0;
    for (const item of data) {
      let accurateDay = new Date();
      accurateDay.setDate(accurateDay.getDate() - countDays);

      filteredData.push({
        time: accurateDay.toLocaleDateString("en-US"),
        "open price": item.open,
      });
      countDays++;
    }
    return filteredData.reverse();
  };

  return (
    <div className="mt-8">
      {histData ? (
        <div className="h-100 w-full bg-[#1a1a1a] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">30-Day Price History</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={histData}
              margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#888">
                <Label value="Date" offset={-20} position="insideBottom" fill="#ccc" />
              </XAxis>
              <YAxis stroke="#888" domain={['auto', 'auto']}>
                <Label
                  value="Price (USD)"
                  angle={-90}
                  position="insideLeft"
                  fill="#ccc"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip 
                contentStyle={{ backgroundColor: "#2d2d2d", border: "none", borderRadius: "8px", color: "#fff" }} 
                itemStyle={{ color: "#4ade80" }}
              />
              <Line
                type="monotone"
                dataKey="open price"
                stroke="#4ade80" 
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center text-gray-400">Loading chart data...</div>
      )}
    </div>
  );
};

export default CoinChart;