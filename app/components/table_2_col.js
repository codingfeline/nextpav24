import parse from 'html-react-parser'

const Table2_col = ({ menus, title }) => {
  return (
    <>
      <h3>{title}</h3>
      <table className="menus table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu, index) => {
            index++
            return (
              <tr key={index}>
                <td className="row_number">{index}</td>
                <td>{parse(menu.item)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table2_col
