import { Container, TableContainer, Legend } from "./styles";

const Table = ({ values, currentIndex, intentIndex }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const renderClass = (index) => {
    index = String(index);

    const objetctClass = {
      [currentIndex]: "current",
      [intentIndex]: "intent",
      default: ""
    };

    return objetctClass[index || "default"];
  };

  return (
    <Container>
      <h2>Legend Of Table</h2>
      <Legend current>Current</Legend>
      <Legend>Intent</Legend>

      <TableContainer>
        <table border="2">
          <thead>
            <tr>
              <th>index</th>
              <th>id</th>
              <th>lvl</th>
              <th>name</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => (
              <tr key={value.id} className={renderClass(index)}>
                <td>{index}</td>
                <td>{value.id}</td>
                <td>{value.lvl}</td>
                <td>{value.name}</td>
                <td>{formatCurrency(value.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default Table;
