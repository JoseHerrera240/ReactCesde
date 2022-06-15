import './App.css';

function App() {
  return (
    <div className="container">
    <h1>Formularios con React JS</h1>
    <form>
      <input type="text" placeholder="correo" name="correo" className="form-control" />
      <br/>
      <input type="text" placeholder="Sgunda nota" name="segundaNota" className="form-control" />
      <br/>
      <input type="text" placeholder="tercer nota" name="tercerNota" className="form-control" />
      <br/>
      <input type="text" placeholder="Ingrese salario" name="salary" className="form-control" />
      <br/>
      <button className="btn btn-success">Enviar</button>
    </form>
   
  </div>
);
}

export default App;
