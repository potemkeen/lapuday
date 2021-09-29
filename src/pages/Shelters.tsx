import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Header from '../components/Header'
import * as shelter from '../db/repositories/shelter'
import ShelterCard from '../components/ShelterCard'

const Shelters: React.FC = () => {
    const [shelters, setShelters] = useState<Array<shelter.Shelter>>([])

    const fetchPets = async () => {
        const _shelters = await shelter.all()
        setShelters(_shelters)
    }

    useEffect(() => {
        fetchPets()
    }, [])

    return (
        <Box>
            <Header />
            <Container>
                <Box mt={4}>
                    <Typography variant="h2" align="center" fontWeight="normal" fontSize="2rem">
                        Приюты:
                    </Typography>
                    <Box mt={2}>
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {shelters.map((s) => (
                                <Grid item xs={2} sm={4} md={4} key={s.id}>
                                    <ShelterCard shelter={s} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Shelters
