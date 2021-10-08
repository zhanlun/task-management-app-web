import { render, screen } from '@testing-library/react';
import { Navbar } from './components/Layout/Navbar';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom';
import { useSelector, useDispatch } from 'react-redux'

const mockDispatch = jest.fn();
jest.mock('react-redux');

test('renders navbar without buttons for guest', () => {
  const history = createMemoryHistory()
  useDispatch.mockImplementation(mockDispatch)
  useSelector.mockImplementation((fn) => fn({
    user: {},
  }))
  render(
    <Router history={history}>
      <Navbar />
    </Router>
  );
  const linkElement = screen.getByText(/task management app/i);
  expect(linkElement).toBeInTheDocument();

  const createBoardBtn = screen.queryByText(/create board/i)
  expect(createBoardBtn).toBeNull()

  const loginBtn = screen.queryByText(/logout/i)
  expect(loginBtn).toBeNull()
});

test('renders navbar with buttons for logged in user', async () => {
  const history = createMemoryHistory()
  useDispatch.mockImplementation(mockDispatch)
  useSelector.mockImplementation((fn) => fn({
    user: {
      accessToken: 'accessToken'
    }
  }))

  render(
    <Router history={history}>
      <Navbar />
    </Router>
  );
  const linkElement = screen.getByText(/task management app/i);
  expect(linkElement).toBeInTheDocument();

  const createBoardBtn = screen.getByText(/Create board/i)
  expect(createBoardBtn).toBeInTheDocument()

  const loginBtn = screen.getByText(/logout/i)
  expect(loginBtn).toBeInTheDocument()
});
