import './loader.css';

function Loader(): JSX.Element{
  return (
    <div className='loader-container'>
      <div className="loader-text">Loading<span className="loader-dots"></span></div>
    </div>
  );
}

export default Loader;
