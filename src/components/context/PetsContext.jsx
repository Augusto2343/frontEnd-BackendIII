import { createContext } from "react"
import Swal from "sweetalert2"
export const PetsContext = createContext()
const PetContextProvider = ({children}) =>{
    const getPets = async() =>{
        try {
            
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/pets`)
            if(!response.ok) return Swal.fire({icon:"error",title:"No se pudo obtener las mascotas"})
            let pets = await response.json()
            return pets
            
        } catch (error) {
            Swal.fire({
                icon:"error",
                title:"Error",
                text:`${error}`
                })
            
        }
    }
    const postPet = async(body) =>{
        try {
            console.log(body);
            
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/pets`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            
            if(!response.ok) return Swal.fire({icon:"error",title:"No se pudo postear la mascota"})
            const pet =await response.json();
        
            return Swal.fire({icon:"success",title:`Mascota con nombre ${pet.name} posteado correctamente`}).then(() => {
                window.location.reload();
            });
            
        } catch (error) {
            console.log(error);
            
            return Swal.fire({icon:"error",title:"No se pudo postear una mascota",text:{error}})
        }
    }
    const updatePet = async(id,body) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/pets/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            
            if(!response.ok) return Swal.fire({icon:"error",title:"No se pudo obtener la mascotas"})
                
            return Swal.fire({icon:"success",title:"Mascota modificada correctamente"}).then(() => {
                window.location.reload();
            });
            
        } catch (error) {
            return Swal.fire({icon:"error",title:"Error al modificar una mascota", text:{error}})
            
        }
    }
    const deletePet = async(id) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/pets/${id}`,{
                method:"DELETE"
            })
            
            if(!response.ok) return Swal.fire({icon:"error",title:"No se pudo obtener la mascota"})
                const pet =await response.body();
                return Swal.fire({icon:"success",title:`La mascota con el nombre ${pet.name} ha sido eliminado exitosamente`})
        } catch (error) {
            return Swal.fire({icon:"error",title:"Error al eliminar la mascota", text:{error}});
            
        }
    }
    return <PetsContext.Provider value={{getPets,postPet,updatePet,deletePet}} >{children}</PetsContext.Provider>
}
export default PetContextProvider