import { useState } from "react";

const useInput = (initialValue = '') => {
    // state
    const [value, setValue] = useState(initialValue);

    // handler
    const handler = (e) =>{
        setValue(e.target.value);
        
    }
    const reset = () =>{
        setValue('')
    }
    return [value, handler, reset, ]
}
export default useInput;