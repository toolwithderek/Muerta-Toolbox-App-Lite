function TopBarTitle(props) {
  const { title, introduce } = props;
  return (
    <div className="Head">
      <div className="flex-container">
        <div className='flex-item left-item'>
          <h4 className="Title apple-title">{title}</h4>
          {introduce && (<h6 className='text-introduce'>{introduce}</h6>) }
        </div>
      </div>
    </div>
  );
}
export default TopBarTitle;
