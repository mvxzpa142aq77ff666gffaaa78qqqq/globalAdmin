import React ,{useContext}from 'react'
import { Navigate } from 'react-router-dom'
import AppContext from '../contexts/ServiceContext'

function Protected({ isAlloweb, children }) {
  const { valideLogin } = useContext(AppContext)
  const enable = window.localStorage.getItem("enableT")

  if (!valideLogin) {
    return <Navigate to="/signIn" replace />
  }
  return children
}

export default Protected