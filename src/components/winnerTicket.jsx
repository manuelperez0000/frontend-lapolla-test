import useTicketStore from "../store/ticketStore"
import formatDate from "../services/formatDate"
import useAnimalsStore from "../store/animalsStore"
import WinnerForm from "./winerForm"

const WinnerTicket = () => {
    const { animals } = useAnimalsStore()
    const { ticket } = useTicketStore()

    return (<>
        {/*  {ticket && (ticket.isWinner ? 'winer' : 'No ganador')} */}
        {ticket?.isWinner ?
            <div className="winer-ticket w-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 text-center">
                            <h1>Ticket Ganador </h1>
                            <i className="winer-icon bi bi-check-circle-fill " />
                            <div className="">
                                {/* <div> <b> Nombre:</b> {ticket.user.name} </div> */}
                                <div> <b> Nro ticket: </b> {ticket._id.slice(-5)} </div>
                                <div> <b> Codigo: </b> {ticket.code} </div>
                                <div> <b> {ticket.quinielaType === 1 ? 'Gran ' : 'Mini '}  Quiniela:</b> {formatDate(ticket.date)}  </div>
                                <div>
                                    <div className="d-flex my-3 text-center">
                                        {ticket && ticket.animals.map((animal, index) => <div className="w-100" key={index}>
                                            {animals.map(animal => animal.animalId).includes(animal.id) ?
                                                <b className="btn-jugada win">
                                                    {animal.id === 37 ? '00' : animal.id}
                                                </b>
                                                : <b className="btn-jugada lose ">
                                                    {animal.id === 37 ? '00' : animal.id}
                                                </b>}
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card">
                                Datos del ganador
                            </div>
                            <WinnerForm ticket={ticket} />
                        </div>
                    </div>
                </div>

                {/* <h3 className="premio">Premio: Bs. 95.000</h3> */}
            </div>
            : ticket && !ticket.isWinner &&
            <div className="ticket-looser" >
                <h1>
                    No ganador !
                </h1>
                <div className="text-start">
                    <div> <b> Nombre:</b> {ticket && ticket.user.name} </div>
                    <div> <b> Nro ticket: </b> {ticket && ticket._id.slice(-5)} </div>
                    <div> <b> Codigo: </b> {ticket.code} </div>
                    <div> <b> {ticket.quinielaType === 1 ? 'Gran ' : 'Mini '}  Quiniela:</b> {formatDate(ticket.date)}  </div>
                    <div>
                        <b> Jugada :</b>
                        <div className="d-flex my-2">
                            {ticket && ticket.animals.map((animal, index) => <div className="" key={index}>
                                {animals.map(animal => animal.animalId).includes(animal.id) ?
                                    <b className="btn-jugada win">
                                        {animal.id === 37 ? '00' : animal.id}
                                    </b>
                                    : <b className="btn-jugada lose ">
                                        {animal.id === 37 ? '00' : animal.id}
                                    </b>}
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        }
    </>
    )
}

export default WinnerTicket