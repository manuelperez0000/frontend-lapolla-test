/* eslint-disable react/prop-types */
import images from '../images/images'
import { Link } from 'react-router-dom'
import SideMenu from './sideMenu'
import useUserStore from '../store/userStore'
import useSession from '../hooks/useSession'
import money from '../services/money'

const SideBar = () => {

    const { closeSession } = useSession()
    const { user } = useUserStore();
    return (<>

        <div className='text-center pt-2 px-1'>
            <img src={images.logoPng} alt="apuetalapolla" className='logo' />
        </div>
        <div>
            <h5 className='welcomeSidebarText'>Bienvenido,</h5>
            <div className='text-gray'>
                {user?.name && <span className='sidebarNameEmail'> {user?.name} </span>}

                {user?.email && <span className='sidebarNameEmail'> {user?.email} </span>}

                {user?.ci && <span className='sidebarNameEmail'> {user?.ci} </span>}

                <div className={user.balance >= 0 ? 'text-light' : 'text-danger'}>
                    {money(user.balance)} BS
                </div>
            </div>
        </div>
        <div className='mt-4 mb-4'>
            <ul className='nav d-block'>
                <SideMenu />
                <li className=''>
                    <Link onClick={closeSession} to='/' className='link'>
                        <div className='sidebar-button text-center text-md-start'>
                            <i className='bi bi-box-arrow-up-left' />
                            <span className='d-none d-md-inline'> Cerrar sesion </span>
                        </div>
                    </Link>
                </li>
            </ul>

            {<Link to='/lobby'>
                <button className='btn btn-primary w-100 mt-2'> Lobby </button>
            </Link>}

        </div>

    </>)
}

export default SideBar