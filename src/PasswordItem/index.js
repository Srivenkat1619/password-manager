import './index.css'

const PasswordItem = props => {
  const {deletePassword, isPasswordVisible, eachItem} = props
  const {id, websiteName, userName, password} = eachItem

  return (
    <li className="password-item">
      <div className="profile-container">
        <p className="initial">{userName[0].toUpperCase()}</p>
      </div>
      <div className="details-container">
        <p className="website-name">{websiteName}</p>
        <p className="user-name">{userName}</p>
        {isPasswordVisible ? (
          <p className="password-text">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            className="stars-image"
            alt="stars"
          />
        )}
      </div>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={() => deletePassword(id)}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
