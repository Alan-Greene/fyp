function Patient(id = null, birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, checkout_date, checkout_time, outcome, destination, ed_duration) {


    this._id = id
	this.birth_year = birth_year
	this.birth_month = birth_month
    this.gender = gender
    this.patient_status = patient_status
    this.arrival_date = arrival_date
    this.arrival_time = arrival_time
    this.returning_visit = returning_visit
    this.arrival_mode = arrival_mode
    this.referral = referral
    this.triage_score = triage_score
    this.complaint = complaint
    this.diagnosis = diagnosis
    this.checkout_date = checkout_date
    this.checkout_time = checkout_time
    this.outcome = outcome
    this.destination = destination
    this.ed_duration = ed_duration
    this.calculated_ed_duration = calculated_ed_duration

};

module.exports = Patient;