import './App.css';
import { BitcoinChart } from './components/BitcoinChart/BitcoinChart';
import { ProfitCalculator } from './components/Calculation/ProfitCalculator/ProfitCalculator';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <BitcoinChart />
      <ProfitCalculator />
      <Footer />
    </>
  );
}

export default App;
