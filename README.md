# 💻 Tech Stack:
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

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
- A Supabase account
- Node.js (≥ 18)
- npm
- PostgreSQL (≥ 9.5)

### 🏗️ Setup :

1. Firstly, go to the dashboard in Supabase
  
2. If you don't have an organization, create a new organization

3. Create a new project

4. Go to the project

5. Go to "Storage"

6. Create a new bucket named "invoices"

7. Then in your terminal, clone the repo
```bash
git clone https://github.com/abdmnhjs/invoices-generator-mobile-app.git
```

8. Move into the project folder
```bash
cd invoices-generator-mobile-app
```

9. Create a .env file and add these environment variables :
```bash
# Replace [username], [password] and [database-name] with your own values
# You define the database name when creating the variable
# Example: postgresql://postgres:mypassword@localhost:5432/invoices_db
DATABASE_URL=postgresql://[username]:[password]@localhost:5432/[database-name]
SUPABASE_URL=XXXXXX
SUPABASE_SERVICE_ROLE_KEY=XXXXXX
```

10. For the Supabase environment variables, follow these steps :

  - Go to the project

  - In the side bar, go to "Project Settings"

  - In the "General" section, you can find your Project ID. Use this ID to construct your SUPABASE_URL in the following format: https://project-id.supabase.co.

  - Always in the side bar, go to "API Keys"

  - Reveal the service_role secret key, it will be the SUPABASE_SERVICE_ROLE_KEY

11. Install the dependencies
```bash
npm i
```

12. Generate the prisma client
```bash
npx prisma generate
```

13. Apply the migrations (this will create the tables in your database according to the Prisma schema)
```bash
npx prisma migrate dev
```

14. Move into the backend folder (inside the project folder)
```bash
cd backend
```

15. Install the dependencies
```bash
npm i
```

16. Run the backend server
```bash
npm run dev
```

17. Go back to the root folder
```bash
cd ..
```
18. If you have an Android/iOS emulator for development :
  - Android :
```bash
npm run android
```
  - iOS :
```bash
npm run ios
```
