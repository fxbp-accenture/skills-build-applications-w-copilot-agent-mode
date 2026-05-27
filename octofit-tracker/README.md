# OctoFit Tracker (scaffold)

Ports:

- Frontend: 5173
- Backend: 8000
- MongoDB: 27017

To run locally (two terminals):

```powershell
cd octofit-tracker/frontend
npm install
npm run dev:port

cd ../backend
npm install
npm run dev
```

The backend looks for `MONGODB_URI` (defaults to `mongodb://localhost:27017/octofit`).
