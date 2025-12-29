import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home', () => {
  it('renders the game title', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: /imposter game/i })).toBeInTheDocument()
  })

  it('renders the participant setup', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: /add participant/i })).toBeInTheDocument()
  })
})
