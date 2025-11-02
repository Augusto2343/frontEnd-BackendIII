const UserControl = () =>{
    return(
        <>
        <section className="w-screen h-screen flex flex-row gap-3 items-center justify-center" >
        <form  className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
            <div className="w-full p-2 border border-gray-300 rounded-md">
            <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="nombre">Nombre</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="nombre" type="text" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="email">Correo</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="email" type="email" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="password">Contraseña</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="password" type="text" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="role">Elige tu rol</label>
                <select name="role" id="" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="user">User</option>
                    <option value="admin">Administrador</option>
                    </select>
            </div>
            </div>
            
            <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Postear usuario</button>
        </form>
        <form  className="max-w-300 min-w-60 h-full flex flex-col items-center justify-center">
            <div className="w-full p-2 border border-gray-300 rounded-md">
            <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="iduser">ID del usuario a modificar</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="idUser" type="text" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label className="W-full text-center" htmlFor="nombre">Nombre</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="nombre" type="text" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="email">Correo</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="email" type="email" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="password">Contraseña</label>
                <input className="w-full p-2 border border-gray-300 rounded-md" name="password" type="text" required/>
            </div>
            <div className="d-flex flex-col items-center justify-center">
                <label htmlFor="role">Elige tu rol para modificar</label>
                <select name="role" id="" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">No modificar</option>
                    <option value="user">User</option>
                    <option value="admin">Administrador</option>
                    </select>
            </div>
            </div>
            
            <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Modificar usuario</button>
        </form>
        </section>
        
        </>
    )
}
export default UserControl;