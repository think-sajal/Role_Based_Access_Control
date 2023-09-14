import { useTable } from "react-table"

const Table = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
    return (
        <>
            { rows.length ? 
                <table className="border" {...getTableProps()}>
                    <thead className="border">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th className="border p-2 text-center" {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                key={new Date().getTime()}
                                                className="border p-2 text-center"
                                                style={{ minWidth: '150px' }}
                                                {...cell.getCellProps()}
                                            >{cell.render('Cell')}</td>   
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table> :
                <div>No Data Found</div>
            }
        </>
    )
}

export default Table