import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    count: 0,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isPasswordVisible: false,
  }

  onWebsiteInputChange = event => {
    this.setState({websiteInput: event.target.value})
  }

  onUsernameInputChange = event => {
    this.setState({usernameInput: event.target.value})
  }

  onPasswordInputChange = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onCheckboxChange = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }))
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(each => each.id !== id),
    }))
  }

  onAddButton = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newObject = {
      id: uuidv4(),
      websiteName: websiteInput,
      userName: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newObject],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      count: prevState.passwordList.length + 1,
    }))
  }

  render() {
    const {
      passwordList,
      searchInput,
      websiteInput,
      usernameInput,
      passwordInput,
      isPasswordVisible,
    } = this.state
    const filteredList = passwordList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="add-password-card">
          <form className="add-password-form" onSubmit={this.onAddButton}>
            <h1 className="form-heading">Add New Password</h1>

            <div className="input-group">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-icon"
                alt="website"
              />
              <input
                type="text"
                className="input-field"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={this.onWebsiteInputChange}
              />
            </div>

            <div className="input-group">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-icon"
                alt="username"
              />
              <input
                type="text"
                className="input-field"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={this.onUsernameInputChange}
              />
            </div>

            <div className="input-group">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-icon"
                alt="password"
              />
              <input
                type="password"
                className="input-field"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={this.onPasswordInputChange}
              />
            </div>

            <button className="add-button" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="password-manager-sm-img"
            alt="password manager"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager-lg-img"
            alt="password manager"
          />
        </div>

        <div className="passwords-display-card">
          <div className="display-header">
            <div className="count-container">
              <h1 className="your-passwords-heading">Your Passwords</h1>
              <p className="passwords-count">{filteredList.length}</p>
            </div>
            <div className="search-group">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="search-icon"
                alt="search"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearchChange}
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="show-passwords-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onChange={this.onCheckboxChange}
            />
            <label htmlFor="checkbox" className="show-passwords-label">
              Show Passwords
            </label>
          </div>

          {filteredList.length > 0 ? (
            <ul className="passwords-list">
              {filteredList.map(eachItem => (
                <PasswordItem
                  key={eachItem.id}
                  eachItem={eachItem}
                  isPasswordVisible={isPasswordVisible}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          ) : (
            <div className="no-passwords-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-passwords-image"
                alt="no passwords"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
