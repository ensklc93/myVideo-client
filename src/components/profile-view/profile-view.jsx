import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { MovieCard } from "../movie-card/movie-card"
import PropTypes from "prop-types"

export const ProfileView = ({ user, token, favoriteMovies, onFavoritesUpdate }) => {

  const [updatedUsername, setUpdatedUsername] = useState(user ? user.Username : "")
  const [updatedPassword, setUpdatedPassword] = useState("")
  const [updatedEmail, setUpdatedEmail] = useState(user ? user.Email : "")
  const [updatedBirthday, setUpdatedBirthday] = useState(user ? user.Birthday : "")

  if (!user) {
    return <div>User not found</div>
  }

  const handleSubmit = event => {
    event.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(updatedEmail)) {
      alert("Please enter a valid email address.")
      return
    }

    // Create an object with the updated user data
    const updatedUserData = {
      Username: updatedUsername,
      Password: updatedPassword,
      Email: updatedEmail,
      Birthday: updatedBirthday,
    }

    // Make a PUT request to the server to update the user's information
    fetch(
      `https://my-movie-app-ab91e4bb4611.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          console.error("Validation errors:", data.errors)
          data.errors.forEach(error => {
            if (error.msg) {
              alert(error.msg)
            }
          })
        } else if (data._id) {
          // Check if the response contains the updated user data
          setUpdatedUsername(data.Username)
          setUpdatedPassword(data.Password)
          setUpdatedEmail(data.Email)
          setUpdatedBirthday(data.Birthday)
          localStorage.setItem("user", JSON.stringify(data))
          window.location.href = `/users/${data.Username}`
          alert("Profile updated successfully!")
        } else {
          console.error("Error updating profile:", data)
          alert("Error updating profile. Please try again later.")
        }
      })
      .catch(error => {
        console.error("Error updating profile:", error)
        alert("Error updating profile. Please try again later.")
      })
  }

  const handleDeregister = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return
    }

    fetch(
      `https://my-movie-app-ab91e4bb4611.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(response => {
        if (response.ok) {
          alert("Your account has been deleted.")
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          window.location.href = "/" // Redirect to signup page or any other page
        } else {
          alert("Failed to delete your account. Please try again later.")
        }
      })
      .catch(error => {
        console.error("Error deleting account:", error)
        alert("Error deleting account. Please try again later.")
      })
  }
  
  return (
    <>
      <div className="profile--container">
        <h1>{user.Username}'s Profile</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={updatedUsername}
                onChange={e => setUpdatedUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={updatedPassword}
                onChange={e => setUpdatedPassword(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={updatedEmail}
                onChange={e => setUpdatedEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={updatedBirthday}
                onChange={e => setUpdatedBirthday(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button variant="success" type="submit">
            Update Profile
          </Button>

          <Button variant="danger" onClick={handleDeregister}>
            Delete Account
          </Button>
        </Form>
      </div>

      <h2 className="header--favorite-movies">Favorite Movies</h2>

      <div className="favorite-movies">
        {favoriteMovies.length === 0 ? (
          <p>No favorite movies added yet.</p>
        ) : (
          <div className="d-flex flex-row profile--favorites">
            {favoriteMovies.map(movie => (
              <MovieCard
                key={movie.id}
                user={user}
                movie={movie}
                token={token}
                onFavoritesUpdate={onFavoritesUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    Birthday: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  favoriteMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
}
