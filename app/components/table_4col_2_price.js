const Table4col_2_price = ({ menus, title }) => {
  return (
    <>
      <h3>{title}</h3>
      <table className="menus table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th className="price">1-Course</th>
            <th className="price">2-Course</th>
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
                <td className="price">&pound; {menu.price2.toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table4col_2_price
