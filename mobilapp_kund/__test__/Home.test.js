import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from './../components/Home';

describe('Home', () => {
    it('shows the text when the user login', () => {
      const user = { first_name: 'Test' };
      const { queryByText } = render(
        <Home running={false} user={user} setRunning={() => {}} setScooterId={() => {}} />,
      );
  
      expect(queryByText('Welcome Test!')).toBeTruthy();
      expect(queryByText('Select a scooter to start your journey.')).toBeTruthy();
    });
  });
  