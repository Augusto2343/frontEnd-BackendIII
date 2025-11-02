import { createContext } from "react"
import Swal from "sweetalert2"
export const PetsContext = createContext()
const PetContextProvider = ({children}) =>{
    const getPets = async() =>{
        try {
            const response = await fetch("hearty-trust-production-873e.up.railway.app/api/pets",{
                method:"GET"
            })
            if(!response.ok) return Swal.fire({icon:"error",title:"No se pudo obtener las mascotas"})
            return response.body
        } catch (error) {
            Swal.fire({
                icon:"error",
                title:"Error",
                text:`${error}`
                })
            
        }
    }
    return <PetsContext.Provider value={{getPets}} >{children}</PetsContext.Provider>
}
export default PetContextProvider