import axios from "axios"






export const getBoard = async () => {
                                            
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/boards?dormitory=Gryffindor`)
    
    
    
    return response
}



export const addBoard = async () => {

}