import { createContext } from "react"
import Swal from "sweetalert2"
export const UsersContext = createContext()
const UserContextProvider = ({children}) =>{
    const getUsrs = async() =>{
        try {
            
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/users`)
            if(!response.ok) return Swal.fire({icon:"error",title:"No se pudieron obtener los usuarios"})
            let usrs = await response.json()
            return usrs
            
        } catch (error) {
            Swal.fire({
                icon:"error",
                title:"Error",
                text:`${error}`
                })
            
        }
    }
    const postUsr = async(body) =>{
        try {
            console.log(body);
            
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/users`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            
            if(!response.ok) return Swal.fire({icon:"error",title:"No se pudo postear la mascota"})
            const usr =await response.json();
        
            return Swal.fire({icon:"success",title:`Usuario con nombre ${usr.first_name} posteado correctamente`}).then(() => {
                window.location.reload();
            });
            
        } catch (error) {
            console.log(error);
            
            return Swal.fire({icon:"error",title:"No se pudo postear un usuario",text:{error}})
        }
    }
    const updateUsr = async(id,body) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/users/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            
            if(!response.ok) return Swal.fire({icon:"error",title:"No se pudo obtener las mascotas"})
                
            return Swal.fire({icon:"success",title:"Usuario modificado correctamente"}).then(() => {
                window.location.reload();
            });
            
        } catch (error) {
            return Swal.fire({icon:"error",title:"No se pudo modificar un usuario"})
            
        }
    }
    const deleteUsr = async(id) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/users/${id}`,{
                method:"DELETE"
            })
            
            if(!response.ok) return Swal.fire({icon:"error",title:"No se pudo obtener las mascotas"})
                const usr =await response.body();
                return Swal.fire({icon:"success",title:`El usuario con el nombre ${usr.first_name} ha sido eliminado exitosamente`}).then(() => {
                    window.location.reload();
                });
        } catch (error) {
            return Swal.fire({icon:"error",title:"No se ha encontrado el usuario"})
            
        }
    }
    return <UsersContext.Provider value={{getUsrs,postUsr,updateUsr,deleteUsr}} >{children}</UsersContext.Provider>
}
export default UserContextProvider