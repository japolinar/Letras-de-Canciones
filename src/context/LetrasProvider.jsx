import React, {useState, createContext} from 'react'
import axios from 'axios';

const LetrasContext = createContext()

const LetrasProvider = ({children}) => {

  const [alerta, setAlerta] = useState('');
  const [letra, setLetra] = useState('');
  const [cargando, setCargando] = useState(false);

  const busquedaLetra = async (busqueda)=> {
    //console.log(busqueda)
    setCargando(true)
    try {
      const {artista, cancion} = busqueda
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      //console.log(url);

      const {data} = await axios(url)
      //console.log(data.lyrics);
      setLetra(data.lyrics)
      setAlerta('');

    } catch (error) {
      setAlerta('Cancion No Encontrada....')
      //console.log(error)
    }
    setCargando(false)
  }
  //the killers / Mr brightside
  
  return (
    <LetrasContext.Provider
        value={{
          alerta,
          setAlerta,
          busquedaLetra,
          letra,
          cargando
        }}
    >
      {children}
    </LetrasContext.Provider>
  )
}

export {
    LetrasProvider
}

export default LetrasContext
