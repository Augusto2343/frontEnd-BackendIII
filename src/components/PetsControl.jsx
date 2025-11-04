import { useContext, useEffect, useState } from 'react';
import { PetsContext } from './context/PetsContext';
import { UsersContext } from './context/UsersContext';
const PetsControl = () =>{
    const [pets,setPets] = useState();
    const [usrs, setUsrs] = useState();
    const {getUsrs} = useContext(UsersContext);
    const {getPets,postPet,updatePet,deletePet} = useContext(PetsContext);
    const [seccActiva,setSeccActiva] = useState();
    const [updateFormData,setUpdateFormData] = useState({
        id:"",
        owner:"",
        name:undefined,
        adopted:false
    })
    const [postFormData,setPostFormData] = useState({
        name:"",
        
    })
    const [idDelete,setIdDelete] = useState();
    const savePets = async () =>{
        const response = await getPets();
        console.log(response);
        
        setPets(response)
    }
    const saveUsrs = async () =>{
        const response = await getUsrs();
        console.log(response);
        
        setUsrs(response)
    }
    useEffect(() =>{
        savePets();
        saveUsrs();
    },[])

    const handlePostChange = (e,input) =>{
        let pet = postFormData;

        switch (input) {
            case "nombre":
                pet.name= e.target.value;
                break;
            default:
                break;
        }
        
        setPostFormData(pet)        
    }
    const handleUpdateChange = (e,input) =>{
        let pet = updateFormData;

        switch (input) {
            case "id":
                pet.id = e.target.value;
                break;
            case "nombre":
                pet.name= e.target.value;
                break;
            case "owner":
                pet.owner= e.target.value;
                pet.adopted = true;
                break;
            default:
                break;
        }
        console.log(pet);
        
        setUpdateFormData(pet)        
    }
    const handleDeleteChange = (e) =>{

        let id = idDelete;
        id = e.target.value;
        console.log(id);
        
        setIdDelete(id);
    } 
    
    const handleSubmitPost = async() =>{
        const response = await postPet(postFormData);
        console.log(response);

    }
    const handleSubmitUpd = async() =>{
        let formData = updateFormData;
        if(updateFormData.name == "") formData.name = undefined
        const response = await updatePet(updateFormData.id,updateFormData)
        console.log(response);
    }
    const handleSubmitDelete = async() =>{
        const response = await deletePet(idDelete);
        console.log(response);
        
    }
    const desplegarContrl = () =>{
        setSeccActiva("controlPets")

    }
    const desplegarPets = ()=>{
        setSeccActiva("Pets")
    }
    return(
        <>
        <section onClick={desplegarPets} id="Pets" className={`${seccActiva == "Pets" ? "bg-stone-700 active":"w-screen min-h-10 bg-stone-700 rounded-2xl flex flex-row justify-center items-center mb-10 mt-2 " }`}>
        <h2 className="text-gray-100 text-2xl">Pets</h2>
            <div className={`${seccActiva == "Pets" ? "flex flex-col active": "inactive" }`}>
                        
                        <div className="flex flex-row justify-center items-center gap-20">
                        {pets?.map((pet, index) => (
                            <div key={index} className="flex flex-col max-w-70 p-2 bg-stone-800 rounded-lg items-center justify-center">
                                <h3>Nombre: {pet.name}</h3>
                                <h4>Adoptado: {pet.adopted.toString()}</h4>
                            </div>
                        ))}
                        </div>
                        
                </div>
        </section>
        <section onClick={desplegarContrl} id="controlPets" className={`${seccActiva == "controlPets" ? " bg-stone-700 ":"w-screen max-h-20 bg-stone-700 rounded-2xl flex flex-col mb-10 mt-2 " }`}>
            <h2 className="text-gray-100 text-2xl flex flex-row">Control de usuarios</h2>
            <div className={` ${seccActiva == "controlPets"? "flex-row active" : "inactive"}`}>
        <section className="w-screen h-screen flex flex-row gap-3 items-center justify-center" >
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
        <form  onSubmit={(e) =>{
            e.preventDefault();
            if(updateFormData.id == "") return Swal.fire({icon:"error",title:"Seleccione un usuario a modificar"})
            if(updateFormData.name == "" && updateFormData.email == "" && updateFormData.role == "" && updateFormData.password == "") return Swal.fire({icon:"error",title:"Ingrese algo en algún campo para modificar el usuario"})
            handleSubmitUpd()
            }}  className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
            <div className="w-full p-2 border border-gray-300 rounded-md">
            <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="iduser">ID del usuario a modificar</label>
                <select id="id" onChange={(e) => handleUpdateChange(e,e.target.id)} name="idUser" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900">
                    <option value=""></option>
                    {
                        pets?.map((item,index) =>(
                        <option key={index} value={item._id}>{item.name}</option>
                        ))
                    }
                    </select>
                    
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="nombre">Nombre</label>
                <input id="nombre" onChange={(e) => handleUpdateChange(e,e.target.id)} className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="nombre" type="text" />
            </div>
            
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="owner">Adoptado por</label>
                <select id="owner" onChange={(e) => handleUpdateChange(e,e.target.id)} name="owner"  className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900">
                    <option value=""></option>
                    {
                        usrs?.map((item,index) =>(
                        <option key={index} value={item._id}>{item.first_name}</option>
                        ))
                    }
                    </select>
            </div>
            </div>
            
            <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Modificar mascota</button>
        </form>
        <form onSubmit={(e) =>{
            e.preventDefault();
            if(idDelete == "") return Swal.fire({icon:"error",title:"Seleccione un usuario a modificar"})
            handleSubmitDelete()
            }}  className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center" >
                 <div className="w-full p-2 border border-gray-300 rounded-md">
                <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="iduser">ID del usuario a modificar</label>
                <select id="id" onChange={(e) => handleDeleteChange(e)} name="idUser" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900">
                    <option value=""></option>
                    {
                        pets?.map((item,index) =>(
                        <option key={index} value={item._id}>{item.name}</option>
                        ))
                    }
                    </select>
                    
            </div>
            </div>
            <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Borrar usuario</button>

            </form>
        </section>
        </div>
        </section>
        </>
        )
}
export default PetsControl;