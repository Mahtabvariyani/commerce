export const formatData = ( amount: number)=>{
    return new Intl.NumberFormat(
        'en-US',{
            style: 'currency',
            currency:'EUR'
        }
    ).format(amount)
} 