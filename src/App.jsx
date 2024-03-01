import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal]= useState(false);
  const [animarModal, setAnimarModal]= useState(false);

  const [gastoEditar, setGastoEditar]= useState({});

  const [filtro,setFiltro]=useState('');
  const [gastosFiltrados,setGastosFiltrados]=useState([]);

  // este efect edita el gasto, se revisa que si es mayor a 0 significa que tiene algo
  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0 )
    {
      setModal(true);

      setTimeout(()=>{
        setAnimarModal(true);
      },500)

    }
  },[gastoEditar])


  //localstorage si no esta presente la variable se le asigna 0
  //este efect se ejecuta cuando cambie presupuesto
  useEffect(()=>{
    localStorage.setItem('presupuesto',presupuesto ?? 0);
  },[presupuesto])


  //este efect se ejecuta cuando cambie gastos
  useEffect(()=>{
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? []);
  },[gastos])


  useEffect(()=>{
    //con este filtramos los gastos por categoria
    if(filtro)
    {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])



  //se ejecuta cuando carga la aplicacion
  useEffect(()=>{
    const presupuestoLS= Number(localStorage.getItem('presupuesto')) ?? 0;


    if(presupuestoLS > 0)
    {
      //detecta que el presupuesto si es valiado y ya entra automaticamnete 
      setIsValidPresupuesto(true);
    }

  },[])



  //con este const anima el modal
  const handleNuevoGasto =()=>{
    setModal(true);
    setGastoEditar({});


    setTimeout(()=>{
      setAnimarModal(true);
    },500)
  }

  //Guardar los gastos
  const guardarGasto = gasto =>
  {
    if(gasto.id)
    {
      //actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      //resetear el state de la edicion de objeto
      setGastoEditar({});
    }
    else
    {
      //nuevo gasto
      // ... es para copiar lo que tengamos en gastos y despues agregar el nuevo gasto
      gasto.id = generarId();
      gasto.fecha =Date.now();
      setGastos([...gastos,gasto])
    }
    
    setAnimarModal(false);

        setTimeout(()=>{
            setModal(false);
        },500)
  }

  const eliminarGasto = id =>
  {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }


  return (
    // aun no entiendo bien el doble &&
    <div className={modal ? 'fijar' : ''}>

      <Header
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
       />

       {isValidPresupuesto && (

        <>

          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />



            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className='nuevo-gasto'>
          <img 
            src={IconoNuevoGasto} 
            alt="Icono Nuevo Gasto" 
            onClick={handleNuevoGasto}
          />
          </div>

       </>

       )}

       {modal && <Modal
                   setModal={setModal}
                   animarModal={animarModal}
                   setAnimarModal={setAnimarModal}
                   guardarGasto={guardarGasto}
                   gastoEditar={gastoEditar}
                   setGastoEditar={setGastoEditar}
                 /> }
       

    </div>
  )
}

export default App
