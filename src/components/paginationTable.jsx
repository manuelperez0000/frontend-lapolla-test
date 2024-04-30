import usePagination from '../hooks/usePagination'
import { Table, Pagination, Form } from 'react-bootstrap';
import useEditUserStore from '../store/editUserStore'
import { userType } from '../services/utils'
import { Link } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
const PaginationTable = ({users, deleteModal}) => {
    
    const { setEditUser } = useEditUserStore()
    const { totalPages, currentPage, itemsPerPage, currentItems, prevPage, setCurrentPage, nextPage , handleItemsPerPageChange} = usePagination(users)
    
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Tipo</th>
                        <th>Cedula</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td> {index} </td>
                            <td >
                                {item.name}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td>{item.phone}</td>
                            <td>{userType(item.level)}</td>
                            <td>{item.ci}</td>
                            <td>
                                <Link to="/dashboard/editUser" >
                                    <button onClick={() => setEditUser(item)} className='btn btn-warning mx-1'> <i className='bi bi-card-text' /> </button>
                                </Link>
                                <button onClick={() => deleteModal(item)} className='btn btn-danger mx-1'> <i className='bi bi-dash-square' />   </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
  
            <Pagination>
                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />
                <Form.Control style={{ width: '50px'}} as="select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </Form.Control>
            </Pagination>
        </div>
    );
};

export default PaginationTable;