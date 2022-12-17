import React, { useState, useEffect} from "react";
import "./styles.css";


function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [operator, setOperator] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/transferencias/');
      const data = await response.json();
      setTransactions(data);
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="data-inicio">
        <label htmlFor="start-date">Data início:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="data-fim">
        <label htmlFor="end-date">Data fim:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="nome-operador">
        <label htmlFor="operator">Nome do operador:</label>
        <input
          type="text"
          id="operator"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        />
      </div>
      <div className="form-pesquisar">
        <button onClick={() => setData([])}>Pesquisar</button>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Valentia</th>
            <th>Tipo de Transferência</th>
            <th>Nome do Operador</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{item.dataTransferencia}</td>
              <td>{item.valor}</td>
              <td>{item.tipo}</td>
              <td>{item.nomeOperadorTransacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
