import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './offline-screen.css';
import { Link } from 'react-router-dom';

function OfflineScreen(): JSX.Element {
  return (
    <>
      <Icons/>
      <div className="wrapper">

        <Header/>

        <main>
          <div className="page-message">
            <h1 className="page-message__title">В данный момент сайт недоступен</h1>
            <span className="page-message__text">Попробуйте ещё раз позднее</span>
            <Link className="page-message__link" to='/'>Страница каталога</Link>
          </div>
        </main>

        <Footer/>

      </div>
    </>
  );
}
export default OfflineScreen;
