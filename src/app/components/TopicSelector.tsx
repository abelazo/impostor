'use client'

import type { Topic } from '../lib/wordBank'

interface TopicSelectorProps {
  topics: Topic[]
  value: string
  onChange: (topicId: string) => void
}

export function TopicSelector({ topics, value, onChange }: TopicSelectorProps) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor="topic-select" className="text-lg">
        Topic
      </label>
      <select
        id="topic-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
      >
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.title}
          </option>
        ))}
      </select>
    </div>
  )
}
