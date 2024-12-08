import parse from 'html-react-parser'
import _ from 'lodash'

const Table2_col = ({ menus, title }) => {
  const sortedMenus = _.orderBy(menus, ['item_id'])

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
          {sortedMenus.map((menu, index) => {
            index++
            return (
              <tr key={index}>
                <td className="row_number">{menu.item_id}</td>
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
