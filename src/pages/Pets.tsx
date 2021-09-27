import React, { useEffect, useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import _ from 'lodash'

import Header from '../components/Header'
import * as pet from '../db/repositories/pet'
import PetCard from '../components/PetCard'
import dictionary from '../constants/dictionary'

const Pets: React.FC = () => {
    const [filter, setFilter] = useState<Record<string, (value: never) => boolean>>({})
    const [filterValues, setFilterValues] = useState({
        name: '',
        type: '',
        sex: '',
        hair: '',
        temperament: '',
        color: [],
    })
    const [pets, setPets] = useState<Array<pet.Pet>>([])

    const fetchPets = async () => {
        const _pets = await pet.all(6)
        setPets(_pets)
    }

    const searchResults = useMemo<Array<pet.Pet>>(() => _.filter(pets, _.conforms(filter)),
        [pets, filter])

    useEffect(() => {
        fetchPets()
    }, [])

    const removeFilter = (property: string) => {
        setFilter((prev) => {
            const state = { ...prev }
            delete state[property]
            return state
        })
        setFilterValues((prev) => ({
            ...prev,
            [property]: '',
        }))
    }

    const filterExact = (property: string, rule: string) => {
        if (rule) {
            setFilter((prev) => ({
                ...prev,
                [property]: (value: string) => value === rule,
            }))
            setFilterValues((prev) => ({
                ...prev,
                [property]: rule,
            }))
        } else {
            removeFilter(property)
        }
    }

    const filterIncludes = (property: string, rule: string) => {
        setFilter((prev) => ({
            ...prev,
            [property]: (value: string) => value.toLowerCase().includes(rule.toLowerCase()),
        }))
        setFilterValues((prev) => ({
            ...prev,
            [property]: rule,
        }))
    }

    const filterArrayContain = (property: string, rule: string[]) => {
        setFilter((prev) => ({
            ...prev,
            [property]: (value: string[]) => _.difference(rule, value).length === 0,
        }))
        setFilterValues((prev) => ({
            ...prev,
            [property]: rule,
        }))
    }

    return (
        <Box>
            <Header />
            <Container>
                <Box mt={5} display="flex" justifyContent="space-between">
                    <Box flex="0 0 250px" mr={4}>
                        <Box>
                            <FormControl fullWidth>
                                <TextField
                                    id="name-search"
                                    label="Поиск по кличке"
                                    type="search"
                                    onChange={(e) => filterIncludes('name', e.target.value)}
                                    value={filterValues.name}
                                />
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl fullWidth>
                                <InputLabel id="type-select-label">Кого вы ищете</InputLabel>
                                <Select
                                    labelId="type-select-label"
                                    id="type-select"
                                    label="Кого вы ищете"
                                    onChange={(e: SelectChangeEvent) => filterExact('type', e.target.value)}
                                    value={filterValues.type}
                                >
                                    <MenuItem value="">Не важно</MenuItem>
                                    {dictionary.type.map((item) => (
                                        <MenuItem
                                            value={item.value}
                                            key={item.value}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl fullWidth>
                                <InputLabel id="sex-select-label">Пол</InputLabel>
                                <Select
                                    labelId="sex-select-label"
                                    id="sex-select"
                                    label="Пол"
                                    onChange={(e: SelectChangeEvent) => filterExact('sex', e.target.value)}
                                    value={filterValues.sex}
                                >
                                    <MenuItem value="">Любой</MenuItem>
                                    {dictionary.sex.map((item) => (
                                        <MenuItem
                                            value={item.value}
                                            key={item.value}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl fullWidth>
                                <InputLabel id="hair-select-label">Шерсть</InputLabel>
                                <Select
                                    labelId="hair-select-label"
                                    id="hair-select"
                                    label="Шерсть"
                                    onChange={(e: SelectChangeEvent) => filterExact('hair', e.target.value)}
                                    value={filterValues.hair}
                                >
                                    <MenuItem value="">Любая</MenuItem>
                                    {dictionary.hair.map((item) => (
                                        <MenuItem
                                            value={item.value}
                                            key={item.value}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl fullWidth>
                                <InputLabel id="temperament-select-label">Характер питомца</InputLabel>
                                <Select
                                    labelId="temperament-select-label"
                                    id="temperament-select"
                                    label="Характер питомца"
                                    onChange={(e: SelectChangeEvent) => filterExact('temperament', e.target.value)}
                                    value={filterValues.temperament}
                                >
                                    <MenuItem value="">Любой</MenuItem>
                                    {dictionary.temperament.map((item) => (
                                        <MenuItem
                                            value={item.value}
                                            key={item.value}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl fullWidth>
                                <InputLabel id="color-select-label">Окрас</InputLabel>
                                <Select
                                    labelId="color-select-label"
                                    id="color-select"
                                    label="Окрас"
                                    multiple
                                    onChange={(e: SelectChangeEvent<typeof filterValues.color>) => filterArrayContain('color', e.target.value as string[])}
                                    value={filterValues.color}
                                >
                                    {dictionary.color.map((item) => (
                                        <MenuItem
                                            value={item.value}
                                            key={item.value}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box flex="1">
                        <Typography>{`Найдено: ${searchResults.length}`}</Typography>
                        <Box mt={2}>
                            <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                                {searchResults.map((p) => (
                                    <Grid item xs={2} sm={4} md={4} key={p.id}>
                                        <PetCard pet={p} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Pets
