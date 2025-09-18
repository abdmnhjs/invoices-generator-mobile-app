# 💻 Tech Stack:
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

# ⚙️ Features:

- Dashboard for tracking the earnings
- Generate invoices in PDF by submitting a form
- Share the invoices
- Delete the invoices
- Create some products to add them later in an invoice by submitting a form
- Edit the products
- Delete the products

# 🚀 Getting Started :

### 📦 Prerequisites :
- A supabase account
- Node.js (v18+)
- npm
- pgAdmin

### 🏗️ Setup :

1. Clone the repo
```bash
git clone https://github.com/abdmnhjs/invoices-generator-mobile-app.git
```

2. Move into the project folder
```bash
cd invoices-generator-mobile-app
```

3. Create a .env file and add these environment variables :
```bash
# Replace [username], [password] and [database-name] with your own values
# You define the database name when creating the variable
# Example: postgresql://postgres:mypassword@localhost:5432/invoices_db
DATABASE_URL=postgresql://[username]:[password]@localhost:5432/[database-name]
SUPABASE_URL=XXXXXX
SUPABASE_SERVICE_ROLE_KEY=XXXXXX
```

4. Install the dependencies
```bash
npm i
```

5. Generate the prisma client
```bash
npx prisma generate
```

6. Apply the migrations (this will create the tables in your database according to the Prisma schema)
```bash
npx prisma migrate dev
```

7. Move into the backend folder (inside the project folder)
```bash
cd backend
```

8. Install the dependencies
```bash
npm i
```

9. Run the backend server
```bash
npm run dev
```

10. Go back to the root folder
```bash
cd ..
```
11. If you have an android/ios emulator for development :
  - Android :
```bash
npm run android
```
  - iOS :
```bash
npm run ios
```
