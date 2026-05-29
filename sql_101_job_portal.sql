-- ============================================================
-- SQL 101 - Job Portal Database
-- Schema derived from MongoDB job portal ERD
-- ============================================================


-- ============================================================
-- SECTION 1: DDL (Data Definition Language)
-- CREATE, ALTER, DROP, TRUNCATE
-- ============================================================

-- CREATE tables

CREATE TABLE job_categories (
    id        INT PRIMARY KEY AUTO_INCREMENT,
    name      VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE job_subcategories (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(120) NOT NULL UNIQUE,
    category_id INT NOT NULL,
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES job_categories(id)
);

CREATE TABLE companies (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(150) NOT NULL,
    gst_number VARCHAR(20),
    tan_card   VARCHAR(20),
    industry   VARCHAR(100),
    website    VARCHAR(200),
    logo       VARCHAR(300),
    is_active  BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE branches (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(150) NOT NULL,
    address    VARCHAR(300),
    city       VARCHAR(100),
    state      VARCHAR(100),
    country    VARCHAR(100),
    is_active  BOOLEAN DEFAULT TRUE,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE users (
    id                   INT PRIMARY KEY AUTO_INCREMENT,
    name                 VARCHAR(150) NOT NULL,
    title                VARCHAR(100),
    about                TEXT,
    gender               VARCHAR(20),
    phone                VARCHAR(20),
    email                VARCHAR(200) NOT NULL UNIQUE,
    password             VARCHAR(255) NOT NULL,
    role                 ENUM('jobseeker', 'recruiter', 'admin') DEFAULT 'jobseeker',
    profile_image        VARCHAR(300),
    resume               VARCHAR(300),
    experience           VARCHAR(100),
    location_country     VARCHAR(100),
    location_state       VARCHAR(100),
    location_city        VARCHAR(100),
    location_address     VARCHAR(300),
    location_pincode     VARCHAR(20),
    is_verified          BOOLEAN DEFAULT FALSE,
    is_profile_completed BOOLEAN DEFAULT FALSE,
    last_login           TIMESTAMP,
    created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE education (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    institution     VARCHAR(200) NOT NULL,
    degree          ENUM('Bachelor', 'Master', 'PhD', 'Diploma', 'Other'),
    education_level VARCHAR(100),
    start_date      DATE,
    end_date        DATE,
    user_id         INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE certificates (
    id               INT PRIMARY KEY AUTO_INCREMENT,
    user_id          INT NOT NULL,
    url              VARCHAR(300),
    issuing_authority VARCHAR(200),
    issuing_date     DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE employees (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(150) NOT NULL,
    email           VARCHAR(200) NOT NULL UNIQUE,
    phone           VARCHAR(20),
    gender          VARCHAR(20),
    password        VARCHAR(255),
    role            VARCHAR(50),
    branch_id       INT,
    company_id      INT NOT NULL,
    salary_basic    DECIMAL(12, 2),
    salary_bonus    DECIMAL(12, 2),
    is_blocked      BOOLEAN DEFAULT FALSE,
    blocked_at      TIMESTAMP,
    blocked_by_id   INT,
    block_reason    VARCHAR(300),
    last_login      TIMESTAMP,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id)     REFERENCES branches(id),
    FOREIGN KEY (company_id)    REFERENCES companies(id),
    FOREIGN KEY (blocked_by_id) REFERENCES employees(id)
);

CREATE TABLE jobs (
    id                   INT PRIMARY KEY AUTO_INCREMENT,
    title                VARCHAR(200) NOT NULL,
    work_location        VARCHAR(200),
    work_mode            ENUM('remote', 'onsite', 'hybrid'),
    salary               VARCHAR(100),
    experience_level     VARCHAR(100),
    description          TEXT,
    vacancies            INT DEFAULT 1,
    application_deadline DATE,
    posted_by_id         INT NOT NULL,
    is_active            BOOLEAN DEFAULT TRUE,
    created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by_id) REFERENCES employees(id)
);

CREATE TABLE applications (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    job_id       INT NOT NULL,
    applicant_id INT NOT NULL,
    applied_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status       VARCHAR(50) DEFAULT 'pending',
    FOREIGN KEY (job_id)       REFERENCES jobs(id),
    FOREIGN KEY (applicant_id) REFERENCES users(id)
);

-- ALTER: add a column
ALTER TABLE users ADD COLUMN linkedin_url VARCHAR(300);

-- ALTER: modify a column
ALTER TABLE users MODIFY COLUMN experience VARCHAR(200);

-- ALTER: drop a column
ALTER TABLE users DROP COLUMN linkedin_url;

-- TRUNCATE: remove all rows, keep structure
TRUNCATE TABLE applications;

-- DROP: remove table entirely
DROP TABLE IF EXISTS applications;

-- Recreate for further examples
CREATE TABLE applications (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    job_id       INT NOT NULL,
    applicant_id INT NOT NULL,
    applied_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status       VARCHAR(50) DEFAULT 'pending',
    FOREIGN KEY (job_id)       REFERENCES jobs(id),
    FOREIGN KEY (applicant_id) REFERENCES users(id)
);


-- ============================================================
-- SECTION 2: DML (Data Manipulation Language)
-- INSERT, SELECT, UPDATE, DELETE
-- ============================================================

-- INSERT
INSERT INTO job_categories (name, is_active) VALUES
    ('Technology', TRUE),
    ('Finance', TRUE),
    ('Healthcare', TRUE),
    ('Marketing', TRUE);

INSERT INTO companies (name, industry, website, is_active) VALUES
    ('TechCorp India', 'Technology', 'https://techcorp.in', TRUE),
    ('FinServe Ltd', 'Finance', 'https://finserve.in', TRUE);

INSERT INTO users (name, email, password, role, location_city, experience) VALUES
    ('Rahul Sharma',  'rahul@email.com',  'hashed_pw_1', 'jobseeker', 'Jaipur',   '2 years'),
    ('Priya Mehta',   'priya@email.com',  'hashed_pw_2', 'jobseeker', 'Mumbai',   '4 years'),
    ('Amit Kumar',    'amit@email.com',   'hashed_pw_3', 'jobseeker', 'Delhi',    '1 year'),
    ('Sneha Patel',   'sneha@email.com',  'hashed_pw_4', 'jobseeker', 'Jaipur',   '6 years'),
    ('Ravi Joshi',    'ravi@email.com',   'hashed_pw_5', 'jobseeker', 'Bangalore','3 years');

INSERT INTO branches (name, city, state, country, company_id) VALUES
    ('TechCorp Jaipur HQ', 'Jaipur',   'Rajasthan',   'India', 1),
    ('TechCorp Mumbai',    'Mumbai',   'Maharashtra', 'India', 1),
    ('FinServe Delhi',     'Delhi',    'Delhi',       'India', 2);

INSERT INTO employees (name, email, branch_id, company_id, salary_basic, salary_bonus, role) VALUES
    ('Neha Gupta',   'neha@techcorp.in',   1, 1, 80000, 10000, 'HR Manager'),
    ('Vikram Singh', 'vikram@techcorp.in', 2, 1, 95000, 15000, 'Tech Lead'),
    ('Divya Rao',    'divya@finserve.in',  3, 2, 75000, 8000,  'Recruiter');

INSERT INTO jobs (title, work_mode, salary, experience_level, vacancies, posted_by_id, is_active) VALUES
    ('Frontend Developer',  'hybrid',  '6-10 LPA', 'Mid',    3, 1, TRUE),
    ('Backend Developer',   'onsite',  '8-14 LPA', 'Senior', 2, 2, TRUE),
    ('Data Analyst',        'remote',  '5-9 LPA',  'Junior', 5, 3, TRUE),
    ('DevOps Engineer',     'onsite',  '10-18 LPA','Senior', 1, 2, TRUE),
    ('UI/UX Designer',      'hybrid',  '5-8 LPA',  'Mid',    2, 1, FALSE);

INSERT INTO applications (job_id, applicant_id, status) VALUES
    (1, 1, 'pending'),
    (1, 2, 'shortlisted'),
    (2, 2, 'rejected'),
    (2, 3, 'pending'),
    (3, 4, 'hired'),
    (3, 5, 'pending'),
    (4, 1, 'shortlisted'),
    (4, 3, 'pending');

-- SELECT
SELECT * FROM jobs WHERE is_active = TRUE;

SELECT name, email, location_city FROM users WHERE location_city = 'Jaipur';

SELECT j.title, j.work_mode, j.salary, e.name AS posted_by
FROM jobs j
JOIN employees e ON j.posted_by_id = e.id
WHERE j.is_active = TRUE;

-- UPDATE
UPDATE applications SET status = 'hired' WHERE id = 4;

UPDATE jobs SET vacancies = vacancies - 1 WHERE id = 3;

-- DELETE
DELETE FROM applications WHERE status = 'rejected';


-- ============================================================
-- SECTION 3: DCL (Data Control Language)
-- GRANT, REVOKE
-- ============================================================

-- Create a recruiter DB user
CREATE USER 'recruiter_user'@'localhost' IDENTIFIED BY 'securepass';

-- Grant read access on jobs and applications only
GRANT SELECT ON job_portal.jobs         TO 'recruiter_user'@'localhost';
GRANT SELECT ON job_portal.applications TO 'recruiter_user'@'localhost';

-- Grant insert on applications (recruiter can update status)
GRANT UPDATE ON job_portal.applications TO 'recruiter_user'@'localhost';

-- Revoke insert if no longer needed
REVOKE UPDATE ON job_portal.applications FROM 'recruiter_user'@'localhost';


-- ============================================================
-- SECTION 4: Aggregate Functions
-- COUNT, SUM, MIN, MAX, AVG
-- ============================================================

-- COUNT: total number of applications
SELECT COUNT(*) AS total_applications FROM applications;

-- COUNT: applications per job
SELECT job_id, COUNT(*) AS application_count
FROM applications
GROUP BY job_id;

-- SUM: total salary payout (basic + bonus) across all employees
SELECT SUM(salary_basic + salary_bonus) AS total_salary_payout FROM employees;

-- MIN: lowest basic salary
SELECT MIN(salary_basic) AS min_salary FROM employees;

-- MAX: highest basic salary
SELECT MAX(salary_basic) AS max_salary FROM employees;

-- AVG: average basic salary
SELECT AVG(salary_basic) AS avg_salary FROM employees;

-- All aggregates together
SELECT
    COUNT(*)              AS total_employees,
    SUM(salary_basic)     AS total_basic_payout,
    AVG(salary_basic)     AS avg_basic_salary,
    MIN(salary_basic)     AS lowest_salary,
    MAX(salary_basic)     AS highest_salary
FROM employees;


-- ============================================================
-- SECTION 5: GROUP BY vs HAVING
--
-- GROUP BY  → groups rows before aggregation (like categories)
-- HAVING    → filters groups AFTER aggregation (like WHERE for groups)
-- WHERE     → filters individual rows BEFORE grouping
-- ============================================================

-- GROUP BY only: count applications per job
-- Result: one row per job_id with its count
SELECT job_id, COUNT(*) AS total_applications
FROM applications
GROUP BY job_id;

-- HAVING: show only jobs that received MORE than 1 application
-- HAVING filters the grouped result — you can't use COUNT(*) in WHERE
SELECT job_id, COUNT(*) AS total_applications
FROM applications
GROUP BY job_id
HAVING COUNT(*) > 1;

-- WHERE vs HAVING side-by-side:
-- WHERE filters rows before grouping  → only count 'pending' applications per job
-- HAVING filters groups after grouping → only show groups where pending > 1

SELECT job_id, COUNT(*) AS pending_applications
FROM applications
WHERE status = 'pending'          -- filters rows BEFORE grouping
GROUP BY job_id
HAVING COUNT(*) > 1;              -- filters groups AFTER aggregation

-- Another example: average salary per company, only show companies
-- where average salary exceeds 80,000
SELECT company_id, AVG(salary_basic) AS avg_salary
FROM employees
GROUP BY company_id
HAVING AVG(salary_basic) > 80000;


-- ============================================================
-- SECTION 6: SQL vs MongoDB Aggregation
-- Equivalent queries side by side
-- Use case: count applications per job, show only jobs with > 1 application
-- ============================================================

-- ---- SQL ----
SELECT job_id, COUNT(*) AS total_applications
FROM applications
GROUP BY job_id
HAVING COUNT(*) > 1;

-- ---- MongoDB equivalent ----
-- db.applications.aggregate([
--   {
--     $group: {
--       _id: "$jobId",
--       total_applications: { $sum: 1 }
--     }
--   },
--   {
--     $match: {
--       total_applications: { $gt: 1 }
--     }
--   }
-- ])

-- ---- SQL: average salary per company ----
SELECT company_id, AVG(salary_basic) AS avg_salary
FROM employees
GROUP BY company_id;

-- ---- MongoDB equivalent ----
-- db.employees.aggregate([
--   {
--     $group: {
--       _id: "$companyId",
--       avg_salary: { $avg: "$salary.basic" }
--     }
--   }
-- ])

-- ---- SQL: total vacancies per work_mode ----
SELECT work_mode, SUM(vacancies) AS total_vacancies
FROM jobs
GROUP BY work_mode;

-- ---- MongoDB equivalent ----
-- db.jobs.aggregate([
--   {
--     $group: {
--       _id: "$workMode",
--       total_vacancies: { $sum: "$vacancies" }
--     }
--   }
-- ])


-- ============================================================
-- SECTION 7: Primary Keys & Foreign Keys
--
-- PRIMARY KEY: uniquely identifies each row in a table
-- FOREIGN KEY: links a column in one table to the PK of another
--              → enforces referential integrity
--              → prevents orphan records
-- ============================================================

-- PRIMARY KEY example:
-- In the users table, 'id' is the PK — no two users can have the same id.

-- FOREIGN KEY example:
-- In the applications table:
--   applicant_id → references users(id)
--   job_id       → references jobs(id)
-- This means you CANNOT insert an application for a user or job that doesn't exist.

-- Demo: this INSERT will FAIL because user_id 9999 does not exist
-- INSERT INTO applications (job_id, applicant_id, status)
-- VALUES (1, 9999, 'pending');
-- ERROR: Cannot add or update a child row: a foreign key constraint fails

-- Demo: this INSERT will FAIL because job_id 9999 does not exist
-- INSERT INTO applications (job_id, applicant_id, status)
-- VALUES (9999, 1, 'pending');
-- ERROR: Cannot add or update a child row: a foreign key constraint fails

-- Cascading: if a user is deleted, their applications are also deleted
-- To enable this, define the FK with ON DELETE CASCADE:
ALTER TABLE applications
    DROP FOREIGN KEY applications_ibfk_2;  -- drop existing FK first (MySQL syntax)

ALTER TABLE applications
    ADD CONSTRAINT fk_application_applicant
    FOREIGN KEY (applicant_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- Now deleting a user will automatically delete their applications
DELETE FROM users WHERE id = 3;
-- Amit Kumar's applications (job_id 2 & 4) are automatically removed.

-- JOIN using FK relationship: list all applications with applicant name and job title
SELECT
    a.id          AS application_id,
    u.name        AS applicant_name,
    j.title       AS job_title,
    a.status,
    a.applied_at
FROM applications a
JOIN users u  ON a.applicant_id = u.id
JOIN jobs  j  ON a.job_id       = j.id
ORDER BY a.applied_at DESC;
