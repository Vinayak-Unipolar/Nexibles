import { useState } from 'react';

const Edittables = () => {
    const [columns, setColumns] = useState(2);
    const [rows, setRows] = useState(2);
    const [tableData, setTableData] = useState([]);

    const handleColumnsChange = (event) => {
        const newColumns = parseInt(event.target.value);
        setColumns(newColumns);
    };

    const handleRowsChange = (event) => {
        const newRows = parseInt(event.target.value);
        setRows(newRows);
    };

    const createTable = () => {
        const table = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                row.push(`Row ${i + 1}, Col ${j + 1}`);
            }
            table.push(row);
        }
        setTableData(table);
    };

    return (
        <div className="">
            <div className="w-[300px] h-[500px] overflow-y-auto bg-white p-6">
                <h3 className="text-black text-2xl font-semibold">Tables</h3>
                <p className="text-black">Create your table below, then select it to update text, color, layout, and more.</p>
                <div className="mt-4">
                    <label htmlFor="columns" className="text-black">Columns</label>
                    <input
                        type="number"
                        id="columns"
                        value={columns}
                        onChange={handleColumnsChange}
                        className="border border-gray-500 rounded-md px-3 py-2 mt-2 mr-2 outline-none text-black"
                    />
                    <label htmlFor="rows" className="text-black flex flex-col mt-2">Rows</label>
                    <input
                        type="number"
                        id="rows"
                        value={rows}
                        onChange={handleRowsChange}
                        className="border border-gray-500 rounded-md px-3 py-2 mt-2 mr-2 outline-none text-black"
                    />
                    <button
                        onClick={createTable}
                        className="bg-[#30384E] rounded-md text-white px-8 py-2 mt-4 "
                    >
                        Add Table
                    </button>
                </div>
                {tableData.length > 0 && (
                    <div className="mt-4">
                        <table className="border-collapse border border-gray-500">
                            <tbody>
                                {tableData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cellData, cellIndex) => (
                                            <td key={cellIndex} className="border border-gray-500 p-2">
                                                {cellData}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Edittables;
