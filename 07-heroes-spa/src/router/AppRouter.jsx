import { Route, Routes } from "react-router-dom"

import { LoginPage } from "../auth"
import { HeroesRoutes } from "../heroes"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"


export const AppRouter = () => {
  return (
    <>
         <Routes>

            <Route path="login" element={
                <PublicRoute>
                  <LoginPage/>
                </PublicRoute>
            } /> 

            {/* Voy a proteger la esta ruta <HeroesRoutes/>*/}
            <Route path="/*" element= {
                <PrivateRoute>
                   <HeroesRoutes/>
                </PrivateRoute>
            } />

            {/* Asi era sin protección. Puedo usarlo así con alguna ruta que no requiera protección
            <Route path="login" element={<LoginPage/>} /> 
            <Route path="/*" element={<HeroesRoutes/>} /> 
            */}

        </Routes>
    </>
  )
}

