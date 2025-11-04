import { createContext } from "react";
import Swal from "sweetalert2";

export const MockContext = createContext();

const MockContextProvider = ({children}) =>{
    const mockingPets = async(cant) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/mocks/mockingPets/${cant}`);
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
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/mocks/mockingUsers/${cant}`);
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
    const generateData = async(cantPets,cantUsers) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/api/mocks/generateData/${cantPets}/${cantUsers}`);
            console.log(response.body);
            
            if(!response.ok) return Swal.fire({icon:"error",title:"Error al crear el mocking data"});
            const responseBod = await response.json();
            console.log(responseBod);
            
            Swal.fire({
                icon:"success",
                title:"Mocking creado"
            })
            return responseBod;
        } catch (error) {
            console.log(error);
            
            return Swal.fire({icon:"error",title:"Error",text:{error}})
        }
    }
    return(
        <MockContext.Provider value={{generateData,mockingPets,mockingUsers}}>{children} </MockContext.Provider>
    )

}
export default MockContextProvider;