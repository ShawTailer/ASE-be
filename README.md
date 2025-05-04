### 1. Clone the repo  
```bash
git clone https://github.com/ShawTailer/ASE-be.git
cd ASE-be
```
### 2. Create your environment file  
```bash
At the project root, create a file named .env
DATABASE_URL=mysql://<DB_USER>:<DB_PASSWORD>@localhost:3306/scams
JWT_SECRET=jwt-key
PORT=8000
```
### 3. Install dependencies
```bash
npm install
```
### 4. Start the server
```bash
npm run dev
The API will be available at http://localhost:8000.
```