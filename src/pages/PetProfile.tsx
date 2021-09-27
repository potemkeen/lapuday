import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'

import Header from '../components/Header'
import ShelterCard from '../components/ShelterCard'
import * as pet from '../db/repositories/pet'
import getPetTitle from '../utils/getPetTitle'
import calculateAge from '../utils/calculateAge'
import * as ROUTES from '../constants/routes'
import dictionary from '../constants/dictionary'
import findLabel from '../utils/findLabel'

const useStyles = makeStyles({
    description: {
        whiteSpace: 'pre-line',
    },
    carouselImage: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
    },
})

const PetProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [profile, setProfile] = useState<pet.Pet | null>()
    const { shelter } = profile || {}
    const [currentSlide, setCurrentSlide] = useState(0)
    const classes = useStyles()

    const handleCarouselClick = () => {
        if (!profile) return
        setCurrentSlide((prev) => (prev === profile.photos.length - 1 ? 0 : prev + 1))
    }

    const updateCurrentSlide = (index: number) => {
        if (currentSlide !== index) {
            setCurrentSlide(index)
        }
    }

    const fetchPet = async (petId: string) => {
        const res = await pet.get(petId)
        setProfile(res)
    }

    useEffect(() => {
        fetchPet(id)
    }, [id])

    return (
        <Box>
            <Header />
            {profile && (
                <Container>
                    <Box mt={5}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to={ROUTES.HOME}>
                                Главная
                            </Link>
                            <Link to={ROUTES.PETS}>
                                Найти питомца
                            </Link>
                            <Typography color="text.primary">{profile.name}</Typography>
                        </Breadcrumbs>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Box>
                                <Typography variant="h1" fontSize="2rem" fontWeight="normal">
                                    {`${getPetTitle(profile)} ${profile.name}, ${calculateAge(profile.birthDate.seconds)}`}
                                </Typography>
                                <ul>
                                    <li>{findLabel('sex', profile.sex)}</li>
                                    <li>{findLabel('size', profile.size)}</li>
                                    <li>{findLabel('hair', profile.hair)}</li>
                                    <li>{findLabel('temperament', profile.temperament)}</li>
                                    {profile.spec.map((spec) => (
                                        <li key={spec}>{findLabel('spec', spec)}</li>
                                    ))}
                                </ul>
                                <Typography
                                    className={classes.description}
                                >
                                    {profile.description}
                                </Typography>
                                <Box mt={4}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{ marginRight: '2rem' }}
                                    >
                                        Взять питомца
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="secondary"
                                    >
                                        Добавить в избранное
                                    </Button>
                                </Box>
                            </Box>
                            <Box flex="0 0 400px" ml={4}>
                                <Carousel
                                    showThumbs={false}
                                    selectedItem={currentSlide}
                                    onClickItem={handleCarouselClick}
                                    onChange={updateCurrentSlide}
                                >
                                    {profile.photos.map((p) => (
                                        <Box
                                            className={classes.carouselImage}
                                            sx={{ backgroundImage: `url("${p}")` }}
                                            key={p}
                                        />
                                    ))}
                                </Carousel>
                                {shelter && (
                                    <Box mt={4}>
                                        <ShelterCard shelter={shelter} />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            )}
        </Box>
    )
}

export default PetProfile
