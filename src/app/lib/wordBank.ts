export interface Topic {
  id: string
  title: string
}

interface TopicData {
  title: string
  words: string[]
}

// Word bank data (from word-bank/es.yaml)
const WORD_BANK: Record<string, TopicData> = {
  'daily-life': {
    title: 'Objetos de la vida diaria',
    words: [
      'mesa', 'silla', 'puerta', 'ventana', 'cama',
      'lámpara', 'reloj', 'espejo', 'alfombra', 'cortina', 'llaves',
    ],
  },
  'food': {
    title: 'Comida y bebida',
    words: [
      'manzana', 'pan', 'queso', 'leche', 'huevo',
      'pollo', 'arroz', 'ensalada', 'sopa', 'jugo', 'café',
    ],
  },
  'transportation': {
    title: 'Medios de transporte',
    words: [
      'coche', 'bicicleta', 'autobús', 'tren', 'avión',
      'barco', 'moto', 'taxi', 'metro', 'camión', 'patinete',
    ],
  },
}

export function getTopics(): Topic[] {
  return Object.entries(WORD_BANK).map(([id, data]) => ({
    id,
    title: data.title,
  }))
}

export function getWordsForTopic(topicId: string): string[] {
  return WORD_BANK[topicId]?.words ?? []
}

export function selectWordFromTopic(topicId: string, lastWord?: string): string {
  const words = getWordsForTopic(topicId)
  if (words.length === 0) return ''

  // Filter out lastWord if provided and there are other options
  const availableWords = lastWord && words.length > 1
    ? words.filter((w) => w !== lastWord)
    : words

  const randomIndex = Math.floor(Math.random() * availableWords.length)
  return availableWords[randomIndex]
}
