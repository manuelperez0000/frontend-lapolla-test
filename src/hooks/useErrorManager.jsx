import useNotify from "./useNotify"
const useErrorManager = () => {
    const { notify } = useNotify()

    return (error) => {
        console.log("ErrorManager: ", error)
        try {
            //error en mongodb datos invalidos o requeridos
            const error0 = error.response.data.message || false
            if (error0) throw error.response.data.message

            const error1 = error.response.data.message.message || false
            if (error1) throw error.response.data.message.message
            
            const error2 = error.response.data.message || false
            if (error2) throw error.response.data.message
            
            if (error.message) throw error.message
            throw "Error desconocido"

        } catch (error) {
            notify.error(error)
        }
    }
}

export default useErrorManager