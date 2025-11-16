import { Link } from 'react-router-dom'
import notFoundAPNG from '../../assets/images/AnimatedSticker-ezgif.com-gif-maker.png'

export const NotFound = () => {
    return (
        <div className="notFound flex-center g24">
            <img src={notFoundAPNG} alt="" />
            <div className="textBox flex-column flex-center g24">
                <span className="headingText">404</span>
                <span className="paragraphText">Вы попали на несуществующую страницу <br/>
                попробуйте <Link to={"/"}>перейти на главную</Link></span>
            </div>
        </div>
    )
}