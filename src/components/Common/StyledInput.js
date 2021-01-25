import styled from "styled-components";
import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
} from "styled-system";

export const StyledInputBox = styled.input.attrs((props) => ({
  type: props.type ? props.type : "text",
  required: props.required ? props.required : false,
  maxlength: props.maxLength ? props.maxLength : null,
}))`
  appearance: none;
  border: ${(props) => (props.border ? props.border : 0)};
  font-family: inherit;
  padding: 10px 10px 10px 10px;
  font-size: 14px;
  font-weight: 400;
  background: rgba(250, 250, 250, 1);
  box-shadow: inset 0 -1px 0 rgba(245, 245, 245, 0.8);
  color: rgb(9, 44, 76);
  transition: all 0.4s ease;
  border-radius: 5px;
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
    background: rgba(255, 255, 255, 1);
    box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.7);
  }
  }
  &:focus {
    background: rgba(256, 256, 256, 1);
    outline: none;
    box-shadow: 0 0 4px 1px #3bcea8;
    transform: scale(1.02);
  }
`;
