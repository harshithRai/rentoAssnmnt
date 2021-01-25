import styled from "styled-components";
import {
  space,
  color,
  position,
  typography,
  border,
  layout,
  grid,
  flexbox,
  background,
  shadow,
} from "styled-system";

export const CustomButton = styled.button.attrs((props) => ({
  type: props.type ? props.type : "button",
}))`
  cursor: pointer;
  ${layout}
  ${space}
    ${color}
    ${typography}
    ${border}
    ${grid}
    ${flexbox}
    ${background}
    ${shadow}
    ${position}
    &:hover {
    border: 10px;
    box-shadow: 0 0 8px 2px ${(props) => props.bg};
    background-color: ${(props) => (props ? props.bgColorOnHover : props.bg)};
  }
`;
