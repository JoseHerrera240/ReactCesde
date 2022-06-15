import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      correo: '',
      valor_prestamo: '',
      tipo_prestamo: '',
      numero_cuotas: '',
      client_id: '0',
      clients:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.addClient = this.addClient.bind(this);
  }
  handleChange(e){
    const {name,value} = e.target;
    this.setState({
      [name]:value
    });
  }
  addClient(e){
    e.preventDefault();
      fetch(`http://localhost:3000/creditofl/InsertClient.php`,{
        method: 'POST',
        body:JSON.stringify(this.state),
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        }
      })
        .then(res => res.json())
        .then(data =>{
          toast.succes("Cliente guardado con exito",{
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000
          })
          this.setState({correo: '', valor_prestamo:'',tipo_prestamo:'',numero_cuotas:''});
          this.refreshClient();
        });
  }
  refreshClient(){
    const apiUrl ='http://localhost:3000/creditofl/showallclientslist.php';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) =>{
        this.setState({clients: data});
        console.log(this.state.clients);
      })
  }
  componentDidMount(){
    this.refreshClient();
  }
  render(){
    return(
      <div className='container'>
        <h3>Actualización de clientes</h3>
        <form onSubmit={this.addClient}>
          <div className='mb-3'>
              correo
              <input type="text" name='correo' className='form-control' onChange={this.handleChange} value={this.state.correo}
              placeholder='Correo' autoFocus/>
          </div>
            <div className='mb-3'>
                Valor del Prestamo
                <input type="num" name="valor_prestamo" className="form-control"
                onChange={this.handleChange} value={this.state.valor_prestamo}
                placeholder="Valor del prestamo"/>
            </div>
            <div className="mb-3">
              Tipo de prestamo
              <input type="text" name="tipo_prestamo" className="form-control"
                onChange={this.handleChange} value={this.state.tipo_prestamo}
                placeholder="Tipo de prestamo"
              />
            </div>
            <div className="mb-3">
              Numero de numero Cuotas
                <input type="number" name="numero_cuotas" className="form-control"
                  onChange={this.handleChange} value={this.state.numero_cuotas}
                  placeholder="Numero de cuotas"></input>

          </div>
          <button type='submit' className='btn btn-primary'>Guardar</button>
        </form>

        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Asignatura</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.clients.map(clients =>{
                return(
                  <tr key={clients.client_id}>
                    <td>{clients.correo}</td>
                    <td>{clients.numero_cuotas}</td>
                    <td>{clients.tipo_prestamo}</td>
                    <td>{clients.valor_prestamo}</td>
                  </tr>
                )
              })
            }
          </tbody>
          </table>
          <ToastContainer/>
      </div>
    )
  }
}

export default App;