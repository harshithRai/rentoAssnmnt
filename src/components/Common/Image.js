import styled from "styled-components";
import { border, layout } from "styled-system";

export const Image = styled.img`
  ${layout}
  object-fit: cover;
  object-position: 50% 50%;
  ${border}
`;
