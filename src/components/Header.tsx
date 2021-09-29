import React from 'react'
import { useLocation, Link, NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { purple } from '@mui/material/colors'

import * as ROUTES from '../constants/routes'

const useStyles = makeStyles({
    banner: {
        backgroundImage: `url("${process.env.PUBLIC_URL}/images/background2.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    bannerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '30rem',
    },
    bannerText: {
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    menu: {
        alignItems: 'baseline',
    },
    menuItem: {
        marginLeft: '2rem',
        textDecoration: 'none',
        color: '#fff',
        '&:first-child': {
            marginLeft: 0,
        },
        padding: '.2rem',
    },
    menuItemActive: {
        borderBottom: '2px solid',
        borderBottomColor: purple[500],
    },
})

const Header: React.FC = () => {
    const classes = useStyles()
    const location = useLocation()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ background: 'none' }}>
                    <Container>
                        <Box className={classes.menu}>
                            <Typography
                                variant="h6"
                                component={NavLink}
                                to={ROUTES.HOME}
                                className={classes.menuItem}
                            >
                                ЛапуДай
                            </Typography>
                            <NavLink
                                to={ROUTES.PETS}
                                className={classes.menuItem}
                                activeClassName={classes.menuItemActive}
                            >
                                Найти питомца
                            </NavLink>
                            <NavLink
                                to={ROUTES.SHELTERS}
                                className={classes.menuItem}
                                activeClassName={classes.menuItemActive}
                            >
                                Приюты
                            </NavLink>
                            <NavLink
                                to={ROUTES.ABOUT}
                                className={classes.menuItem}
                                activeClassName={classes.menuItemActive}
                            >
                                О проекте
                            </NavLink>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
            {location.pathname === ROUTES.HOME && (
                <Box className={classes.banner}>
                    <Container>
                        <Box className={classes.bannerContent}>
                            <Typography variant="h1" align="center" color="#fff" fontWeight="bold" fontSize="3rem">
                                Здесь люди находят четвероногих
                                друзей из приютов
                            </Typography>
                            <Typography variant="h3" align="center" color="#fff" fontWeight="normal" fontSize="1.5rem">
                                Кошки и собаки ищут хозяина
                            </Typography>
                            <Box mt={4}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    component={Link}
                                    to={ROUTES.PETS}
                                >
                                    Найти друга
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            )}
        </Box>
    )
}

export default Header
