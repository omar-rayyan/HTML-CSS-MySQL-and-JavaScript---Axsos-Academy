CREATE DATABASE lead_gen_business_db;
USE lead_gen_business_db;

CREATE TABLE billing (
    billing_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    amount FLOAT,
    charged_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

CREATE TABLE clients (
    client_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(50),
    joined DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sites (
    site_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    domain_name VARCHAR(100),
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

CREATE TABLE leads (
    leads_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    registered_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(50),
    FOREIGN KEY (site_id) REFERENCES sites(site_id)
);

-- Query 1: What query would you run to get the total revenue for March of 2012?
SELECT SUM(amount)
FROM billing 
WHERE charged_datetime >= "2012/03/01"
AND charged_datetime < "2012/04/01";

-- Query 2: What query would you run to get total revenue from the client with an ID of 2?
SELECT SUM(amount)
FROM billing 
WHERE client_id = 2;

-- Query 3: What query would you run to get all the sites a client with an ID of 10 owns?
SELECT site_id, domain_name, created_datetime
FROM sites
WHERE client_id = 10;

-- Query 4: What query would you run to get the total number of monthly sites created per year for the client with an ID of 1?
SELECT YEAR(created_datetime) AS year, MONTH(created_datetime) AS month, COUNT(*) AS total_sites
FROM sites
WHERE client_id = 1
GROUP BY YEAR(created_datetime), MONTH(created_datetime)
ORDER BY year, month;

-- What about the client with an ID of 20?
SELECT YEAR(created_datetime) AS year, MONTH(created_datetime) AS month, COUNT(*) AS total_sites
FROM sites
WHERE client_id = 20
GROUP BY year, month
ORDER BY year, month;

-- Query 5: What query would you run to get the total number of leads generated for each site between January 1, 2011, and February 15, 2011?
SELECT COUNT(*) AS total_leads
FROM leads
WHERE registered_datetime >= "2011/01/01"
AND registered_datetime <= "2011/02/15";

-- Query 6: What query would you run to get a list of client names and the total number of leads we've generated for each client between January 1, 2011, and December 31, 2011?
SELECT COUNT(leads.leads_id) AS total_leads,  clients.first_name, clients.last_name
FROM leads
JOIN sites ON leads.site_id = sites.site_id
JOIN clients ON sites.client_id = clients.client_id
WHERE leads.registered_datetime >= "2011/01/01"
AND leads.registered_datetime <= "2011/12/31";

-- Query 7: What query would you run to get a list of client names and the total number of leads we've generated for each client each month between January and June of 2011?
SELECT COUNT(leads.leads_id) AS total_leads, clients.first_name, clients.last_name, YEAR(leads.registered_datetime) AS year, MONTH(leads.registered_datetime) AS month
FROM leads
JOIN sites ON leads.site_id = sites.site_id
JOIN clients ON sites.client_id = clients.client_id
WHERE leads.registered_datetime >= "2011-01-01"
AND leads.registered_datetime <= "2011-06-30"
GROUP BY clients.client_id, year, month;

-- Query 8: What query would you run to get a list of client names and the total number of leads we've generated for each client site between January 1, 2011, and December 31, 2011?
-- Order this query by client ID.
SELECT COUNT(leads.leads_id) AS total_leads, clients.first_name, clients.last_name, YEAR(leads.registered_datetime) AS year, MONTH(leads.registered_datetime) AS month
FROM leads
JOIN sites ON leads.site_id = sites.site_id
JOIN clients ON sites.client_id = clients.client_id
WHERE leads.registered_datetime >= "2011-01-01"
AND leads.registered_datetime <= "2011-12-31"
ORDER BY clients.client_id;

-- Come up with a second query that shows all the clients, the site name(s), and the total number of leads generated from each site for all time.
SELECT COUNT(leads.leads_id) AS total_leads, clients.first_name, clients.last_name, sites.domain_name
FROM leads
JOIN sites ON leads.site_id = sites.site_id
JOIN clients ON sites.client_id = clients.client_id
GROUP BY clients.first_name, clients.last_name, sites.domain_name
ORDER BY clients.client_id;

-- Query 9: Write a single query that retrieves total revenue collected from each client for each month of the year. Order by client ID.
-- First, this will be by integer month, then a second with month name. A second query will be needed for the second challenge.
SELECT clients.client_id, clients.first_name, clients.last_name, YEAR(billing.charged_datetime) AS year, MONTH(billing.charged_datetime) AS month, SUM(billing.amount) AS total_revenue
FROM billing
JOIN clients ON billing.client_id = clients.client_id
GROUP BY clients.client_id, year, month
ORDER BY clients.client_id, year, month;

-- Second query
SELECT clients.client_id, clients.first_name, clients.last_name, YEAR(billing.charged_datetime) AS year, DATE_FORMAT(billing.charged_datetime, '%M') AS month, SUM(billing.amount) AS total_revenue
FROM billing
JOIN clients ON billing.client_id = clients.client_id
GROUP BY clients.client_id, year, month
ORDER BY clients.client_id, year, MONTH(billing.charged_datetime);

-- Query 10: Write a single query that retrieves all the sites that each client owns. Group the results so that each client's sites are displayed in a single field.
-- It would be convenient if you add a new field called 'sites' with all the client's sites. (HINT: use GROUP_CONCAT)
SELECT clients.client_id, clients.first_name, clients.last_name, GROUP_CONCAT(sites.domain_name ORDER BY sites.domain_name SEPARATOR ', ') AS sites
FROM clients
JOIN sites ON clients.client_id = sites.client_id
GROUP BY clients.client_id, clients.first_name, clients.last_name;