import styled, { css, DefaultTheme } from 'styled-components';

export const TableCss = (theme: DefaultTheme) => css`
  border-spacing: 0;
  tbody tr:nth-child(2n) {
    background-color: ${theme.backgroundBasicColor2};
  }
  tbody tr:hover {
    background: ${theme.backgroundBasicColor3} !important;
  }

  thead tr {
    background: ${theme.backgroundBasicColor2};
    th {
      border-top: 1px solid ${theme.backgroundBasicColor3};
      border-left: 1px solid ${theme.backgroundBasicColor3};
      :last-child {
        border-right: 1px solid ${theme.backgroundBasicColor3};
      }
    }
  }

  tr {
    :last-child {
      td {
        border: 1px solid ${theme.backgroundBasicColor2};
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-top: 1px solid ${theme.backgroundBasicColor2};
    border-left: 1px solid ${theme.backgroundBasicColor2};
    :last-child {
      border-right: 1px solid ${theme.backgroundBasicColor2};
    }
  }
  td {
    padding: 1rem 0.5rem;

    &:first-child {
      font-weight: 500;
    }
    a {
      color: ${({ theme }) => theme.linkTextColor};
      font-weight: ${({ theme }) => theme.cardTextFontWeight};
      text-decoration: none;
      &:hover {
        color: ${({ theme }) => theme.linkTextHoverColor};
        text-decoration: underline;
      }
    }
  }

`;

const Table = styled.table`
width: 100%;
${({theme}) => TableCss(theme)}
  &.striped {
    tbody tr:nth-child(odd) {
      background: ${({ theme }) => theme.layoutBackgroundColor};
    }

    td {
      padding: 1rem 0.5rem;
    }
  }
  .color-swatch {
    display: inline-block;
    border: 1px solid black;
    width: 0.875rem;
    height: 0.875rem;
    margin-left: 7px;
    margin-bottom: -2px;
    border-radius: 2px;
  }
`;
export default Table;
