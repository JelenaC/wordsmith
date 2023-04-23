import { forwardRef } from 'react'
import styled from 'styled-components'

export type TButtonType = 'submit' | 'button'

export interface IButton {
  children: React.ReactNode
  type: TButtonType
  className?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = forwardRef<HTMLButtonElement, IButton>(({type = 'button', children, disabled, onClick, className }, ref ) => {
    if(!children)
      return null

    return(
      <UiButton
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </UiButton>
    )
  }
)

export { Button }

const UiButton = styled.button`
  background-color: #003E51;
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  height: 2.281rem;
  min-width: 6rem;
  &:hover {
    background: rgba(0, 62, 81, 0.9);
  };
  &:active {
    background: #003E51;
  };
  &:disabled {
    background: rgba(0, 62, 81, 0.4);
    cursor: not-allowed;
  };
`;
