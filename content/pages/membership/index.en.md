---
title: "Membership Application"
date: 2025-01-01
description: "Join the Rowan Amateur Radio Society - online membership application"
categories: [Club Info]
tags: [membership, join]
menu:
  main:
    name: Membership
    weight: 3
    pre: fa-user-plus
---

## Join RARS

Thank you for your interest in joining the Rowan Amateur Radio Society! Whether you're a newly licensed ham or an experienced operator, we welcome you to our club.

**Membership is open to all** - you don't need to be licensed to join, but active participation in club activities is encouraged.

Please complete the form below to apply for membership. We'll be in touch shortly!

---

## Membership Application

<!-- TODO: Set up SheetMonkey or Google Forms endpoint for this form -->
<form id="membershipForm" action="https://api.sheetmonkey.io/form/tsXjKtuurQAQJFvwaGGvuX" method="post" class="mb-4">

### Contact Information

<div class="mb-3">
  <label class="form-label">Full Name: <span class="text-danger">*</span></label>
  <input type="text" name="Name" required class="form-control" placeholder="Your full name">
</div>

<div class="mb-3">
  <label class="form-label">Call Sign (if licensed):</label>
  <input type="text" name="Callsign" class="form-control" pattern="[A-Za-z]{1,2}[0-9][A-Za-z]{1,3}" title="Enter a valid amateur radio call sign (e.g., W4ABC, KJ4XYZ)" placeholder="e.g., W4ABC">
</div>

<div class="mb-3">
  <label class="form-label">License Class:</label>
  <select name="License Class" class="form-select">
    <option value="Not Licensed">Not Licensed (Yet!)</option>
    <option value="Technician">Technician</option>
    <option value="General">General</option>
    <option value="Amateur Extra">Amateur Extra</option>
  </select>
</div>

<div class="mb-3">
  <label class="form-label">Email: <span class="text-danger">*</span></label>
  <input type="email" id="emailInput" name="Email" required class="form-control" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Please enter a valid email address" placeholder="your.email@example.com">
  <div id="emailFeedback" class="invalid-feedback">Please enter a valid email address.</div>
</div>

<div class="mb-3">
  <label class="form-label">Phone Number:</label>
  <input type="tel" name="Phone" class="form-control" placeholder="(xxx) xxx-xxxx">
</div>

<div class="mb-3">
  <label class="form-label">Mailing Address:</label>
  <textarea name="Address" rows="3" class="form-control" placeholder="Street Address&#10;City, State ZIP"></textarea>
</div>

---

### About You and Ham Radio

<div class="mb-3">
  <label class="form-label">What do you want to do with ham radio? <span class="text-danger">*</span></label>
  <textarea name="Goals" rows="4" required class="form-control" placeholder="Tell us about your interests and goals in amateur radio..."></textarea>
  <div class="form-text">Examples: emergency communications, contesting, DXing, digital modes, satellite ops, etc.</div>
</div>

<div class="mb-3">
  <label class="form-label">What are you currently doing with ham radio?</label>
  <textarea name="Current Activities" rows="4" class="form-control" placeholder="What activities are you involved in now?"></textarea>
  <div class="form-text">It's okay if you're just getting started!</div>
</div>

<div class="mb-3">
  <label class="form-label">What are your favorite things to do in ham radio?</label>
  <textarea name="Favorites" rows="4" class="form-control" placeholder="What aspects of the hobby do you enjoy most?"></textarea>
</div>

<div class="mb-3">
  <label class="form-label">What equipment do you plan on using in case of emergency?</label>
  <textarea name="Emergency Equipment" rows="4" class="form-control" placeholder="Describe your emergency communication capabilities and equipment..."></textarea>
  <div class="form-text">Examples: HT, mobile rig, base station, portable antennas, power backup, etc.</div>
</div>

<div class="mb-3">
  <label class="form-label">Any plans on joining NC ARES (Amateur Radio Emergency Service)?</label>
  <select name="ARES Interest" class="form-select">
    <option value="Not Sure">Not Sure / Need More Info</option>
    <option value="Yes">Yes, I'm interested</option>
    <option value="Already Member">Already a member</option>
    <option value="No">Not at this time</option>
  </select>
  <div class="form-text">Learn more about <a href="https://www.arrl.org/ares" target="_blank">ARES</a></div>
</div>

---

<div class="mb-3">
  <label class="form-label">How did you hear about RARS?</label>
  <input type="text" name="Referral" class="form-control" placeholder="Repeater, website, friend, hamfest, etc.">
</div>

<div class="mb-3">
  <label class="form-label">Additional Comments:</label>
  <textarea name="Comments" rows="3" class="form-control" placeholder="Anything else you'd like us to know?"></textarea>
</div>

<input type="hidden" name="Form Type" value="Membership Application">
<input type="hidden" name="Submitted" value="x-sheetmonkey-current-date-time">

<div class="mb-3">
  <button type="submit" class="btn btn-primary btn-lg">Submit Application</button>
</div>

</form>

---

## What Happens Next?

1. We'll review your application and get in touch via email
2. You're welcome to attend our next meeting - visitors are always welcome!
3. Dues and membership details will be discussed at the meeting

**Questions?** Feel free to [contact us](/pages/contact/) or reach us on the N4UH repeater (145.410 MHz, 136.5 PL).

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('membershipForm');
  const emailInput = document.getElementById('emailInput');

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Real-time email validation
  emailInput.addEventListener('input', function() {
    if (this.value === '') {
      this.classList.remove('is-valid', 'is-invalid');
    } else if (emailRegex.test(this.value)) {
      this.classList.remove('is-invalid');
      this.classList.add('is-valid');
    } else {
      this.classList.remove('is-valid');
      this.classList.add('is-invalid');
    }
  });

  // Form submission validation
  form.addEventListener('submit', function(e) {
    if (!emailRegex.test(emailInput.value)) {
      e.preventDefault();
      emailInput.classList.add('is-invalid');
      emailInput.focus();
    }
  });
});
</script>
