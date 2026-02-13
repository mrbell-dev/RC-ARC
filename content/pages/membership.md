---
title: "Membership Application"
date: 2026-02-04
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

You can apply online using the form below, or [download the membership application (PDF)](/RARS-Membership-Application.pdf) and bring it with you to the next meeting.

---

## Online Membership Application

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

<div class="row">
  <div class="col-md-6 mb-3">
    <label class="form-label">License Class:</label>
    <select name="License Class" class="form-select">
      <option value="Not Licensed">Not Licensed (Yet!)</option>
      <option value="Technician">Technician</option>
      <option value="General">General</option>
      <option value="Amateur Extra">Amateur Extra</option>
    </select>
  </div>
  <div class="col-md-6 mb-3">
    <label class="form-label">ARRL Member?</label>
    <select name="ARRL Member" class="form-select">
      <option value="No">No</option>
      <option value="Yes">Yes</option>
    </select>
  </div>
</div>

<div class="mb-3">
  <label class="form-label">Email: <span class="text-danger">*</span></label>
  <input type="email" id="emailInput" name="Email" required class="form-control" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Please enter a valid email address" placeholder="your.email@example.com">
  <div id="emailFeedback" class="invalid-feedback">Please enter a valid email address.</div>
</div>

<div class="mb-3">
  <label class="form-label">Street Address:</label>
  <input type="text" name="Street Address" class="form-control" placeholder="123 Main St">
</div>

<div class="mb-3">
  <label class="form-label">City, State, Zip:</label>
  <input type="text" name="City State Zip" class="form-control" placeholder="Salisbury, NC 28144">
</div>

<div class="row">
  <div class="col-md-6 mb-3">
    <label class="form-label">Home Phone:</label>
    <input type="tel" name="Home Phone" class="form-control" placeholder="(xxx) xxx-xxxx">
  </div>
  <div class="col-md-6 mb-3">
    <label class="form-label">Cell Phone:</label>
    <input type="tel" name="Cell Phone" class="form-control" placeholder="(xxx) xxx-xxxx">
  </div>
</div>

---

### About You and Ham Radio

<div class="mb-3">
  <label class="form-label">Please write a short history of your Amateur Radio life: <span class="text-danger">*</span></label>
  <textarea name="Radio History" rows="4" required class="form-control" placeholder="How it began, when first licensed, events since that time, present equipment, etc."></textarea>
  <div class="form-text">It's okay if you're just getting started!</div>
</div>

<div class="mb-3">
  <label class="form-label">Describe your general operating habits:</label>
  <textarea name="Operating Habits" rows="4" class="form-control" placeholder="Favorite bands, modes, time of day, hours/week, etc."></textarea>
</div>

<div class="mb-3">
  <label class="form-label">What frequencies/modes, other than those listed above, are you able to use?</label>
  <textarea name="Frequencies and Modes" rows="3" class="form-control" placeholder="Other frequencies and modes you are able to operate on..."></textarea>
</div>

<div class="mb-3">
  <label class="form-label">What are your capabilities/limitations in case you were called on for an emergency operation?</label>
  <textarea name="Emergency Capabilities" rows="4" class="form-control" placeholder="Describe your emergency communication capabilities, equipment, and any limitations..."></textarea>
  <div class="form-text">Examples: HT, mobile rig, base station, portable antennas, power backup, availability, etc.</div>
</div>

<div class="mb-3">
  <label class="form-label">Name three goals you have in Amateur Radio:</label>
  <textarea name="Goals" rows="3" class="form-control" placeholder="What are your amateur radio goals?"></textarea>
</div>

<div class="mb-3">
  <label class="form-label">List, in order of enjoyment, three Amateur Radio activities you would like to do in the next six months:</label>
  <textarea name="Planned Activities" rows="3" class="form-control" placeholder="What activities are you looking forward to?"></textarea>
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
