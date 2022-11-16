import './empty-query.css';

function EmptyQuery(): JSX.Element{
  return (
    <div className='info-container'>
      <div className="info-text">По вашему запросу ничего не найдено</div>
    </div>
  );
}

export default EmptyQuery;
