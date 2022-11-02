import './loading-screen.css';

function LoadingScreen(): JSX.Element{
  return (
    <>
      <div className="text">Loading...</div>
      <div className="loader"></div>
    </>
  );
}

export default LoadingScreen;
