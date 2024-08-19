# Menu Management API with Node.js

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## 📋 Project Overview

This project is a robust backend API for managing a menu system, built with Node.js, Express.js, and MongoDB. The application allows you to handle categories, subcategories, and items with full CRUD (Create, Read, Update, Delete) functionality.'

## 🚀 Features

- **Category Management**: Create, retrieve and update categories.
- **Subcategory Management**: Manage subcategories under each category.
- **Item Management**: Manage items under subcategories or directly under categories.
- **Search Items**: Easily search for items by name.

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shamshubham/guestara-assignment
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     `env
PORT=3000
MONGO_URI=mongodb://localhost:27017/yourdbname
`
4. Run the application:
   ```bash
   npm start
   ```

## 📂 Project Structure

```
src
├── config
│   └── dbConfig.js
├── routes
│   ├── category.js
│   ├── subCategory.js
│   └── items.js
├── controllers
│   ├── category.js
│   ├── subCategory.js
│   └── items.js
├── models
│   ├── category.js
│   ├── subCategory.js
│   └── items.js
├── utils
│   └── responseHandler.js
├── app.js

```

## 📜 Usage

1. **Create Categories**: Use the API endpoint `/api/v1/category/` to create new categories.
2. **Create Subcategories**: Subcategories can be added under categories via the endpoint `/api/v1/subcategory/`.
3. **Create Items**: Add items under categories or subcategories using the endpoint `/api/v1/item/`.
4. **CRUD Operations**: Utilize the respective endpoints to retrieve, update, or delete categories, subcategories, and items.
5. **Search Items**: Use the search functionality to find items by name.

## 📝 License

This project is licensed under the MIT License.

## ✨ Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue to improve this project.
