import parse from 'html-react-parser'
import _ from 'lodash'

const Table3_col = ({ menus, title }) => {
  const sortedMenus = _.orderBy(menus, ['item_id'])

  return (
    <>
      <h3>{title}</h3>
      <table className="menus table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Description</th>
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
                  <span className="winePrices md:!hidden">
                    {menu.price1 && menu.price2 && menu.price3 ? (
                      <div className="flex flex-col w-full">
                        <i>175ml: &pound; {menu.price1.toFixed(2)}</i>
                        <i>250ml: &pound; {menu.price2.toFixed(2)}</i>
                        <i>bottle: &pound; {menu.price3.toFixed(2)}</i>
                      </div>
                    ) : (
                      ''
                    )}
                    {!menu.price1 && !menu.price2 && menu.price3 && (
                      <i>bottle: &pound; {menu.price3.toFixed(2)}</i>
                    )}
                  </span>
                </td>
                <td>
                  {parse(menu.description)}
                  <span className="winePrices max-md:!hidden">
                    {menu.price1 && menu.price2 && menu.price3 ? (
                      <div className="flex justify-between w-full">
                        <i>175ml: &pound; {menu.price1.toFixed(2)}</i>
                        <i>250ml: &pound; {menu.price2.toFixed(2)}</i>
                        <i>bottle: &pound; {menu.price3.toFixed(2)}</i>
                      </div>
                    ) : (
                      ''
                    )}
                    {!menu.price1 && !menu.price2 && menu.price3 && (
                      <i>bottle: &pound; {menu.price3.toFixed(2)}</i>
                    )}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table3_col
