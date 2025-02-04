import pino from 'pino'

const logger = pino({
  level: 'debug', // Niveau minimum des logs
  transport: {
    target: 'pino-pretty', // Formatage lisible dans la console
    options: {
      colorize: true, // Ajoute des couleurs aux logs
      translateTime: 'HH:MM:ss Z' // Formatage de l'heure
    }
  }
})

export default logger
