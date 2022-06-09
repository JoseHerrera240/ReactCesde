import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      client_correo: '',
      client_valPrestamo: '',
      client_tipoPrestamo: '',
      client_numeroCuotas: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addClient = this.addClient.bind(this);
  }
  handleChange(e){
    const {correo,value} = e.target;
    this.setState({
      [name]:value
    });
  }
  addClient(e){
    e.preventDefault();
      fetch(`http://localhost:8081/creditofl/InsertClient.php`,{
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
          this.setState({client_correo: '', client_valPrestamo:'',client_tipoPrestamo:'',client_numeroCuotas:''});
          this.refreshClient();
        });
  }
  refreshClient(){
    const apiUrl ='http://localhost:8081/creditofl/ShowAllClientsList.php';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) =>{
        this.setState({clients: data});
        console.log(this.state.students);
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
              <input type="text" name='client_correo' className='form-control' onChange={this.handleChange} value={this.state.student_correo}
              placeholder='Correo' autoFocus/>
          </div>
            <div className='mb-3'>
                Valor del Prestamo
                <input type="num" name="client_valPrestamo" className="form-control"
                onChange={this.handleChange} value={this.state.client_valPrestamo}
                placeholder="Valor del prestamo"/>
            </div>
            <div className="mb-3">
              Tipo de prestamo
              <input type="text" name="client_tipoPrestamo" className="form-control"
                onChange={this.handleChange} value={this.state.client_tipoPrestamo}
                placeholder="Tipo de prestamo"
              />
            </div>
            <div className="mb-3">
              Numero de numero Cuotas
                <input type="number" name="client_numeroCuotas" className="form-control"
                  onChange={this.handleChange} value={this.state.client_numeroCuotas}
                  placeholder="Numero de cuotas"></input>

          </div>
          <button type='submit' className='btn btn-primary'>Guardar</button>
        </form>
      </div>
    )
  }
}