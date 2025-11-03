import { useContext, useState } from "react";
import { MockContext } from "./context/MockingContext";

const MocksControl = () =>{
    const {mockingUsrs,mockingPets, generateData} = useContext(MockContext);
    const [response,setResponse] =useState();
    return(
        <>
            <section id="mocking" className="">
                    <form onSubmit={(e) =>{
                    e.preventDefault();
                    if(postFormData.role == "") return Swal.fire({icon:"error",title:"Seleccione un rol"})
                    handleSubmitPost()
                    }} className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
                    <div className="w-full p-2 border border-gray-300 rounded-md">
                    <div className="d-flex flex-col items-center justify-center">
                        <label className="W-full text-center" htmlFor="nombre">Nombre de la mascota</label>
                        <input onChange={(e) => handlePostChange(e,e.target.id)} id="nombre" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="nombre" type="text" required/>
                    </div>
                    </div>
                    
                    <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Postear mascota</button>
                </form>
            </section>
            <section id="resultMocking">
                {
                    response?.map((item, index) =>(
                        <>
                        <div key={index} className="bg-zinc-700 flex flex-col items-center justify-center">
                                
                                <h3 className="text-gray-200 text-xl" >{item.name? item.name: item.first_name }</h3>
                                <h4 className="text-gray-300 text-lg">{item._id}</h4>
                                <h4 className="text-gray-200 text-xl">{item.email? item.email: item.adopted}</h4>
                                <h4 className="text-gray-200 text-xl">{item.role? item.role : item.adopted? item.owner: ""}</h4>
                        </div>
                        </>
                    )
                )}
            </section>
        </>
    )
}
export default MocksControl