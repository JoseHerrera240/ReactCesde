import React, {useState} from "react";

function App() {
  const [dataform, setDataform] = useState({
    primerNota: '',
    segundaNota: '',
    tercerNota: '',
    salary: '',
  })
  //Metodos para  capturar la info que se captura en el form 
  let handleInputChange = (event)=>{
    setDataform({
      ...dataform,
      [event.target.name]:event.target.value
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault(); //no haga postback
    console.log(`${dataform.primerNota}, ${dataform.segundaNota}, ${dataform.tercerNota}, ${dataform.salary * 2}`)
    
  }

  return (
    <div className="container">
      <h1>Formularios con React JS</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="primera nota" name="primerNota" className="form-control" onChange={handleInputChange}/>
        <br/>
        <input type="text" placeholder="Sgunda nota" name="segundaNota" className="form-control" onChange={handleInputChange}/>
        <br/>
        <input type="text" placeholder="tercer nota" name="tercerNota" className="form-control" onChange={handleInputChange}/>
        <br/>
        <input type="text" placeholder="Ingrese salario" name="salary" className="form-control" onChange={handleInputChange}/>
        <br/>
        <button className="btn btn-success">Enviar</button>
      </form>
      <span>
        {dataform.salary *10/100}
      
      </span>
      <input type="text" value={dataform.salary*4/100} readOnly/>
    </div>
  );

}
export default App;
