import { describe, it, expect } from 'vitest'
import { getTopics, getWordsForTopic, selectWordFromTopic } from '../lib/wordBank'

describe('wordBank', () => {
  describe('getTopics', () => {
    it('returns list of available topics', () => {
      const topics = getTopics()
      expect(topics.length).toBeGreaterThan(0)
    })

    it('each topic has id and title', () => {
      const topics = getTopics()
      topics.forEach((topic) => {
        expect(topic.id).toBeTruthy()
        expect(topic.title).toBeTruthy()
      })
    })

    it('includes expected topics', () => {
      const topics = getTopics()
      const topicIds = topics.map((t) => t.id)
      expect(topicIds).toContain('daily-life')
      expect(topicIds).toContain('food')
      expect(topicIds).toContain('transportation')
    })
  })

  describe('getWordsForTopic', () => {
    it('returns words for a valid topic', () => {
      const words = getWordsForTopic('food')
      expect(words.length).toBeGreaterThan(0)
    })

    it('returns expected words for food topic', () => {
      const words = getWordsForTopic('food')
      expect(words).toContain('manzana')
      expect(words).toContain('pan')
    })

    it('returns empty array for invalid topic', () => {
      const words = getWordsForTopic('invalid-topic')
      expect(words).toEqual([])
    })
  })

  describe('selectWordFromTopic', () => {
    it('returns a word from the specified topic', () => {
      const word = selectWordFromTopic('food')
      const allFoodWords = getWordsForTopic('food')
      expect(allFoodWords).toContain(word)
    })

    it('returns different words on multiple calls', () => {
      const words = new Set<string>()
      for (let i = 0; i < 20; i++) {
        words.add(selectWordFromTopic('food'))
      }
      expect(words.size).toBeGreaterThan(1)
    })

    it('avoids returning the same word as lastWord', () => {
      const lastWord = 'manzana'
      // Run multiple times to verify it avoids lastWord
      for (let i = 0; i < 10; i++) {
        const word = selectWordFromTopic('food', lastWord)
        expect(word).not.toBe(lastWord)
      }
    })

    it('returns a word even if lastWord is provided and topic has multiple words', () => {
      const word = selectWordFromTopic('food', 'pan')
      expect(word).toBeTruthy()
      expect(word).not.toBe('pan')
    })
  })
})
