import './App.css';
import{useState} from"react"
import Axios from"axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'



function App() {
  const[Nombres,setNombres]=useState("");
  const[Apellidos,setApellidos]=useState("");
  const[correo,setcorreo]=useState("");
  const[telefono,settelefono]=useState(0);
  const[edad,setedad]=useState(0);
  const[nacimiento,setnacimiento]=useState("");
  const[fecha,setfecha]=useState("");
  const[identificacion,setidentificacion]=useState(0);
  const[editar,seteditar]=useState(false);
  const[id,setid]=useState();
  const[usuarioslist,setusuarios]=useState([]);

  const add=()=>{
   Axios.post("http://localhost:3001/create",{
      Nombres:Nombres,
      Apellidos:Apellidos,
      correo:correo,
      telefono:telefono,
      edad:edad,
      nacimiento:nacimiento,
      fecha:fecha,
      identificacion:identificacion
   }).then(()=>{
    getusuarios();
    limpiarcampos();
    Swal.fire({
      title: "Registro Exitoso!!",
      text: "El Usuario "+Nombres+" fue registrado con exito!!",
      icon: "success",
      timer:3000
    });
   });
  }
  
  const update=()=>{
    Axios.put("http://localhost:3001/update",{
       Nombres:Nombres,
       id:id,
       Apellidos:Apellidos,
       correo:correo,
       telefono:telefono,
       edad:edad,
       nacimiento:nacimiento,
       fecha:fecha,
       identificacion:identificacion
    }).then(()=>{
     getusuarios();
     limpiarcampos();
     Swal.fire({
      title: "Actualizacon Exitosa!!",
      text: "El empleado "+Nombres+" fue actualizado con exito!!",
      icon: "success",
      timer:3000
    });
    });
   }

   const eliminarusuario=(val)=>{
    Swal.fire({
      title: "Confirmar eliminado",
      text: "Realmente desea eliminar a "+val.nombres+"?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminarlo"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getusuarios();
          limpiarcampos();
          Swal.fire({
            title: "Eliminado",
            text: val.nombres+ " fue eliminado",
            icon: "success",
            timer:3000
          });
    });
        
      }
    });
    
   }


   const limpiarcampos=()=>{
    setNombres("");
    setApellidos("");
    setcorreo("");
    settelefono("");
    setedad("");
    setnacimiento("");
    setfecha("");
    setidentificacion("");
    setid("")
    seteditar(false);

   }

  const editarusuario=(val)=>{
    seteditar(true);

    setNombres(val.nombres);
    setApellidos(val.apellidos);
    setcorreo(val.correo);
    settelefono(val.telefono);
    setedad(val.edad);
    setnacimiento(val.nacimiento);
    setfecha(val.fecha);
    setidentificacion(val.identificacion);
    setid(val.id);
  }

  const getusuarios=()=>{
    Axios.get("http://localhost:3001/usuarios").then((response)=>{
     setusuarios(response.data)
    });
  }
  getusuarios()
  
  
  return (
    <div className="container">
    
    <div className="card text-center">
      <div className="card-header">
        REGISTRO USUARIOS
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" >Nombres</span>
          <input type="text" 
          onChange={(event)=>{
            setNombres(event.target.value)
          }}
          className="form-control" value={Nombres} placeholder="Ingrese su nombre"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" >Apellidos</span>
          <input type="text" 
           onChange={(event)=>{
            setApellidos(event.target.value)
          }}
          className="form-control" value={Apellidos} placeholder="Ingrese su apellido"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" >Correo</span>
          <input type="text" 
          onChange={(event)=>{
            setcorreo(event.target.value)
          }}
          className="form-control" value={correo} placeholder="Ingrese su correo"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" >Telefono</span>
          <input type="number" 
          onChange={(event)=>{
            settelefono(event.target.value)
          }}
          className="form-control" value={telefono} placeholder="Ingrese su telefono"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" >Edad</span>
          <input type="number" 
          onChange={(event)=>{
            setedad(event.target.value)
          }}
          className="form-control" value={edad} placeholder="Ingrese su edad"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" >Lugar Nacimiento</span>
          <input type="text" 
          onChange={(event)=>{
            setnacimiento(event.target.value)
          }}className="form-control" value={nacimiento} placeholder="Ingrese su lugar de nacimiento"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" >Fecha De Nacimiento</span>
          <input type="date" 
          onChange={(event)=>{
            setfecha(event.target.value)
          }}
          className="form-control" value={fecha}/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" >Identificacion</span>
          <input type="number" 
           onChange={(event)=>{
            setidentificacion(event.target.value)
          }}
          className="form-control" value={identificacion} placeholder="Ingrese su identificacion"/>
        </div>
      </div>
      <div className="card-footer text-muted">
            {
              editar?
                <div>

              <button className='btn btn-warning m-2'  onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarcampos}>Cancelar</button>
              </div>
              :<button className='btn btn-success' onClick={add}>Registrar</button>
            }

      
      </div>
</div>
          <table className="table table-striped">
          <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Edad</th>
                  <th scope="col">Lugar Nacimiento</th>
                  <th scope="col">Fecha De Dacimiento</th>
                  <th scope="col">Identificacion</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                  {
                    usuarioslist.map((val,key)=>{
                      return <tr key={val.id}>
                                  <th>{val.id}</th>
                                  <td>{val.nombres}</td>
                                  <td>{val.apellidos}</td>
                                  <td>{val.correo}</td>
                                  <td>{val.telefono}</td>
                                  <td>{val.edad}</td>
                                  <td>{val.nacimiento}</td>
                                  <td>{val.fecha}</td>
                                  <td>{val.identificacion}</td>
                                  <td>
                                      <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" 
                                        onClick={()=>{
                                          editarusuario(val)
                                        }}
                                        className="btn btn-info">Editar</button>
                                        <button type="button" onClick={()=>{
                                          eliminarusuario(val);
                                        }} className="btn btn-danger">Eliminar</button>
                                      </div>
                                  </td>
                              </tr>
                    })
                  } 
                
                
              </tbody>
          </table>
    </div>
  );
}

export default App;
