import styled from "styled-components";
import PropTypes from "prop-types";

const TableRow = styled.tr`
  color: inherit;
  display: table-row;
  vertical-align: middle;
  outline: 0;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0;
  padding: 0;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.primary}15;
  }
  ${(props) => (props.selected ? `background-color: ${props.theme.primary}15` : "")}
`;

TableRow.propTypes = {
  slected: PropTypes.bool,
};

export default TableRow;
