import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [operator, setOperator] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/transferencias/");
      const data = await response.json();
      setTransactions(data);

    };
    fetchData();
  }, []);

  const searchTransactions = async (startDate, endDate, operator) => {
    const newStartDate = encodeURIComponent(startDate + " 00:00:00+03");
    const newEndDate = encodeURIComponent(endDate + " 00:00:00+03");
    const newOperator = operator;//encodeURIComponent(operator);
    let response;
    console.log(operator);
    console.log(startDate, "  ", endDate);

    if ((startDate.length === 0 || endDate.length === 0) && operator.length === 0)
    {
      response = await fetch("http://localhost:8080/transferencias/");
    }
    else if ((startDate.length === 0 || endDate.length === 0) && operator.length >= 1)
    {
      response = await fetch(
        `http://localhost:8080/transferencias/operador/${newOperator}`
      );
    }
    else 
    {
      response = await fetch(
        `http://localhost:8080/transferencias/periodo?dataIni=${newStartDate}&dataFim=${newEndDate}`
      );
    };
    
    const data = await response.json();
    setTransactions(data);

    let saldo = 0;
      data.forEach(transaction => {
        saldo += transaction.valor;
      });
      setSaldoPeriodo(saldo);
      setSaldoTotal(saldo);
  };

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
        <button onClick={() => searchTransactions(startDate, endDate, operator)}>
          Pesquisar
        </button>
      </div>
      <br />
      <table>
        <thead>
          <tr className="saldo">
            <th className="saldo-total">
              <label><b>Saldo total:</b></label>
              <span>{"R$ " + saldoTotal.toFixed(2)}</span>
            </th>
            <th className="saldo-periodo">
              <label><b>Saldo no período:</b></label>
              <span>{"R$ " + saldoPeriodo.toFixed(2)}</span>
            </th>
          </tr>
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
              <td>{item.dataTransferencia.substring(0, 10)}</td>
              <td>{"R$ " + item.valor}</td>
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
