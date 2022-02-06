-- create tables
CREATE TABLE "patient_info" (
	"_id"	            INTEGER NOT NULL,
	"birth_year"	    INTEGER NOT NULL,
	"birth_month"	    INTEGER NOT NULL,
    "gender"            TEXT NOT NULL,
    "patient_status"    TEXT NOT NULL,
    "arrival_date"      TEXT NOT NULL,
    "arrival_time"      TEXT NOT NULL,
    "returning_visit"   INTEGER,
    "arrival_mode"      TEXT,
    "referral"          TEXT NOT NULL,
    "triage_score"      INTEGER NOT NULL,
    "complaint"         TEXT NULL,
    "diagnosis"         TEXT NULL,
    "checkout_date"     TEXT NOT NULL,
    "checkout_time"     TEXT NOT NULL,
    "outcome"           TEXT NULL,
    "destination"       TEXT NULL,
    "ed_duration"       REAL NOT NULL
	PRIMARY KEY("_id" AUTOINCREMENT)
)

-- patient_info inserts
INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, 
arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, 
complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (1, 1990, 10, 'M', 'Defence Forces', '2021-09-10', '10:00:00', 0, 'Train', 
'Self', 1, '', '', '2021-09-10', '11:00:00', 'Home/Follow Up PRN', 'Home', 1.00);

INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (2, 1991, 1, 'F', 'GP Referral', '2021-09-11', '11:00:00', 1, 'Car', 'GP with letter', 2, '', '', '2021-09-11', '13:00:00', 'Medical OPD', 'Home', 2.00);
INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (3, 1992, 2, 'M', 'Re-attender', '2021-09-12', '12:00:00', 0, 'Bus', 'AMNCH Tallaght', 3, '', '', '2021-09-12', '15:00:00', 'Admitted', 'Maple ward', 3.00);
INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (4, 1993, 3, 'M', 'GP Referral', '2021-09-13', '13:00:00', 0, 'Taxi', 'Self', 4, '', '', '2021-09-13', '17:00:00', 'Same Day Review', 'Our Ladys Crumlin', 4.00);
INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (5, 1994, 4, 'F', 'Medical Card', '2021-09-14', '14:00:00', 0,  'Car', 'Self', 5, '', '', '2021-09-14', '19:00:00', 'Home/Follow Up PRN', 'Home', 3.00);
INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (6, 1995, 5, 'F', 'Re-attender', '2021-09-15', '15:00:00', 1, 'Car', 'GP without letter', 4, '', '', '2021-09-15', '19:15:00', 'Home/Follow Up PRN', 'Home', 4.15);
INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (7, 1996, 6, 'F', 'Invoiced', '2021-09-16', '16:00:00', 1, 'Car', 'Self', 3, '', '', '2021-09-16', '18:20:00', 'Home/Follow Up PRN', 'Home', 2.20);
INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (8, 1997, 7, 'F', 'GP Referral', '2021-09-17', '21:00:00', 1, 'Car', 'GP with letter', 2, '', '', '2021-09-18', '01:00:00', 'Home/Follow Up PRN', 'Home', 4.00);
INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (9, 1998, 8, 'M', 'Paid', '2021-09-18', '23:30:00', 1, 'Car', 'Self', 1, '', '', '2021-09-19', '03:00:00', 'Home/Follow Up PRN', 'Home', 3.30);
INSERT INTO patient_info(_id, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) 
VALUES (10, 1999, 9, 'F', 'Re-attender', '2021-09-19', '23:45:00', 0, 'Car', 'GP without letter', 3, '', '', '2021-09-21', '05:00:00', 'Home/Follow Up PRN', 'Home', 5.15);