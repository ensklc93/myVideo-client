# myVideoApp

myVideoApp is a client-side application built using React. It is designed to interface with an existing server-side REST API and database to provide a comprehensive movie browsing experience. 

## Objective

The objective of this project is to use [React](https://reactjs.org/) to build the client-side for an app called myVideo based on its existing [server-side code](https://github.com/ensklc93/Movie-API)(REST API and database).

## Project Structure

The project is structured into several components, each responsible for different parts of the application:

- **MainView**: The main component that handles the display of movies and user interactions.
- **ProfileView**: Allows users to view and update their profile information.
- **LoginView**: Handles user authentication.
- **SignupView**: Allows new users to register.
- **MovieCard**: Displays individual movie details and allows users to add/remove movies from their favorites.
- **MovieView**: Provides detailed information about a selected movie.
- **FilterView**: Allows users to filter movies by genre or director.
- **NavigationBar**: Provides navigation links for easy access to different parts of the application.

## Features

- **User Authentication**: Users can log in and sign up.
- **Profile Management**: Users can update their profile information and delete their account.
- **Movie Browsing**: Users can browse movies, view details, and filter by genre or director.
- **Favorites Management**: Users can add or remove movies from their favorites list.

## Technologies Used

- **React**: For building the user interface.
- **Bootstrap**: For styling and responsive design.
- **React-Bootstrap**: For Bootstrap components in React.
- **React Router**: For navigation and routing.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/myVideo-client.git
   ```

2. Navigate to the project directory:
    ```
    cd myVideo-client
    ```

3. Install the dependencies:
    ```
    npm install
    ```

4. Start the development server:
    ```
    npm start
    ```

## Deployment

The application is configured to be deployed on [Netlify](https://www.netlify.com/) . Ensure that your netlify.toml file is correctly set up for redirects.

The live demo of this project can be visited here: [myVideoApp](https://myvideo-ensklc.netlify.app/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License .