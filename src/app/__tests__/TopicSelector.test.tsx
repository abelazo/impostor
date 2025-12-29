import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TopicSelector } from '../components/TopicSelector'

describe('TopicSelector', () => {
  const mockTopics = [
    { id: 'food', title: 'Comida y bebida' },
    { id: 'daily-life', title: 'Objetos de la vida diaria' },
    { id: 'transportation', title: 'Medios de transporte' },
  ]

  it('renders topic options', () => {
    render(<TopicSelector topics={mockTopics} value="food" onChange={vi.fn()} />)
    expect(screen.getByText('Comida y bebida')).toBeInTheDocument()
  })

  it('shows current selection', () => {
    render(<TopicSelector topics={mockTopics} value="food" onChange={vi.fn()} />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('food')
  })

  it('calls onChange when selection changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TopicSelector topics={mockTopics} value="food" onChange={onChange} />)

    await user.selectOptions(screen.getByRole('combobox'), 'transportation')

    expect(onChange).toHaveBeenCalledWith('transportation')
  })

  it('displays all available topics', () => {
    render(<TopicSelector topics={mockTopics} value="food" onChange={vi.fn()} />)

    expect(screen.getByRole('option', { name: 'Comida y bebida' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Objetos de la vida diaria' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Medios de transporte' })).toBeInTheDocument()
  })

  it('has accessible label', () => {
    render(<TopicSelector topics={mockTopics} value="food" onChange={vi.fn()} />)
    expect(screen.getByLabelText(/topic/i)).toBeInTheDocument()
  })
})
