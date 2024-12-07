import { GiChiliPepper } from 'react-icons/gi'
import reactStringReplace from 'react-string-replace'

const Table4col_1_price = ({ menus, title }) => {
  return (
    <>
      <h3>{title}</h3>
      <table className="menus table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Description</th>
            <th className="price">Price</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu, index) => {
            const desc = reactStringReplace(menu.description, '*', (match, i) => (
              <GiChiliPepper key={i} />
            ))
            index++
            return (
              <tr key={menu.id}>
                <td className="row_number">{index}</td>
                <td>{menu.item}</td>
                <td>{desc}</td>
                <td className="price">&pound; {menu.price1.toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table4col_1_price
