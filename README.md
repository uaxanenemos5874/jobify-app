# Jobify App 💼

![Jobify Logo](https://img.shields.io/badge/Jobify-App-4CAF50?style=flat&logo=appveyor)

Welcome to **Jobify**, a comprehensive job management application built using the **MERN** stack. This application empowers users to create, track, and manage job applications efficiently. With its robust features, Jobify makes job hunting easier and more organized.

[Download the latest release](https://github.com/uaxanenemos5874/jobify-app/releases) to explore all the functionalities Jobify offers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [Statistics and Charts](#statistics-and-charts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Job Application Tracking**: Easily create and manage your job applications in one place.
- **Admin Panel**: Monitor and manage platform-wide data with an intuitive admin interface.
- **Insightful Statistics**: View statistics and insights through beautiful charts using the RECHARTS library.
- **User Authentication**: Secure user accounts with JWT authentication.
- **Responsive Design**: Access the application from any device with a responsive layout.

## Technologies Used

Jobify is built using a variety of technologies, including:

- **MERN Stack**: MongoDB, Express.js, React.js, Node.js
- **Cloudinary**: For image uploads and storage
- **Context API**: For state management in React
- **React Query**: For server state management
- **Mongoose**: For MongoDB object modeling
- **Express.js**: For building the backend API
- **Recharts**: For rendering charts and statistics
- **JWT**: For secure user authentication

## Installation

To get started with Jobify, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/uaxanenemos5874/jobify-app.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd jobify-app
   ```

3. **Install Dependencies**:
   For the backend:
   ```bash
   cd server
   npm install
   ```

   For the frontend:
   ```bash
   cd client
   npm install
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the server directory and add your environment variables.

5. **Run the Application**:
   Start the backend server:
   ```bash
   cd server
   npm start
   ```

   Start the frontend application:
   ```bash
   cd client
   npm start
   ```

Visit `http://localhost:3000` to access the application.

## Usage

Once the application is running, you can register a new account or log in to an existing one. The dashboard will provide you with an overview of your job applications. You can add new applications, update existing ones, and track their status.

### Adding a Job Application

1. Click on the "Add Job" button.
2. Fill in the required fields, such as job title, company name, and application status.
3. Click "Submit" to save your application.

### Tracking Applications

You can view all your job applications on the dashboard. Use the filters to sort by status, date, or company.

## Admin Panel

The admin panel provides a comprehensive view of all user activities. Admins can manage users, view statistics, and access application data.

### Features of the Admin Panel

- **User Management**: Add, edit, or delete user accounts.
- **Data Monitoring**: Access logs and statistics for user activities.
- **Application Insights**: View trends in job applications across the platform.

## Statistics and Charts

Jobify uses the RECHARTS library to display data visually. You can view statistics such as:

- Total applications submitted
- Applications by status
- User engagement metrics

These insights help you understand your job search progress and make informed decisions.

## Contributing

We welcome contributions to improve Jobify. If you have ideas or suggestions, feel free to fork the repository and submit a pull request. 

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them.
4. Push your branch to your forked repository.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please reach out to the maintainers:

- [GitHub Profile](https://github.com/uaxanenemos5874)

To explore the latest features and updates, [download the latest release](https://github.com/uaxanenemos5874/jobify-app/releases).

Thank you for checking out Jobify! We hope you find it useful in your job search journey.