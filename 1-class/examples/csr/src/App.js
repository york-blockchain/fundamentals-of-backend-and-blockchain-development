import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css';

function App() {
  // Define state variables to store the exchange rates
  const [usdToEth, setUsdToEth] = useState('');
  const [cadToEth, setCadToEth] = useState('');

  useEffect(() => {
    // Function to fetch exchange rates
    const fetchExchangeRates = async () => {
      try {
        // Make GET requests to fetch exchange rates
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum");

        // Extract the exchange rates from the responses
        const usdRate = response.data.market_data.current_price.usd;
        const cadRate = response.data.market_data.current_price.cad;

        // Update the state with the exchange rates
        setUsdToEth(usdRate);
        setCadToEth(cadRate);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    // Call the function to fetch exchange rates
    fetchExchangeRates();
  }, []); // Empty dependency array means this effect runs once on component mount
  return (
    <div>
      <p>{usdToEth}{' '}USD/ETH</p>
      <p>{cadToEth}{' '}CAD/ETH</p>
    </div>
  );
}

export default App;
