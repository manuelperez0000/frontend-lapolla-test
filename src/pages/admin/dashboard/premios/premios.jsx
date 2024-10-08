import ModalDatos from "./modalDatos"
import usePremios from "./usePremios"
import { formatDate2, getTime2 } from "../../../../services/formatDate"
import { Spinner } from "react-bootstrap"
import useLoadingStore from "../../../../store/loadingStore"
const Premios = () => {

    const { premios, setModalDatos, typeModal, handleModal, navegador, handleFilterPremios } = usePremios()
    const { loading } = useLoadingStore()
    return (<>
        <ModalDatos typeModal={typeModal} setModalDatos={setModalDatos} />
        <div className="flex-between p-3">
            <h2 className="h2-plain">Pago de premios</h2>
            <div className="d-flex gap-2 mb-0">
                <button onClick={() => handleFilterPremios(1, false)} className={`btn ${navegador === 1 && "active"}`}>Pendientes</button>
                <button onClick={() => handleFilterPremios(2, true)} className={`btn ${navegador === 2 && "active"}`}>Aprobados</button>
            </div>
        </div>
        <hr className="m-0" />
        {loading ? <div className="card text-center py-5">
            <div className="w-100">
                <Spinner />
            </div>
        </div>
            :
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th> Ticket </th>
                        <th>Premio</th>
                        <th>Vendedor</th>
                        <th>Datos de pago</th>
                    </tr>
                </thead>
                <tbody>
                    {premios.map(premio => {
                        return (
                            <tr key={premio._id}>
                                <td>{premio._id}</td>
                                <td>
                                    {`${formatDate2(premio.date)} - ${getTime2(premio.date)}`}
                                </td>
                                <td>
                                    <button onClick={() => handleModal("ticket", premio)} className="btn btn-success"> <i className="bi bi-eye" /> Ver </button>
                                </td>
                                <td>
                                    Bs. {premio?.amount || 0}
                                </td>
                                <td>
                                    Agencia: {premio?.ticket?.user?.name || ""} <button onClick={() => handleModal("user", premio)} className="bi bi-eye btn btn-success" />
                                </td>
                                <td>
                                    <button onClick={() => handleModal("data", premio)} className="btn btn-danger"> <i className="bi bi-eye" /> Ver datos </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        }
    </>)
}

export default Premios