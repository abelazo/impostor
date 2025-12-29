'use client'

import { ParticipantSetup } from './components/ParticipantSetup'

export default function Home() {
  const handleStart = (participantCount: number) => {
    console.log(`Starting game with ${participantCount} participants`)
    // TODO: Navigate to game screen (US-002+)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-black">
      <main className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-6 text-center text-2xl font-bold text-zinc-900 dark:text-white">
          Imposter Game
        </h1>
        <ParticipantSetup onStart={handleStart} />
      </main>
    </div>
  )
}
