import styled from "styled-components";

export const MileBox = styled.tr`
  border-bottom: 1px solid #D3D3D3;
`

export const MileTableHead = styled.th`
  width: ${(props) => props.width + "px"};
`

export const SliderBox = styled.div`
  width: 50%;
  margin: 0 0 20px 0;

`

export const TableData = styled.td`
  width: 50px;
`

export const Detail = styled.strong`
  font-weight: 300;
  font-size: 20px;
`

export const ArrowRight = styled.div`
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`

export const ArrowLeft = styled.div`
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`

