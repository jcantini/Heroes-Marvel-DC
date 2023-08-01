import { AuthProvider } from "./auth"
import { AppRouter } from "./router/AppRouter"

const HeroesApp = () => {
  return (
    <AuthProvider> {/* De esta forma comparto la info del provaider con toda la app */}
      
      <AppRouter/>

    </AuthProvider>
  )
}

export default HeroesApp
