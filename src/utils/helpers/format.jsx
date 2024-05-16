export const formatNumberToCurrency = (number) => {
  // Formatear el número como moneda
  const formattedNumber = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS', // Utiliza el símbolo de peso argentino
  }).format(number)

  return formattedNumber
}
