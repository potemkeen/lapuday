import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { YMaps } from 'react-yandex-maps'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { amber, purple } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'

import Home from './pages/Home'
import Pets from './pages/Pets'
import PetProfile from './pages/PetProfile'
import Shelters from './pages/Shelters'
import * as ROUTES from './constants/routes'
import './App.css'
import About from './pages/About'

const theme = createTheme({
    palette: {
        primary: {
            main: amber[500],
        },
        secondary: {
            main: purple[500],
        },
    },
})

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <YMaps>
            <Router>
                <Switch>
                    <Route path={ROUTES.PET_PROFILE}>
                        <PetProfile />
                    </Route>
                    <Route path={ROUTES.PETS}>
                        <Pets />
                    </Route>
                    <Route path={ROUTES.SHELTERS}>
                        <Shelters />
                    </Route>
                    <Route path={ROUTES.ABOUT}>
                        <About />
                    </Route>
                    <Route path={ROUTES.HOME}>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </YMaps>
    </ThemeProvider>
)

export default App
