# Job Portal

A full-stack job portal application built with **React**, **Node.js**, and **MongoDB**, enhanced by modern UI and media tools like **ShadCN UI**, **Lucide React**, and **Cloudinary**.

Users can browse and apply to jobs, while admins can post and manage listings with a clean and responsive UI.

---

## 🛠️ Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/) (built on Radix UI)
- [Lucide React](https://lucide.dev/) (icon library)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) 

### Media & Uploads
- [Cloudinary](https://cloudinary.com/) for image hosting

---

## 🚀 Features

- 👤 User registration & login (JWT auth)
- 💼 Job posting & application
- 📁 Resume upload & image hosting with Cloudinary
- 🎨 Beautiful UI with ShadCN components and Lucide icons
- 🔍 Search and filter jobs
- 🔐 Protected routes (Admin/User access control)

---

## 📁 Folder Structure

backend/
    ├── config/
        ├── cloudinary.js
        └── db.js
    ├── controllers/
        ├── application.controller.js
        ├── company.controller.js
        ├── job.controller.js
        └── user.controller.js
    ├── middlewares/
        ├── isAuthenticated.js
        └── multer.js
    ├── models/
        ├── application.model.js
        ├── company.model.js
        ├── job.model.js
        └── user.model.js
    ├── routes/
        ├── application.route.js
        ├── company.route.js
        ├── job.route.js
        └── user.route.js
    ├── utils/
        └── dataUri.js
    ├── index.js
    ├── package-lock.json
    └── package.json
client/
    ├── public/
        └── vite.svg
    ├── src/
        ├── assets/
            └── react.svg
        ├── components/
            ├── admin/
                ├── AdminjobsTable.jsx
                ├── Applicants.jsx
                ├── ApplicantsTable.jsx
                ├── Companies.jsx
                ├── CompaniesTable.jsx
                ├── CompanyCreate.jsx
                ├── CompanyJobs.jsx
                ├── CompanySetup.jsx
                ├── EditJob.jsx
                ├── PostJobs.jsx
                └── PrivateAdminRoute.jsx
            ├── Auth/
                ├── Login.jsx
                └── Signup.jsx
            ├── shared/
                ├── Footer.jsx
                └── Navbar.jsx
            ├── ui/
                ├── avatar.jsx
                ├── badge.jsx
                ├── button.jsx
                ├── card.jsx
                ├── carousel.jsx
                ├── checkbox.jsx
                ├── dialog.jsx
                ├── input.jsx
                ├── label.jsx
                ├── popover.jsx
                ├── radio-group.jsx
                ├── select.jsx
                ├── sonner.jsx
                └── table.jsx
            ├── About.jsx
            ├── AppliedJob.jsx
            ├── Browse.jsx
            ├── FilterCard.jsx
            ├── Herosection.jsx
            ├── Home.jsx
            ├── Job.jsx
            ├── JobCatagory.jsx
            ├── JobDescription.jsx
            ├── Jobs.jsx
            ├── LatestJobCard.jsx
            ├── LatestJobs.jsx
            ├── Profile.jsx
            └── UpdateProfileDialog.jsx
        ├── hooks/
            ├── UseGetAllAdminJobs.jsx
            ├── UseGetAllCompanies.jsx
            ├── UseGetAlljobs.jsx
            ├── UseGetAppliedJobs.jsx
            ├── UseGetCompanyById.jsx
            └── UseGetJobById.jsx
        ├── lib/
            └── utils.js
        ├── redux/
            ├── applicationSlice.js
            ├── authslice.js
            ├── companySlice.js
            ├── Jobslice.js
            └── store.js
        ├── utils/
            └── constant.js
        ├── App.css
        ├── App.jsx
        ├── index.css
        └── main.jsx
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── jsconfig.json
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    └── vite.config.js
.gitignore
README.md
