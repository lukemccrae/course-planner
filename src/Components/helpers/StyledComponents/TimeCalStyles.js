import styled from 'styled-components';
import {colors} from '../Colors';

export const List = styled.ul`
  display: inline-flex;
  list-style: none;
  margin: 0 0 15px 5px;
  padding: 0;
  flex-wrap: wrap;
`

export const Detail = styled.strong`
  font-weight: 300;
  font-size: 25px;
`

export const Span = styled.span`
  margin: 5px;
`

export const Color = styled.li`
  margin-right: 5px;
  background-color: ${(props) => colors[props.index + 1]};
  width: 10px;
  height: 5vh;
`