import { useContext, useEffect, useState } from 'react';
import { PetsContext } from './context/petsContext';
const PetsControl = () =>{
    const [adoptado, setAdoptado] = useState(false);
    const {getPets} = useContext(PetsContext)
    const savePets = async () =>{
        const pets = await getPets();
        console.log(pets);
        
    }
    useEffect(() =>{
        savePets();
    },[])
    const handleAdoptado = (e) => {
        setAdoptado(e.target.value);
    }

    return(
        <>
                
        <section className='flex flex-row gap-3 '>


        </section>
        <section className="w-screen h-screen flex flex-row gap-3 items-center justify-center" >
        <form  className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
            <div className="w-full p-2 border border-gray-300 rounded-md">
            <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="nombre">Nombre</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="nombre" type="text" required/>
            </div>
            </div>
            
            <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Postear mascota</button>
        </form>
        <form  className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
        <div className="w-full p-2 border border-gray-300 rounded-md">
            <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="nombre">Nombre</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="nombre" type="text" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="condicion">Condicion de la mascota</label>
                <select name="condicion" id="" className="w-full p-2 border border-gray-300 rounded-md" onChange={(e) =>handleAdoptado(e)}>
                    <option value={false}>No adoptado</option>
                    <option value={true}>Adoptado</option>
                    </select>
            </div>
            
            <div className={`d-flex flex-col items-center justify-center ${!adoptado ? "hidden" : "block"}`}>
                <label className="W-full text-center" htmlFor="nombreDueño">Nombre del dueño</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="nombreDueño" type="text" required/>
            </div>
            </div>
            
            <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Modificar mascota</button>
        </form>
        </section>
        
        </>
    )
}
export default PetsControl;