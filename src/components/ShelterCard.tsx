import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Link from '@mui/material/Link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { makeStyles } from '@mui/styles'

import { Shelter } from '../db/repositories/shelter'
import MapComponent from './MapComponent'

const useStyles = makeStyles({
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem',
        '&:last-child': {
            marginBottom: 0,
        },
    },
})

const ShelterCard: React.FC<{ shelter: Shelter }> = ({ shelter }) => {
    const classes = useStyles()

    return (
        <Card sx={{ maxWidth: 400, height: 460 }}>
            <CardHeader
                avatar={(
                    <Avatar
                        alt={shelter.name}
                        src={shelter.logo}
                        sx={{ width: 56, height: 56 }}
                    />
                )}
                title={shelter.name}
                subheader={shelter.city}
            />
            <MapComponent
                lat={shelter.location.latitude}
                lng={shelter.location.longitude}
            />
            <CardContent>
                {shelter.address && (
                    <Box className={classes.infoRow}>
                        <LocationOnIcon color="secondary" />
                        <Box ml={1}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                component={Link}
                                href={`https://yandex.ru/maps/?pt=${shelter.location.longitude},${shelter.location.latitude}&z=12&l=map`}
                                underline="hover"
                                target="_blank"
                                rel="noopener"
                            >
                                {shelter.address}
                            </Typography>
                        </Box>
                    </Box>
                )}
                {shelter.email && (
                    <Box className={classes.infoRow}>
                        <EmailIcon color="secondary" />
                        <Box ml={1}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                component={Link}
                                href={`mailto:${shelter.email}`}
                                underline="hover"
                            >
                                {shelter.email}
                            </Typography>
                        </Box>
                    </Box>
                )}
                {shelter.phone && (
                    <Box className={classes.infoRow}>
                        <PhoneIcon color="secondary" />
                        <Box ml={1}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                component={Link}
                                href={`tel:${shelter.phone}`}
                                underline="hover"
                            >
                                {shelter.phone}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}

export default ShelterCard
