import styled, { css } from 'styled-components'

const FlexRow = styled.div`
  display: flex;
  
  ${props => props.width && css`
    width: ${props.width};
  `}
  
  ${props => props.heigth && css`
    heigth: ${props.heigth};
  `}

`

export default FlexRow;