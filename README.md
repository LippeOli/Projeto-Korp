# Finance Control - Angular Application

## 📋 Description
Finance Control is a web application built with Angular for managing personal finances. It allows users to add, edit, view, and delete expenses while categorizing them. The project showcases core Angular features and implements a clean architecture for CRUD operations integrated with a backend API.

---

## ✨ Features
- **CRUD Functionality**: Full implementation of Create, Read, Update, and Delete operations for expense management.
- **Reactive Forms**: User-friendly forms with validations for capturing expense details.
- **Angular Standalone Components**: Utilizes Angular 18's `standalone: true` components.
- **HTTP Client Integration**: Communicates with a backend API for database interactions.
- **Routing**: Modularized Angular routing system for navigating between pages.
- **Category-based Charts**: Visualize expenses by category using **Chart.js**.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or above)
- **Angular CLI** (v18 or above)
- **.NET SDK** (for backend API)
- **PostgreSQL** (as database)
- A running backend API for expenses (default URL: `http://localhost:5117/api/expenses`)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/finance-control.git
   cd finance-control
   ```

2. Install dependencies for frontend:
   ```bash
   cd FinanceControlFrontend
   npm install
   ```

3. Start the frontend development server:
   ```bash
   ng serve
   ```

4. Configure and start the backend API:
   ```bash
   cd ../FinanceControlAPI
   dotnet restore
   dotnet run
   ```

5. Access the app at:
   [http://localhost:4200](http://localhost:4200)

---

## 🛠️ Project Structure
```
finance-control/
├── FinanceControlAPI/       # Backend API built with C# .NET
│   ├── Controllers/
│   ├── Models/
│   ├── Program.cs
│   └── appsettings.json
├── FinanceControlFrontend/  # Frontend application built with Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── expenses/
│   │   │   │   │   ├── expenses.component.ts
│   │   │   │   │   ├── expenses.component.html
│   │   │   │   │   ├── expenses.component.css
│   │   │   ├── services/
│   │   │   │   ├── expenses.service.ts
│   │   ├── main.ts
│   │   ├── styles.css
├── angular.json
├── package.json
```

### Key Files:
- **`expenses.component.ts`**: Handles UI and logic for managing expenses.
- **`expenses.service.ts`**: Manages HTTP requests to the backend API.
- **`app.routes.ts`**: Configures Angular routing.
- **`FinanceControlAPI`**: Backend folder containing API logic and database interaction.

---

## 🎨 Features Breakdown
1. **Reactive Forms**:
   - Used for creating and editing expenses with validation.
2. **HTTP Client**:
   - Manages API requests for CRUD operations.
3. **Charts**:
   - Visualize expenses by category in the `category-chart` component using **Chart.js**.
4. **Routing**:
   - Supports modular navigation.
5. **Standalone Components**:
   - Modern Angular 18 design.

---

## 📚 API Endpoints
- **GET** `/api/expenses`: Retrieve all expenses.
- **POST** `/api/expenses`: Create a new expense.
- **PUT** `/api/expenses/:id`: Update an existing expense.
- **DELETE** `/api/expenses/:id`: Delete an expense.

---

## 💻 Technologies Used
- Angular 18+
- TypeScript
- RxJS
- Chart.js
- C# .NET
- PostgreSQL
- HTML5/CSS3
- Node.js (for API communication)

---

## 🤝 Contributions
Contributions, issues, and feature requests are welcome! Feel free to fork the repository and submit pull requests.

---

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🙌 Acknowledgments
Special thanks to the contributors and the open-source community for their support.
