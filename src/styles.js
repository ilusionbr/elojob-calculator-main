import styled, { css } from "styled-components";

export const Container = styled.div`
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Group = styled.div`
  select {
    display: block;
    margin: 10px;
  }
`;

export const Label = styled.h4``;

export const TableContainer = styled.table`
  width: 100%;

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  table tr td,
  table tr th {
    text-align: center;
    padding: 10px;
  }

  table tr.current {
    border: 2px solid tomato;
    background: #ff634754;
  }

  table tr.intent {
    border: 2px solid purple;
    background: #80008069;
  }
`;

const currentStyle = css`
  border: 2px solid tomato;
  background: #ff634754;
`;

export const Legend = styled.div`
  width: 190px;
  height: 40px;
  border: 2px solid purple;
  background: #80008069;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  ${({ current }) => (current ? currentStyle : "")}
`;

export const Result = styled.div``;
export const Message = styled.p`
  color: #c00;
`;
