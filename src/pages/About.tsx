import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Header from '../components/Header'

const About: React.FC = () => (
    <Box>
        <Header />
        <Container>
            <Box mt={4}>
                <Typography variant="body1">
                    Эта страница пока не готова
                </Typography>
            </Box>
        </Container>
    </Box>
)

export default About
