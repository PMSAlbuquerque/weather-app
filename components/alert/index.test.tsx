import React from 'react'
import { render, screen } from '@testing-library/react'
import Alert from '.'

describe('Alert', () => {
    it('should renders <Alert/> component with error', () => {
        render(<Alert error={'Error'} />);

        const errorText = screen.getByText('Error');

        expect(errorText).toBeInTheDocument();
    })

    it('should not render <Alert/>', () => {
        const {container} = render(<Alert error={null} />);

        expect(container).toBeEmptyDOMElement();
    })
})
