import { differenceInMonths } from 'date-fns'
import { Pet } from '../db/repositories/pet'

const titleMap = {
    cat: {
        cub: 'Котенок',
        boy: 'Кот',
        girl: 'Кошка',
    },
    dog: {
        cub: 'Щенок',
        boy: 'Пес',
        girl: 'Собака',
    },
}

const getPetTitle = (pet: Pet): string => {
    const birthDate = new Date(pet.birthDate.seconds * 1000)
    const monthAge = differenceInMonths(new Date(), birthDate)
    if (monthAge < 12) return titleMap[pet.type].cub
    return titleMap[pet.type][pet.sex]
}

export default getPetTitle
