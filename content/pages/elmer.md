---
title: "What is an Elmer?"
date: 2026-02-09
description: "An Elmer in ham radio is an experienced mentor who guides newcomers into the hobby"
categories: [Resources]
tags: [elmer, mentor, newham]
---

## What is an Elmer?

An "Elmer" in ham radio is an experienced, often volunteer mentor who provides personalized guidance, technical knowledge, and encouragement to newcomers or those looking to advance their skills. Coined in 1971 by Rod Newkirk to honor his own mentor, the term is unique to amateur radio and signifies the supportive, peer-to-peer education that is crucial for navigating the hobby.

## Key Aspects of an Elmer

- **Role:** Mentors, tutors, and guides new operators, often helping them earn their license and set up their first station.
- **Origin:** Coined in the March 1971 "How's DX" column of QST magazine by Rod Newkirk (W9BRD), referring to his mentor, Elmer P. Frohardt Jr.
- **Context:** Used as both a noun (the person) and a verb ("Elmering" someone).
- **Finding One:** Often found through local amateur radio clubs like RARS.
- **Purpose:** Provides hands-on assistance with radio operations, technical skills, and navigating the nuances of the hobby.

## Need an Elmer?

The Rowan Amateur Radio Society has experienced operators who are happy to help newcomers get started. Whether you need help studying for your license, setting up your first radio, or figuring out antennas, we're here to help.

Fill out the form below and we'll connect you with an Elmer who can help.

---

## Request an Elmer

<form id="elmerForm" action="https://api.sheetmonkey.io/form/tsXjKtuurQAQJFvwaGGvuX" method="post" class="mb-4">

<div class="mb-3">
  <label class="form-label">Full Name: <span class="text-danger">*</span></label>
  <input type="text" name="Name" required class="form-control" placeholder="Your full name">
</div>

<div class="mb-3">
  <label class="form-label">Call Sign (if licensed):</label>
  <input type="text" name="Callsign" class="form-control" pattern="[A-Za-z]{1,2}[0-9][A-Za-z]{1,3}" title="Enter a valid amateur radio call sign (e.g., W4ABC, KJ4XYZ)" placeholder="e.g., W4ABC">
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

<div class="mb-3">
  <label class="form-label">Are you a RARS member?</label>
  <select name="RARS Member" class="form-select">
    <option value="No">No</option>
    <option value="Yes">Yes</option>
    <option value="Interested in joining">Interested in joining</option>
  </select>
</div>

<div class="mb-3">
  <label class="form-label">What would you like help with? <span class="text-danger">*</span></label>
  <textarea name="Help Requested" rows="4" required class="form-control" placeholder="Tell us what you need help with..."></textarea>
  <div class="form-text">Examples: studying for my license, setting up my first radio, programming a handheld, learning about antennas, getting on HF, digital modes, etc.</div>
</div>

<input type="hidden" name="Form Type" value="Elmer Request">
<input type="hidden" name="Submitted" value="x-sheetmonkey-current-date-time">

<div class="mb-3">
  <button type="submit" class="btn btn-primary btn-lg">Submit Request</button>
</div>

</form>

---

## What Happens Next?

1. We'll review your request and get in touch via email
2. You're welcome to attend our next meeting -- visitors are always welcome!

Come to a meeting, check in on the [N4UH repeater](/pages/repeaters/) (145.410 MHz, 136.5 PL), or [contact us](/pages/contact/) to get connected with an Elmer.

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('elmerForm');
  const emailInput = document.getElementById('emailInput');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

  form.addEventListener('submit', function(e) {
    if (!emailRegex.test(emailInput.value)) {
      e.preventDefault();
      emailInput.classList.add('is-invalid');
      emailInput.focus();
    }
  });
});
</script>
