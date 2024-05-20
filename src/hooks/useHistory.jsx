import { useState, useEffect } from 'react';
import useTicket from '../hooks/useTicket';
import loadingStore from '../store/loadingStore';
import formatDate from '../services/formatDate'

const useHistory = () => {

    const { getTickets } = useTicket()
    const [ tickets, setTickets ] = useState([])
    const { loading } = loadingStore()
    const [ dataLocal, setDataLocal ] = useState({
        from: formatDate(new Date()).split('/').reverse().join('-'),
        to: formatDate(new Date()).split('/').reverse().join('-')
    })
   
    const stateTickets = async () => {
        const tickets = await getTickets(dataLocal.from, dataLocal.to);
        setTickets(tickets);
    };

    const handleDate = (data) => {
        setDataLocal({
            ...dataLocal,
            [data.target.id]: data.target.value
        })
    }

    const TEXTSTATUS = {
        1: { color: 'warning', text: 'En espera' },
        2: { color: 'danger', text: 'Perdedor' },
        3: { color: 'success', text: 'Ganador' }
    }

    const queryTickets = () => {
        setTickets([])
        stateTickets()
    }
    
    useEffect(() => {stateTickets()}, [])

    return {
        tickets,
        loading,
        TEXTSTATUS,
        dataLocal,
        queryTickets,
        handleDate
    }
}

export default useHistory