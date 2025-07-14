# Weather App – Full Stack Assignment (Fidenz Technologies)

This repository contains a full-stack weather application built as part of the Software Engineer Intern recruitment process at Fidenz Technologies. The application demonstrates secure user authentication, real-time weather data retrieval, responsive frontend design, and in-memory API caching.

---

## Assignment Overview

### Objective

Develop a secure web/API application that retrieves and displays weather data using modern full-stack development principles, incorporating authentication and authorization via Auth0.

---

## Application Functionality

### Authentication & Authorization

- Users must log in via Auth0 to access the application.
- Multi-Factor Authentication (MFA) is enabled through email.
- Only pre-approved users can access the app; public signup is disabled.

### Weather Dashboard

- After login, users are redirected to the weather dashboard.
- The dashboard displays weather cards for selected cities.
- Each card shows city name, temperature, weather condition, and basic metrics.

### Add City

- Users can search for cities using the input bar.
- Real-time suggestions help identify matching city names.
- Clicking "Add City" appends a new weather card to the dashboard.

### Card Detail View

- Clicking on a weather card opens a detailed view.
- The view includes pressure, humidity, wind, visibility, sunrise, and sunset.
- Users can return to the dashboard using the back button.

---

## Technologies Used

- **Frontend:** React, Axios, Auth0 SDK, CSS
- **Backend:** Node.js, Express, JWT, node-cache
- **Authentication:** Auth0, express-jwt, jwks-rsa
- **External API:** OpenWeatherMap API

---

## Project Structure

```
app/
├── Backend/
│   ├── server.js
│   ├── routes/weather.js
│   ├── services/weatherService.js
│   ├── middleware/auth.js
│   └── data/cities.json
├── Frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   ├── assets/
│   │   └── index.js
│   └── public/index.html
```

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Auth0 account with:
  - Allowed callback URLs set to `http://localhost:3000`
  - MFA enabled
  - Public signup disabled
  - Test account:
    - Email: careers@fidenz.com
    - Password: Pass#fidenz

### Backend Setup

```bash
cd app/Backend
npm install
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd app/Frontend
npm install
```

Start the frontend server:

```bash
npm start
```

Visit the application at [http://localhost:3000](http://localhost:3000)

---

## Author

Submitted by:  
**Maneth Pankaja Hasindu**  
Software Engineer Intern Applicant  

---

## License

This project is submitted for evaluation as part of the Fidenz internship recruitment process and is not intended for commercial or production use.
README_clean.md
Displaying README_clean.md.
