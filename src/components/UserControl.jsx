import { useContext, useEffect, useState } from "react";
import { UsersContext } from "./context/UsersContext";
import Swal from "sweetalert2";

const UserControl = () =>{
    const [users,setUsers] = useState()
    const {getUsrs,postUsr,updateUsr,deleteUsr} = useContext(UsersContext)
    const [seccActiva,setSeccActiva] = useState();
    const [updateFormData,setUpdateFormData] = useState({
        id:"",
        email:"",
        first_name:"",
        password:"",
        role:"",
    })
    const [postFormData,setPostFormData] = useState({
        email:"",
        first_name:"",
        password:"",
        role:"",
    })
    const [idDelete,setIdDelete] = useState();
    const saveUsrs = async () =>{
        const response = await getUsrs();
        console.log(response);
        
        setUsers(response)
        setTimeout(() => {
            console.log(users);
            
        },["1000"])
    }
    useEffect(() =>{
        saveUsrs();
    },[])

    const handlePostChange = (e,input) =>{
        let usr = postFormData;

        switch (input) {
            case "nombre":
                usr.first_name= e.target.value;
                break;
            case "email":
                usr.email= e.target.value;
                break;
            case "password":
                usr.password = e.target.value
                break;
            case "role":
                usr.role = e.target.value;
                break;
            default:
                break;
        }
        
        setPostFormData(usr)        
    }
    const handleUpdateChange = (e,input) =>{
        let usr = updateFormData;

        switch (input) {
            case "id":
                usr.id = e.target.value;
                break;
            case "nombre":
                usr.first_name= e.target.value;
                break;
            case "email":
                usr.email= e.target.value;
                break;
            case "password":
                usr.password = e.target.value
                break;
            case "role":
                usr.role = e.target.value;
                break;
            default:
                break;
        }
        console.log(usr);
        
        setUpdateFormData(usr)        
    }
    const handleDeleteChange = (e) =>{

        let id = idDelete;
        id = e.target.value;
        console.log(id);
        
        setIdDelete(id);
    } 
    
    const handleSubmitPost = async() =>{
        const response = await postUsr(postFormData);
        console.log(response);

    }
    const handleSubmitUpd = async() =>{
        const response = await updateUsr(updateFormData)
        console.log(response);
        
    }
    const handleSubmitDelete = async() =>{
        const response = await deleteUsr(idDelete);
        console.log(response);
        
    }
    const desplegarContrl = () =>{
        setSeccActiva("controlUsrs")

    }
    const desplegarUsrs = ()=>{
        setSeccActiva("usuarios")
    }
    return(
        <>
        <section onClick={desplegarUsrs} id="usuarios" className={`${seccActiva == "usuarios" ? "bg-stone-700 active":"w-screen min-h-10 bg-stone-700 rounded-2xl flex flex-row justify-center items-center mb-10 mt-2 " }`}>
        <h2 className="text-gray-100 text-2xl">Usuarios</h2>
            <div className={`${seccActiva == "usuarios" ? "flex flex-col active": "inactive" }`}>
                        
                        <div className="flex flex-row justify-center items-center gap-20">
                        {users?.map((usr, index) => (
                            <div key={index} className="flex flex-col max-w-70 p-2 bg-stone-800 rounded-lg items-center justify-center">
                                <h3>{usr.first_name}</h3>
                                <h4>{usr.email}</h4>
                            </div>
                        ))}
                        </div>
                        
                </div>
        </section>
        <section onClick={desplegarContrl} id="controlUsrs" className={`${seccActiva == "controlUsrs" ? "h-full block bg-stone-700 ":"w-screen min-h-10 bg-stone-700 rounded-2xl flex justify-center items-center" }`}>
            {seccActiva != "controlUsrs"?
            <>
            <h2 className="text-gray-100 text-2xl">¿Desplegar control de usuarios?</h2>
            </>:
            <>
            <h2 className="text-gray-100 text-2xl">Control de usuarios</h2>
        <section className="w-screen h-screen flex flex-row gap-3 items-center justify-center" >
        <form onSubmit={(e) =>{
            e.preventDefault();
            if(postFormData.role == "") return Swal.fire({icon:"error",title:"Seleccione un rol"})
            handleSubmitPost()
            }} className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
            <div className="w-full p-2 border border-gray-300 rounded-md">
            <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="nombre">Nombre</label>
                <input onChange={(e) => handlePostChange(e,e.target.id)} id="nombre" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="nombre" type="text" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="email">Correo</label>
                <input onChange={(e) => handlePostChange(e,e.target.id)} id="email" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="email" type="email" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="password">Contraseña</label>
                <input onChange={(e) => handlePostChange(e,e.target.id)} id="password" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="password" type="text" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="role">Elige tu rol</label>
                <select onChange={(e) => handlePostChange(e,e.target.id)} name="role" id="role" className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900">
                    <option value=""></option>
                    <option value="user">User</option>
                    <option value="admin">Administrador</option>
                    </select>
            </div>
            </div>
            
            <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Postear usuario</button>
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
                        users?.map((item,index) =>(
                        <option key={index} value={item._id}>{item.first_name}</option>
                        ))
                    }
                    </select>
                    
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="nombre">Nombre</label>
                <input id="nombre" onChange={(e) => handleUpdateChange(e,e.target.id)} className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="nombre" type="text" />
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="email">Correo</label>
                <input id="email" onChange={(e) => handleUpdateChange(e,e.target.id)} className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="email" type="email" />
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="password">Contraseña</label>
                <input id="password" onChange={(e) => handleUpdateChange(e,e.target.id)} className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900" name="password" type="text" />
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="role">Elige tu rol para modificar</label>
                <select id="role" onChange={(e) => handleUpdateChange(e,e.target.id)} name="role"  className="w-full p-2 border border-gray-300 rounded-md border-gray-300 bg-gray-900">
                    <option value="">No modificar</option>
                    <option value="user">User</option>
                    <option value="admin">Administrador</option>
                    </select>
            </div>
            </div>
            
            <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Modificar usuario</button>
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
                        users?.map((item,index) =>(
                        <option key={index} value={item._id}>{item.first_name}</option>
                        ))
                    }
                    </select>
                    
            </div>
            </div>
            <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Borrar usuario</button>

            </form>
        </section>
        </>
        }
        </section>
        
        
        </>
    )
}
export default UserControl;