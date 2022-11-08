import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { GlobalFilter } from './TableSearch';
import { PageButton } from '../helpers/Button';
import { TableStatusPills } from '../components/TableStatusPills';
import { TableActionButtons } from '../components/TableActionButtons';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export const CreateTable = () => {
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [actualPage, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .get('https://backend-practica-necodex.vercel.app/api/practicantes', {
        params: { limit, skip },
      })
      .then((res) => {
        setTotal(res.data.total);
        setTotalPages(Math.floor(res.data.total / limit) + 1);
        setData(res.data.practicantes, []);
      });
  };

  useEffect(() => {
    getData();
  }, [limit, skip]);

  const newnextPage = () => {
    setPage(actualPage + 1);
    setSkip(skip + limit);
  };

  const newpreviousPage = () => {
    setPage(actualPage - 1);
    setSkip(skip - limit);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Email',
        accessor: 'correo',
      },
      {
        Header: 'Estatus',
        accessor: 'status',
        Cell: TableStatusPills,
      },
      {
        Header: 'Acciones',
        accessor: 'uid',
        Cell: (e) => {
          return (
            <TableActionButtons
              value={e.value}
              data={e.cell.row.original}
              status={e.cell.row.values.status}
              getData={getData}
            ></TableActionButtons>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  if (data.length === 0) {
    return (
      <>
        <h1 className='grid content-center gap-4 auto-rows-auto grid-cols-1 text-center font-large leading-tight text-5xl text-gray-300'>
          No se ha registrado ningun practicante... 👻
        </h1>
      </>
    );
  } else {
    return (
      <>
        <div className='grid content-center gap-4 auto-rows-auto grid-cols-1'>
          <div className='rounded-lg bg-gray-100 text-gray-900'>
            <main className='px-5 pt-5 pb-3'>
              <div className=''>
                <h1 className='pb-3 text-xl font-semibold'>📌 Catalogo de practicantes</h1>

                {/* SearchBar */}
                <div className='flex gap-x-2'>
                  <GlobalFilter
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    total={total}
                  />
                </div>

                {/* Columns & Rows */}
                <div className='mt-2 flex flex-col'>
                  <div className='-my-2 overflow-x-auto sm:-mx-auto lg:-mx-0'>
                    <div className='py-2 align-middle inline-block min-w-full sm:px-0 lg:px-8'>
                      <div className='shadow overflow-hidden border-b border-gray-300 sm:rounded-lg'>
                        <table {...getTableProps()} className='min-w-full divide-y divide-gray-300'>
                          <thead className=' bg-gray-50'>
                            {headerGroups.map((headerGroup) => (
                              <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                  <th
                                    scope='col'
                                    className='px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    {...column.getHeaderProps()}
                                  >
                                    {column.render('Header')}
                                  </th>
                                ))}
                              </tr>
                            ))}
                          </thead>

                          <tbody
                            {...getTableBodyProps()}
                            className='bg-gray-50 divide-y divide-gray-200'
                          >
                            {page.map((row, i) => {
                              prepareRow(row);
                              return (
                                <tr {...row.getRowProps()}>
                                  {row.cells.map((cell) => {
                                    return (
                                      <td
                                        {...cell.getCellProps()}
                                        className='px-6 py-5 whitespace-nowrap'
                                      >
                                        {cell.render('Cell')}
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                <div className='py-3 flex items-center justify-between'>
                  <div className='flex-1 flex items-center justify-between'>
                    <div className='flex gap-x-2'>
                      <span className='text-sm text-gray-700'>
                        Pagina <span className='font-medium'>{actualPage}</span> de
                        <span className='pl-1 font-medium'>{totalPages}</span>
                      </span>
                      <label>
                        <span className='sr-only'>Items Per Page</span>
                        <select
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                          value={limit}
                          onChange={(e) => {
                            setLimit(Number(e.target.value));
                          }}
                        >
                          {[5, 10, 20].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                              Mostrar {pageSize}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div>
                      <nav
                        className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                        aria-label='Pagination'
                      >
                        {actualPage <= 1 ? (
                          <PageButton onClick={newpreviousPage} disabled>
                            <span className='sr-only'>Previous</span>
                            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                          </PageButton>
                        ) : (
                          <PageButton onClick={newpreviousPage}>
                            <span className='sr-only'>Previous</span>
                            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                          </PageButton>
                        )}
                        {actualPage >= totalPages ? (
                          <PageButton onClick={newnextPage} disabled>
                            <span className='sr-only'>Next</span>
                            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                          </PageButton>
                        ) : (
                          <PageButton onClick={newnextPage}>
                            <span className='sr-only'>Next</span>
                            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                          </PageButton>
                        )}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
};
