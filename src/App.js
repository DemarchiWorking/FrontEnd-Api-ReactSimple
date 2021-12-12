import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import Card from './components/card';

function App() {
  const [valor, setValores] = useState();
  const[listResponse, setListResponse] = useState();
  console.log(valor);
  console.log(listResponse);

  const alteracaoValores = (valor) =>{
    setValores((valorAnterior)=>({
      ...valorAnterior,
      [valor.target.name]: valor.target.value
    }))
  };

  const botaoClick = () => {
    Axios.post("http://localhost:3001/registrar",{
      nome: valor.nome,
      valor: valor.valor,
      categoria: valor.categoria,
    }).then((response)=>{
      console.log(response)
    }).then((response) => {
      console.log(response);
    });
};

  useEffect(()=>{
    Axios.get("http://localhost:3001/getCards").then((response => {
      setListResponse(response.data);
    }));
  }, []);
  return (
    <div className="app--container">
      <div className="cadastro-container">
      <h1>Shop</h1>
      <input type="text" name="nome" placeholder="register" 
      className="cadastro-input" onChange={alteracaoValores}/>
      <input type="text" name="valor" placeholder="Preço"
       className="cadastro-input" onChange={alteracaoValores}/>
      <input type="text" name="categoria" placeholder="categoria"
       className="cadastro-input" onChange={alteracaoValores}/>
      
      <button className="cadastro-butao" 
      onClick={()=> botaoClick()}>Cadastrar</button>  
      </div> 
         
    {typeof listResponse !== "undefined" && 
    listResponse.map((valor => {
      return <Card></Card>;
    }))}
    </div>
  );
}

export default App;
