import { differenceInYears, differenceInMonths } from 'date-fns'

const declension = (forms: string[], val: number): string => {
    const cases = [2, 0, 1, 1, 1, 2]
    return forms[(val % 100 > 4 && val % 100 < 20) ? 2 : cases[(val % 10 < 5) ? val % 10 : 5]]
}

const calculateAge = (seconds: number): string => {
    const birthDate = new Date(seconds * 1000)
    const age = differenceInYears(new Date(), birthDate)
    if (age > 0) return `${age} ${declension(['год', 'года', 'лет'], age)}`
    const monthAge = differenceInMonths(new Date(), birthDate)
    return `${monthAge} ${declension(['месяц', 'месяца', 'месяцев'], age)}`
}

export default calculateAge
