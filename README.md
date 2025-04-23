# Orbit - NGO Operations Management System

This is a full-stack web application built with **ReactJS** (frontend) and **Django** (backend) to support NGOs in managing their internal and external operations effectively.

## 🌟 Key Modules

- **Dashboard** – Overview of operational and financial activities in real-time.
- **Donor Management** – Track donor information, donations, and communication history.
- **Opportunity Tracking** – Identify and manage funding opportunities.
- **Proposal Development** – Create and manage project proposals with integrated tools.
- **Proposal Library** – Repository for storing reusable proposal templates and documents.
- **AI Proposal** – Leverage AI to draft and enhance proposals efficiently.
- **Internal Workflow** – Streamline team collaboration and document approvals.
- **Calendars** – Manage schedules, deadlines, and appointments.
- **Fundraising** – Plan and track fundraising campaigns.
- **Analytics** – Gain insights through visual reports and data analysis.

## 🛠️ Technologies Used

- **Frontend**: ReactJS
- **Backend**: Django (Python)
- **API**: Django REST Framework
- **Database**: PostgreSQL / SQLite (based on environment)
- **Hosting**: Compatible with Heroku, VPS, or shared hosting

## 🧑‍💻 Setup Guide

### Backend (Django)

```bash
git clone https://github.com/your-username/ngo-operations-backend.git
cd ngo-operations-backend
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend (ReactJS)

```bash
cd ngo-operations-frontend
npm install
npm start
```

## 🧾 Usage Instructions

1. Log in with the admin account.
2. Configure organization settings and roles.
3. Start tracking donors, opportunities, and fundraising activities.
4. Use the AI module to draft compelling proposals.
5. Monitor KPIs and generate reports via the Analytics module.

## 🔐 Roles & Access

| Role         | Access Level                                        |
| ------------ | --------------------------------------------------- |
| Admin        | Full access across all modules                      |
| Project Lead | Manage opportunities, proposals, and fundraising    |
| Fundraiser   | Focused access to fundraising and donor management  |
| Viewer       | Read-only access to shared documents and dashboards |

## 📦 Deployment Notes

- Use environment variables for sensitive configs.
- Setup HTTPS, WSGI server (e.g., Gunicorn), and reverse proxy (e.g., Nginx).
- Set `DEBUG=False` in production.

## 🙌 Contributing

1. Fork the repo and create your feature branch.
2. Commit changes and push.
3. Open a pull request for review.

## 🧑‍💼 Maintainer

Developed and maintained by [Your Name / Organization].

## 📃 License

This project is licensed under the [MIT License](LICENSE).
