import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Header from '../components/Header'
import PetCard from '../components/PetCard'
import * as pet from '../db/repositories/pet'

const Home: React.FC = () => {
    const [pets, setPets] = useState<Array<pet.Pet>>([])

    const fetchPets = async () => {
        const _pets = await pet.all(6)
        setPets(_pets)
    }

    useEffect(() => {
        fetchPets()
    }, [])

    return (
        <Box>
            <Header />
            <Container>
                <Box mt={5}>
                    <Typography variant="h2" align="center" fontWeight="normal" fontSize="2rem">
                        Питомцы, которые ищут дом
                    </Typography>
                    <Box mt={3}>
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {pets.map((p) => (
                                <Grid item xs={2} sm={4} md={4} key={p.id}>
                                    <PetCard pet={p} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Home
