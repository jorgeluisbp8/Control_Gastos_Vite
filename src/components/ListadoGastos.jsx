import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
        gastos, 
        setGastoEditar, 
        eliminarGasto,
        filtro,
        gastosFiltrados

    }) => {
  return (
    <div className='listado-gastos contenedor'>

        {   filtro ? (
                    //si hay uno definido iteramos sobre gastos filtrados solo muestra eso
                <>
                    <h2>{gastos.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>

                    {gastosFiltrados.map(gasto=> (
                        <Gasto
                
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                        
                
                        />
                
                    ))}
                </>
            ) : (
                //si no hay uno definido iteramos de todos los gastos
                <>
                    <h2>{gastos.length ? 'Gastos' : 'No hay gastos aun'}</h2>
                    {gastos.map(gasto=>(
                        <Gasto
                
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                        
                
                        />
                
                    ))}
                </>
            )
        }

    </div>
  )
}

export default ListadoGastos
