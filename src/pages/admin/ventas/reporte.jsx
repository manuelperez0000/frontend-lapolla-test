import formatDate from '../../../services/formatDate'
import useLoadingStore from "../../../store/loadingStore"
import ReportModal from "../../../components/modals/reportModal"
import useModalStore from "../../../store/modalStore"
import useUserStore from '../../../store/userStore'
import useReportes from '../../../hooks/useReportes'

const Reporte = () => {
    const { dataTable, generateReport } = useReportes()
    const { setVisible } = useModalStore()
    const { loading } = useLoadingStore()

    const { user } = useUserStore()

    return (<>
        <ReportModal handleExec={generateReport} />
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between p-2">
                        <h3>Reporte de ventas (Agencia)</h3>
                        <button onClick={() => setVisible(true)} className="btn btn-primary" style={{ width: "170px" }}>
                            {loading ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                                : (<i className="bi bi-archive"> Cierre de Caja</i>)}
                        </button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Vendidos</th>
                                <th>Total BS</th>
                                <th>Comisión Agencias</th>
                                <th>Total a pagar</th>
                                <th>Pagos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTable.length > 0 ? dataTable.map((data, index) => (
                                <tr key={index}>
                                    <td>{formatDate(data.date)}</td>
                                    <td>{data.ticketsSold}</td>
                                    <td>{data.totalSold}</td>
                                    <td>
                                        {user.level === 4 && data.agenciaAmount}
                                        {user.level === 3 && data.gruperoAmount}
                                        {user.level === 2 && data.adminAmount}
                                    </td>
                                    <td>
                                        -{data.totalSold - data.agenciaAmount}
                                    </td>
                                    <td>
                                        <button className='btn btn-primary'>
                                            Pagar
                                        </button>
                                    </td>
                                </tr>
                            )) : <tr>
                                <td colSpan={4} className='text-center'>
                                    No se encontraron Reportes
                                </td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    )
}




export default Reporte

/* const listaFechas = [
    { id: "1", name: "item 1", date: "2024-03-11 10:30:15" },
    { id: "2", name: "item 2", date: "2024-03-11 12:45:30" },
    { id: "3", name: "item 3", date: "2024-03-11 14:20:00" }
  ];
  
  // Función para convertir una fecha y hora en milisegundos
  function convertirAMilisegundos(dateTimeStr) {
    const [fecha, hora] = dateTimeStr.split(" ");
    const [anio, mes, dia] = fecha.split("-");
    const [hh, mm, ss] = hora.split(":");
    return new Date(anio, mes - 1, dia, hh, mm, ss).getTime();
  }
  
  // Define el rango de horas (por ejemplo, de 11:00:00 a 14:00:00)
  const horaInicio = convertirAMilisegundos("2024-03-11 11:00:00");
  const horaFin = convertirAMilisegundos("2024-03-11 14:00:00");
  
  // Filtra las fechas dentro del rango de horas
  const fechasFiltradas = listaFechas.filter((item) => {
    const fechaEnMilisegundos = convertirAMilisegundos(item.date);
    return fechaEnMilisegundos >= horaInicio && fechaEnMilisegundos <= horaFin;
  });
  
  console.log(fechasFiltradas); */