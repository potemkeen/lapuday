import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'

import { Pet } from '../db/repositories/pet'
import * as ROUTES from '../constants/routes'
import calculateAge from '../utils/calculateAge'

const PetCard: React.FC<{ pet: Pet}> = ({ pet }) => {
    const [favorite, setFavorite] = useState(false)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to={`${ROUTES.PETS}/${pet.id}`}>
                <CardMedia
                    component="img"
                    height="300"
                    image={pet.photos[0]}
                    alt={pet.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {pet.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {calculateAge(pet.birthDate.seconds)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={() => setFavorite((prev) => !prev)}
                >
                    <FavoriteIcon
                        color={favorite ? 'error' : 'disabled'}
                    />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default PetCard
