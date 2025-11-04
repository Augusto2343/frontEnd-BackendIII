import capi from "../../public/capi.jpeg"
import capi2 from "../../public/capi2.jpeg"

const Inicio = () =>{
    return(
        <>
        <section className="w-screen h-screen flex flex-col items-center justify-center">
        <h2 className="text-gray-200 text-2xl">Bienvenidos a la Api de adopción</h2>
        <div className="flex flex-row items-center justify-center">
        <img src={capi} className="max-w-200"></img>
        <img src={capi2} className="max-w-100"></img>

        </div>
        </section>
        </>
    )
}
export default Inicio;