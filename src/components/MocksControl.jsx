import { useContext, useState } from "react";
import { MockContext } from "./context/MockingContext";

const MocksControl = () =>{
    const {mockingUsers,mockingPets, generateData} = useContext(MockContext);
    const [response,setResponse] =useState();
    const [generateDataForm, setGenerateDataForm] = useState({
        cantPets:0,
        cantUsers:0
    });
    const [responseUsrs,setResponseUsrs] = useState();
    const [responsePets,setResponsePets] = useState();
    const [mockUsrForm, setMockUsrForm] = useState();
    const [mockPetForm, setMockPetForm] = useState();
    const handleMockPetsChange = (e) =>{
        setMockPetForm(e.target.value)
    }
    const handleMockUsrsChange = (e) => {
        setMockUsrForm(e.target.value)
    }
    const handleGenerateDataChange = (e,input)=>{
        let dataGen = generateDataForm
        switch (input) {
            case "cantPets":
                dataGen.cantPets = e.target.value;
                break;
            case "cantUsers":
                dataGen.cantUsers = e.target.value;
                break;
            default:
                break;
            }
        setGenerateDataForm(dataGen);
    }
    const handleMockPets = async() =>{
        const request = await mockingPets(mockPetForm);
        console.log(request);
        setResponsePets(request);
        
    }
    const handleMockUsers = async() =>{
        const request = await mockingUsers(mockUsrForm);
        console.log(request);
        setResponseUsrs(request);
        
    }
    const handleGenerateData = async() =>{
        const request =await generateData(generateDataForm.cantPets, generateDataForm.cantUsers);
        console.log(request);
        setResponsePets(request.pets);
        setResponseUsrs(request.users);

    }
    return(
        <>
            <section id="mocking" className="flex flex-row items-center justify-center w-screen gap-4">
            <form 
                    
                    onSubmit={(e) =>{
                    e.preventDefault();
                    if(mockPetForm == null || 0) return Swal.fire({icon:"error",title:"Seleccione un rol"})
                    handleMockPets()
                    }} 
                    className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
                    <div className="w-full p-2 border border-gray-300 rounded-md">
                    <div className="d-flex flex-col items-center justify-center">
                        <label className="W-full text-center" htmlFor="cant">Cantidad de mocks de mascotas</label>
                        <input onChange={(e) => handleMockPetsChange(e)} id="cant" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="cant" type="number" required/>
                    </div>
                    </div>
                    
                    <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Generar mock de mascotas</button>
                </form>
                <form
                    
                    onSubmit={(e) =>{
                    e.preventDefault();
                    if(mockUsrForm == 0 || null) return Swal.fire({icon:"error",title:"Seleccione un rol"})
                    handleMockUsers()
                    }} 
                    className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
                    <div className="w-full p-2 border border-gray-300 rounded-md">
                    <div className="d-flex flex-col items-center justify-center">
                        <label className="W-full text-center" htmlFor="cant">Cantidad de mocks de usuarios</label>
                        <input onChange={(e) => handleMockUsrsChange(e)} id="cant" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="cant" type="number" required/>
                    </div>
                    </div>
                    
                    <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Generar mock de Usuarios</button>
                </form>
                <form 
                    onSubmit={(e) =>{
                    e.preventDefault();
                    if(generateDataForm.cantPets == 0 || generateDataForm.cantUsers == 0) return Swal.fire({icon:"error",title:"Seleccione un rol"})
                    handleGenerateData()
                    }} className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
                    
                    <div className="w-full p-2 border border-gray-300 rounded-md">
                    <div className="d-flex flex-col items-center justify-center">
                        <label className="W-full text-center" htmlFor="cantPets">Cantidad de mascotas</label>
                        <input onChange={(e) => handleGenerateDataChange(e,e.target.id)} id="cantUsers" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="cant" type="number" required/>
                    </div>
                    <div className="d-flex flex-col items-center justify-center">
                        <label className="W-full text-center" htmlFor="cantUsers">Cantidad de usuarios</label>
                        <input onChange={(e) => handleGenerateDataChange(e,e.target.id)} id="cantPets" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="cant" type="number" required/>
                    </div>
                    </div>
                    
                    <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Generar mock de mascotas</button>
                </form>
            </section>
            <section id="resultMocking">
                <h2 className="text-gray-200 text-lg">Mascotas creadas</h2>
                {
                    responsePets?.map((item, index) =>(
                        <>
                        <div key={index} className="bg-zinc-700 flex flex-col items-center justify-center">
                                
                                <h3 className="text-gray-200 text-xl" >Nombre: {item.name }</h3>
                                <h4 className="text-gray-300 text-lg">ID: {item._id}</h4>
                                <h4 className="text-gray-200 text-xl">Adoptado: {item.adopted.toString()}</h4>
                                <h4 className="text-gray-200 text-xl">Dueño: {item.adopted? item.owner :  "No tiene"}</h4>
                        </div>
                        </>
                
                    )
                    )
                    
                }
                <h2 className="text-gray-200 text-lg">Usuarios creados </h2>
                {
                    responseUsrs?.map((item,index) =>(
                        <>
                        <div key={index} className="bg-zinc-700 flex flex-col items-center justify-center">
                                
                                <h3 className="text-gray-200 text-xl" >N{ item.first_name }</h3>
                                <h4 className="text-gray-300 text-lg">{item._id}</h4>
                                <h4 className="text-gray-200 text-xl">{item.email}</h4>
                                <h4 className="text-gray-200 text-xl">{ item.role}</h4>
                        </div>
                        </>
                    ))
                }
            </section>
        </>
    )
}
export default MocksControl