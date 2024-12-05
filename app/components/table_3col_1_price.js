const Table3col_1_price = ({ menus, title }) => {
  return (
    <>
      <h3>{title}</h3>
      <table className="menus table-auto drinks">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th className="price">Price</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu, index) => {
            index++
            return (
              <tr key={index}>
                <td className="row_number">{index}</td>
                <td>{menu.item}</td>
                <td className="price">&pound; {menu.price1.toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table3col_1_price
