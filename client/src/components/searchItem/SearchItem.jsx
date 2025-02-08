import "./SearchItem.css";

const SearchItem = () => {
  return (
    <div className="search-item">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt="Tower Street Apartments"
        className="search-item-img"
      />
      <div className="search-item-info">
        <h2 className="search-item-title">Tower Street Apartments</h2>
        <p className="search-item-distance">500m from center</p>
        <p className="search-item-taxi-op">Free airport taxi</p>
        <p className="search-item-subtitle">
          Studio Apartment with Air Conditioning
        </p>
        <p className="search-item-features">
          Entire studio • 1 bathroom • 21m² • 1 full bed
        </p>
        <p className="search-item-cancel-op">Free cancellation</p>
        <p className="search-item-cancel-op-subtitle">
          You can cancel later, so lock in this great price today!
        </p>
        <div className="search-item-rating">
          8.9 <span>Excellent</span>
        </div>
        <div className="search-item-details">
          <div className="search-item-price">$112</div>
          <div className="search-item-check-container">
            <p className="search-item-tax-op">Includes taxes and fees</p>
            <button className="search-item-check-button">
              See availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
