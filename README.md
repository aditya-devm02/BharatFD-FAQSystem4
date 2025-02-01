# FAQ Management System

A full-stack FAQ management system with multilingual support, built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Redis (Caching)
- Jest (Testing)
- Google Translate API (Translation Service)

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Axios
- React-Quill (Rich Text Editor)

## Features

- Create and manage FAQs
- Multi-language support (English, French, Spanish)
- Rich text editing for answers
- Caching system for improved performance
- Responsive design
- Admin panel for content management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB
- Redis

## Installation & Setup

1. **Clone the repository**
   ```sh
   cd BharatFD-FAQSystem4
   git clone https://github.com/your-username/faq-management.git](https://github.com/aditya-devm02/BharatFD-FAQSystem4.git
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory and add:
     ```sh
     MONGO=your_mongodb_connection_string
     REDIS_HOST=your_redis_connection_string
     REDIS_PORT=
     PORT=8000
     RAPID_API_HOST=
     ```

4. **Start the server**
   ```sh
   npm start
   ```

5. **Start the client**
   ```sh
   cd client
   npm start
   ```

## API Usage (cURL Examples)

### Create a new FAQ
```sh
curl 'http://localhost:8000/api/faqs' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  --data-raw '{"question":"what does BharatFD does?","answer":"BharatFD is a platform that helps Indian users compare and invest in fixed deposits (FDs) from trusted banks. It provides easy management of FDs, access to the latest interest rates, secure KYC, and 24/7 support. The platform partners with banks to offer competitive rates, including options for senior citizens."}'
```

### Get all FAQs
```sh
curl --request GET \
  --url http://localhost:8000/api/faqs 
```

## Screenshots



![Screenshot 1](https://github.com/aditya-devm02/BharatFD-FAQSystem4/blob/main/screenshots/Screenshot%202025-02-01%20at%207.39.34%E2%80%AFPM.png)
![Screenshot 2](https://github.com/aditya-devm02/BharatFD-FAQSystem4/blob/main/screenshots/Screenshot%202025-02-01%20at%207.44.48%E2%80%AFPM.png)
![Screenshot 3](https://github.com/aditya-devm02/BharatFD-FAQSystem4/blob/main/screenshots/Screenshot%202025-02-01%20at%207.44.14%E2%80%AFPM.png)

![Screenshot 4](https://github.com/aditya-devm02/BharatFD-FAQSystem4/blob/main/screenshots/Screenshot%202025-02-01%20at%207.45.04%E2%80%AFPM.png)
![Screenshot 5](https://github.com/aditya-devm02/BharatFD-FAQSystem4/blob/main/screenshots/Screenshot%202025-02-01%20at%207.45.18%E2%80%AFPM.png)
![Screenshot 6](https://github.com/aditya-devm02/BharatFD-FAQSystem4/blob/main/screenshots/Screenshot%202025-02-01%20at%207.45.51%E2%80%AFPM.png)
![Screenshot 7](https://github.com/aditya-devm02/BharatFD-FAQSystem4/blob/main/screenshots/Screenshot%202025-02-01%20at%207.46.10%E2%80%AFPM.png)
  
  
   ```
3. Commit and push the images to the repository so they are accessible in the README file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

