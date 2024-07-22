@echo off

REM Open frontend folder and run npm i and npm start
start cmd /k "cd frontend && npm i && npm start"

REM Open backend folder and run npm i and npm run dev
start cmd /k "cd backend && npm i && npm run dev"

REM Open backend/ML_models folder and run pip install and python model.py
start cmd /k "cd backend\MLmodels && venv\Scripts\activate && pip install -r requirements.txt && python model.py"

exit
