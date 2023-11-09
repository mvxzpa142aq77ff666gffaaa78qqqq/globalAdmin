import React , {useContext} from 'react'
import AppContext from './ServiceContext'
import { redirect } from 'react-router-dom'

function Redirectt({path ,component}) {
    const {valideLogin} = useContext(AppContext)
    return valideLogin ? (
        redirect("/")
        //<Route exact path = {path}  component = {component}/>
    ) : (
        redirect("/login")
    )
}

export default Redirectt