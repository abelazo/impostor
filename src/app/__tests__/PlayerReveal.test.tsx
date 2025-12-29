import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlayerReveal } from '../components/PlayerReveal'

describe('PlayerReveal', () => {
  const defaultProps = {
    playerNumber: 1,
    isImpostor: false,
    word: 'apple',
    onNext: vi.fn(),
    isLastPlayer: false,
  }

  describe('initial state (word hidden)', () => {
    it('shows player number', () => {
      render(<PlayerReveal {...defaultProps} />)
      expect(screen.getByText(/player 1/i)).toBeInTheDocument()
    })

    it('shows "Show the word" button initially', () => {
      render(<PlayerReveal {...defaultProps} />)
      expect(screen.getByRole('button', { name: /show the word/i })).toBeInTheDocument()
    })

    it('does not show the word initially', () => {
      render(<PlayerReveal {...defaultProps} />)
      expect(screen.queryByText('apple')).not.toBeInTheDocument()
    })

    it('does not show "IMPOSTOR" initially', () => {
      render(<PlayerReveal {...defaultProps} isImpostor={true} />)
      expect(screen.queryByText(/impostor/i)).not.toBeInTheDocument()
    })
  })

  describe('after clicking "Show the word"', () => {
    it('shows the word for non-impostor', async () => {
      const user = userEvent.setup()
      render(<PlayerReveal {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /show the word/i }))

      expect(screen.getByText('apple')).toBeInTheDocument()
    })

    it('shows "IMPOSTOR" for impostor', async () => {
      const user = userEvent.setup()
      render(<PlayerReveal {...defaultProps} isImpostor={true} />)

      await user.click(screen.getByRole('button', { name: /show the word/i }))

      expect(screen.getByText(/impostor/i)).toBeInTheDocument()
    })

    it('does not show the word for impostor', async () => {
      const user = userEvent.setup()
      render(<PlayerReveal {...defaultProps} isImpostor={true} />)

      await user.click(screen.getByRole('button', { name: /show the word/i }))

      expect(screen.queryByText('apple')).not.toBeInTheDocument()
    })

    it('shows "Got it!" button after revealing', async () => {
      const user = userEvent.setup()
      render(<PlayerReveal {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /show the word/i }))

      expect(screen.getByRole('button', { name: /got it/i })).toBeInTheDocument()
    })

    it('hides "Show the word" button after revealing', async () => {
      const user = userEvent.setup()
      render(<PlayerReveal {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /show the word/i }))

      expect(screen.queryByRole('button', { name: /show the word/i })).not.toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('calls onNext when clicking "Got it!"', async () => {
      const user = userEvent.setup()
      const onNext = vi.fn()
      render(<PlayerReveal {...defaultProps} onNext={onNext} />)

      await user.click(screen.getByRole('button', { name: /show the word/i }))
      await user.click(screen.getByRole('button', { name: /got it/i }))

      expect(onNext).toHaveBeenCalled()
    })

    it('shows "Start Again" for last player instead of "Got it!"', async () => {
      const user = userEvent.setup()
      render(<PlayerReveal {...defaultProps} isLastPlayer={true} />)

      await user.click(screen.getByRole('button', { name: /show the word/i }))

      expect(screen.getByRole('button', { name: /start again/i })).toBeInTheDocument()
    })
  })
})
