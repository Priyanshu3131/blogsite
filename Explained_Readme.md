# React + Vite Blog Project

## Step 1 - Planning
This project uses the following technologies:
- **Appwrite**: Backend-as-a-service for authentication, database, and file storage.
- **TinyMCE**: A rich text editor for creating blog posts.
- **html-react-parser**: Parses HTML content into React components.
- **React Hook Form**: Manages and validates form inputs.
- **Redux Toolkit**: Manages global state efficiently.
- **Vite**: A fast build tool for React applications.

## Step 2 - Environment Variables
### Creating `.env` File
Environment variables store sensitive configuration details such as Appwrite URLs, project IDs, and database IDs.

```
VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
```

### Creating `.env.sample` File
This is a sample file to guide developers in setting up their `.env` file.

```
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""
```

## Step 3 - Configuration File
**Why do we wrap environment variables in `String()`?**
- To prevent issues when values are interpreted as integers or null.

```js
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};
export default conf;
```

## Step 4 - Appwrite Setup
### Creating `appwrite` Folder
We create an `appwrite` folder to store all backend interactions with Appwrite services.

#### `authService.js` - Handles authentication
- Manages user signup, login, logout, and fetching the current user.

#### `config.js` - Database and File Storage
- Handles blog post creation, updates, deletion, and file uploads.

## Step 5 - Redux Store Setup
### `store.js`
Redux is used to manage authentication state.

```js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
    }
});
export default store;
```

### `authSlice.js`
Defines Redux state for authentication.

## Step 6 - Components
### `Header.js`
- Displays navigation links based on authentication status.

### `Footer.js`
- Contains site footer details.

### `Button.js`
- Reusable button component with custom styles.

### `Input.js`
- Reusable input component with built-in validation.

### `PostCard.js`
- Displays a preview of a blog post.

## Step 7 - Post Management
### `PostForm.js`
- Handles creating and editing posts.
- Uses `slugTransform()` to generate slugs automatically.

## Step 8 - Routing (React Router)
### `main.jsx`
Defines routes for the application, including authentication and protected routes.

## Step 9 - Protected Routes
### `AuthLayout.js`
Restricts access to certain routes based on authentication.

## Step 10 - Pages
### `Home.js`
- Displays all blog posts.

### `Login.js` & `Signup.js`
- Handle user authentication.

### `Post.js`
- Displays a single blog post.

### `AddPost.js` & `EditPost.js`
- Allow authenticated users to add and edit posts.

## Step 11 - Rich Text Editor (RTE)
Uses TinyMCE for a better blog writing experience.

## Summary
This README provides a breakdown of:
- **Project setup** (Vite, Appwrite, Redux, React Router)
- **Authentication flow** (Signup, Login, Logout, Protected Routes)
- **Post management** (Create, Edit, Delete, Fetch, Display)
- **Reusable components** (Buttons, Inputs, PostCards, etc.)

This explanation should help new developers quickly understand the project and its structure.
