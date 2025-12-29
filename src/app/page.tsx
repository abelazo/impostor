'use client'

import { useState } from 'react'
import { ParticipantSetup } from './components/ParticipantSetup'
import { PlayerReveal } from './components/PlayerReveal'
import { assignRoles, selectWord, type GameState } from './lib/gameLogic'

type GamePhase = 'setup' | 'playing'

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>('setup')
  const [gameState, setGameState] = useState<GameState | null>(null)

  const handleStart = (config: { participantCount: number; impostorCount: number }) => {
    const roles = assignRoles(config.participantCount, config.impostorCount)
    const word = selectWord()

    setGameState({
      roles,
      word,
      currentPlayerIndex: 0,
    })
    setPhase('playing')
  }

  const handleNext = () => {
    if (!gameState) return

    const nextIndex = gameState.currentPlayerIndex + 1
    if (nextIndex >= gameState.roles.length) {
      // Game over, reset to setup
      setPhase('setup')
      setGameState(null)
    } else {
      setGameState({
        ...gameState,
        currentPlayerIndex: nextIndex,
      })
    }
  }

  const currentPlayer = gameState?.roles[gameState.currentPlayerIndex]
  const isLastPlayer = gameState
    ? gameState.currentPlayerIndex === gameState.roles.length - 1
    : false

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-black">
      <main className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-6 text-center text-2xl font-bold text-zinc-900 dark:text-white">
          Impostor Game
        </h1>

        {phase === 'setup' && <ParticipantSetup onStart={handleStart} />}

        {phase === 'playing' && currentPlayer && gameState && (
          <PlayerReveal
            key={currentPlayer.playerNumber}
            playerNumber={currentPlayer.playerNumber}
            isImpostor={currentPlayer.isImpostor}
            word={gameState.word}
            onNext={handleNext}
            isLastPlayer={isLastPlayer}
          />
        )}
      </main>
    </div>
  )
}
