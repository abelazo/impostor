'use client'

import { useState } from 'react'

interface PlayerRevealProps {
  playerNumber: number
  isImpostor: boolean
  word: string
  onNext: () => void
  isLastPlayer: boolean
}

export function PlayerReveal({
  playerNumber,
  isImpostor,
  word,
  onNext,
  isLastPlayer,
}: PlayerRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  const handleReveal = () => {
    setIsRevealed(true)
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
        Player {playerNumber}
      </h2>

      {!isRevealed ? (
        <button
          onClick={handleReveal}
          className="rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Show the word
        </button>
      ) : (
        <>
          <div className="flex min-h-[120px] items-center justify-center">
            {isImpostor ? (
              <span className="text-4xl font-bold text-red-600">IMPOSTOR</span>
            ) : (
              <span className="text-4xl font-bold text-green-600">{word}</span>
            )}
          </div>

          <button
            onClick={onNext}
            className="rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white hover:bg-green-700"
          >
            {isLastPlayer ? 'Start Again' : 'Got it!'}
          </button>
        </>
      )}
    </div>
  )
}
