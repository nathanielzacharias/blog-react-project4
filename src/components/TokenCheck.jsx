import {Navigate} from 'react-router-dom'


function TokenCheck(props) {

    const token = localStorage.getItem('user_token')
    if (token) {
        return (
            <Navigate to={'/'} />
        )
    }
    
    return (
        <props.component></props.component>
    )
}

export default TokenCheck