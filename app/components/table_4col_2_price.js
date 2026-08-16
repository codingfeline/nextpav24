import _ from 'lodash'

const Table4col_2_price = ({ menus, title }) => {
  const sortedMenus = _.orderBy(menus, ['item_id'])

  return (
    <>
      <h3>{title}</h3>
      <table className="menus table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th className="price max-md:hidden whitespace-nowrap">1-Course</th>
            <th className="price max-md:hidden whitespace-nowrap">2-Course</th>
          </tr>
        </thead>
        <tbody>
          {sortedMenus.map((menu, index) => {
            index++
            return (
              <tr key={index}>
                <td className="row_number">{menu.item_id}</td>
                <td>
                  {menu.item}
                  <div className="price-stacked md:hidden">
                    <div>1-Course: &pound; {menu.price1.toFixed(2)}</div>
                    <div>2-Course: &pound; {menu.price2.toFixed(2)}</div>
                  </div>
                </td>
                <td className="price max-md:hidden">&pound; {menu.price1.toFixed(2)}</td>
                <td className="price max-md:hidden">&pound; {menu.price2.toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table4col_2_price
