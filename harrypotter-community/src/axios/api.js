import axios from "axios"






export const getBoard = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    
    
    return response
}