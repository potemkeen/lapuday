import dictionary from '../constants/dictionary'

const findLabel = (
    field: keyof typeof dictionary,
    value: string | number,
): string | undefined => dictionary[field].find((option) => option.value === value)?.label

export default findLabel
