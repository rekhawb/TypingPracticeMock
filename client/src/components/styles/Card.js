import styled from 'styled-components'

export const StyledCard = styled.div`

  
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 10px 0;
  padding: 40px;
 
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`