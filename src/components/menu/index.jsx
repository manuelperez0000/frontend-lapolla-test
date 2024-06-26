import { Link } from "react-router-dom"
import image from '../../images/images'
import styles from './menu.module.css'
import useUserStore from "../../store/userStore"

const Menu = () => {

    const { user } = useUserStore()

    return (<div className="bg-dark p-2 border-bottom border-secondary" >
        <div className="container">
            <div className="row">
                <div className="col-12 flex-between">
                    <div className="">
                        <Link to='/' ><img height='80px' src={image.logoPng} alt="Apuestalapolla" /></Link>
                        <span className={`${styles.titleLogo} d-none d-ms-none d-md-none d-lg-inline-block`}>Apuestas La Polla</span>
                    </div>
                    {!user._id ? (
                        <div className="d--block d-sm-flex">
                            <Link to='/login' className="mx-2">
                                <button className="btn btn-warning mx-1  px-4 box-shadow-btn-landing btn-land-1 form-control mb-1">
                                    <i className="bi bi-box-arrow-in-right mx-2" />
                                    Iniciar sesion
                                </button>
                            </Link>
                            <Link to='/register' className="mx-2" >
                                <button className="btn btn-warning mx-1  px-4 box-shadow-btn-landing btn-land-2 form-control mb-1">
                                    <i className="bi bi-cloud-arrow-up mx-2" />
                                    Registrarme
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="d--block d-sm-flex">
                            <Link to='/lobby' className="mx-2">
                                <button className="btn btn-warning mx-1  px-4 box-shadow-btn-landing btn-land-1 form-control mb-1">
                                    <i className="bi bi-controller mx-2"></i>
                                    Lobby
                                </button>
                            </Link>
                            {user.level !== 5 && <>
                                <Link to='/dashboard/users' className="mx-2">
                                    <button className="btn btn-warning mx-1  px-4 box-shadow-btn-landing btn-land-2 form-control mb-1">
                                        <i className="bi bi-list mx-2"></i>
                                        Admin
                                    </button>
                                </Link>
                            </>}
                        </div>
                    )}


                </div>
            </div>
        </div>
    </div>)
}

export default Menu