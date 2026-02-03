---
title: "Contact Us"
date: 2025-01-02
description: "Contact information for RARS"
categories: [Club Info]
tags: [contact]
menu:
  main:
    name: Contact
    weight: 6
    pre: fa-envelope
---

## Contact Us

You can reach the Rowan Amateur Radio Society by:

**Email:** [rustyutahn@yahoo.com](mailto:rustyutahn@yahoo.com)

**Phone:** (704) 433-7371

**Meeting Location:**
Rowan County Rescue Squad
1140 Julian Rd
Salisbury, NC 28146

We meet on the 2nd Monday of each month at 7:00 PM. Visitors are always welcome!

## On the Air

Listen for us on the N4UH repeaters:

- **2m:** 145.410 MHz, -0.600 offset, 136.5 PL
- **70cm:** 443.250 MHz, +5.000 offset, 136.5 PL

## Contact Form

<!-- TODO: Switch form to RARS Google account (same account as calendar) -->
<!-- TODO: Create webhook to watch Google Form submissions and send to Discord bot -->
<form id="contactForm" action="https://api.sheetmonkey.io/form/tsXjKtuurQAQJFvwaGGvuX" method="post" class="mb-4">
  <div class="mb-3">
    <label class="form-label">Name:</label>
    <input type="text" name="Name" required class="form-control">
  </div>
  <div class="mb-3">
    <label class="form-label">Call Sign (if licensed):</label>
    <input type="text" name="Call Sign" class="form-control" pattern="[A-Za-z]{1,2}[0-9][A-Za-z]{1,3}" title="Enter a valid amateur radio call sign (e.g., W4ABC, KJ4XYZ)">
  </div>
  <div class="mb-3">
    <label class="form-label">Email:</label>
    <input type="email" id="emailInput" name="Email" required class="form-control" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Please enter a valid email address">
    <div id="emailFeedback" class="invalid-feedback">Please enter a valid email address.</div>
  </div>
  <div class="mb-3">
    <label class="form-label">Message:</label>
    <textarea name="Message" rows="5" required class="form-control"></textarea>
  </div>
  <input type="hidden" name="Submitted" value="x-sheetmonkey-current-date-time">
  <div class="mb-3">
    <button type="submit" class="btn btn-primary">Send Message</button>
  </div>
</form>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
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
