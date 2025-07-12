# 🌍 WorldWise - Your Personal Travel Companion

> **Track your adventures, one city at a time!**

WorldWise is a beautiful React application that helps you keep track of all the amazing places you've visited around the world. With an interactive map, city tracking, and personal notes, never forget your travel memories again!

## ✨ Features

-   🗺️ **Interactive World Map** - Powered by Leaflet with OpenStreetMap
-   📍 **City Tracking** - Mark and remember every city you've visited
-   📝 **Personal Notes** - Add memories and experiences for each destination
-   🏳️ **Country Flags** - Beautiful emoji flags for each country
-   📅 **Travel Dates** - Keep track of when you visited each place
-   📱 **Responsive Design** - Works perfectly on desktop and mobile
-   ⚡ **Fast & Modern** - Built with React 19 and Vite

## 🚀 Getting Started

### Prerequisites

-   Node.js (version 16 or higher)
-   npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd world-wise
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Start the JSON server** (in a separate terminal)

    ```bash
    npm run server
    ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application in action!

## 🛠️ Tech Stack

-   **Frontend**: React 19, React Router DOM
-   **Styling**: CSS Modules
-   **Maps**: Leaflet, React Leaflet
-   **Build Tool**: Vite
-   **Mock API**: JSON Server
-   **Linting**: ESLint

## 📁 Project Structure

```
world-wise/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts for state management
│   ├── pages/          # Page components
│   └── main.jsx        # Application entry point
├── data/
│   └── cities.json     # Sample city data
└── public/             # Static assets
```

## 🎯 How to Use

1. **Homepage** - Learn about WorldWise and start tracking
2. **App Dashboard** - Your main travel tracking interface
3. **Add Cities** - Use the form to add new cities you've visited
4. **View Cities** - Browse your visited cities with details
5. **Interactive Map** - See all your cities marked on the world map

## 🔧 Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run server` - Start JSON server for mock API
-   `npm run lint` - Run ESLint

## 🌟 Key Features Explained

### Interactive Map

The application uses Leaflet to display an interactive world map where all your visited cities are marked with custom markers. Click on any marker to see city details!

### City Management

-   Add new cities with the form component
-   View detailed information about each city
-   Add personal notes and memories
-   Track visit dates

### Responsive Design

The application is fully responsive and works beautifully on all device sizes, from mobile phones to desktop computers.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   [Leaflet](https://leafletjs.com/) for the amazing mapping library
-   [OpenStreetMap](https://www.openstreetmap.org/) for the map tiles
-   [React](https://reactjs.org/) for the incredible framework
-   [Vite](https://vitejs.dev/) for the fast build tool

---

**Ready to start tracking your adventures?** 🚀

_"The world is a book, and those who do not travel read only one page." - Saint Augustine_
