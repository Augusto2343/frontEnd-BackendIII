import { useContext } from "react";
import Swal from "sweetalert2";

export const MockContext = useContext();

const MockContextProvider = ({children}) =>{
    const mockingPets = async(cant) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/mocks/mockingPets/${cant}`);
            if(!response.ok) return Swal.fire({icon:"error",title:"Error al hacer mocking de mascotas"});
            const responseBod = await response.json();
            Swal.fire({
                icon:"success",
                title:"Mocking creado"
            })
            return responseBod;
        } catch (error) {
            return Swal.fire({icon:"error",title:"Error",text:{error}})
        }
    }   
    const mockingUsers = async(cant) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/mocks/mockingUsers/${cant}`);
            if(!response.ok) return Swal.fire({icon:"error",title:"Error al hacer mocking de usuarios"});
            const responseBod = await response.json();
            Swal.fire({
                icon:"success",
                title:"Mocking creado"
            })
            return responseBod;
        } catch (error) {
            return Swal.fire({icon:"error",title:"Error",text:{error}})
        }
    }
    const generateData = async(cantPets,cantUsrs) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/mocks/genrateData/${cantPets}/${cantUsrs}`);
            if(!response.ok) return Swal.fire({icon:"error",title:"Error al crear el mocking data"});
            const responseBod = await response.json();
            Swal.fire({
                icon:"success",
                title:"Mocking creado"
            })
            return responseBod;
        } catch (error) {
            return Swal.fire({icon:"error",title:"Error",text:{error}})
        }
    }
    return(
        <MockContext.Provider value={{generateData,mockingPets,mockingUsers}}>{children} </MockContext.Provider>
    )

}
export default MockContextProvider;