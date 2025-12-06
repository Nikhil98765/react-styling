import styled from "styled-components";

export const StyledSearchForm = styled.form`
  padding: 10px 0 20px 0;
  display: flex;
  align-items: baseline;
`;

export const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    background: #171212;
    color: #ffffff;
  }

  &.invalid {
    text-decoration: line-through;
  }
`;

export const StyledButtonLarge = styled(StyledButton)`
  padding: 10px;
`;
