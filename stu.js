(function () {

  // ===== FORM HANDLING =====
  const form = document.getElementById('myForm');
  const msgDiv = document.getElementById('mssg');
  const resultDiv = document.getElementById('result');

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const gender = document.getElementById('gender');
  const address = document.getElementById('address');
  const dob = document.getElementById('dob');
  const course = document.getElementById('course');
  const interest1 = document.getElementById('interest1');
  const interest2 = document.getElementById('interest2');
  const interest3 = document.getElementById('interest3');
  const interest4 = document.getElementById('interest4');
  const studyRadios = document.getElementsByName('studyMode');

  function showMessage(text, isOk) {
    msgDiv.style.display = 'block';
    msgDiv.textContent = text;
    msgDiv.style.background = isOk ? '#d9f0d1' : '#ffe1cf';
    setTimeout(() => { msgDiv.style.display = 'none'; }, 2500);
  }

  function getInterests() {
    let arr = [];
    if (interest1.checked) arr.push(interest1.value);
    if (interest2.checked) arr.push(interest2.value);
    if (interest3.checked) arr.push(interest3.value);
    if (interest4.checked) arr.push(interest4.value);
    return arr.length ? arr.join(', ') : 'none';
  }

  function getStudyMode() {
    for (let r of studyRadios) {
      if (r.checked) return r.value;
    }
    return null;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // clear old errors
    document.querySelectorAll('.errMssg').forEach(span => span.textContent = '');
    document.querySelectorAll('input, select, textarea')
      .forEach(el => el.style.border = '1px solid #ccc');

    function setError(input, message) {
      const errorSpan = input.parentElement.querySelector('.errMssg');
      if (errorSpan) errorSpan.textContent = message;
      input.style.border = '2px solid red';
      isValid = false;
    }

    function setSuccess(input) {
      input.style.border = '2px solid green';
    }

    // ===== NAME =====
    if (!name.value.trim()) {
      setError(name, 'Name required');
    } else if (name.value.trim().length < 3) {
      setError(name, 'Minimum 3 characters');
    } else {
      setSuccess(name);
    }

    // ===== EMAIL =====
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.value.trim()) {
      setError(email, 'Email required');
    } else if (!emailPattern.test(email.value.trim())) {
      setError(email, 'Invalid email');
    } else {
      setSuccess(email);
    }

    // ===== PHONE =====
    if (!/^[0-9]{10}$/.test(phone.value.trim())) {
      setError(phone, 'Enter valid 10 digit number');
    } else {
      setSuccess(phone);
    }

    // ===== GENDER =====
    if (!gender.value) {
      setError(gender, 'Select gender');
    } else {
      setSuccess(gender);
    }

    // ===== DOB =====
    if (!dob.value) {
      setError(dob, 'Select DOB');
    } else {
      const birthDate = new Date(dob.value);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 16) {
        setError(dob, 'Minimum age 16');
      } else {
        setSuccess(dob);
      }
    }

    // ===== COURSE =====
    if (!course.value) {
      setError(course, 'Select course');
    } else {
      setSuccess(course);
    }

    // ===== ADDRESS =====
    if (!address.value.trim()) {
      setError(address, 'Address required');
    } else if (address.value.trim().length < 10) {
      setError(address, 'Minimum 10 characters');
    } else {
      setSuccess(address);
    }

    // ===== INTERESTS =====
    const interestGroup = interest1.closest('.form-group');
    if (!interest1.checked && !interest2.checked &&
        !interest3.checked && !interest4.checked) {
      interestGroup.querySelector('.errMssg').textContent =
        'Select at least one interest';
      isValid = false;
    }

    // ===== STUDY MODE =====
    let modeSelected = false;
    for (let r of studyRadios) {
      if (r.checked) modeSelected = true;
    }

    if (!modeSelected) {
      studyRadios[0].closest('.form-group')
        .querySelector('.errMssg').textContent =
        'Select study mode';
      isValid = false;
    }

    if (!isValid) {
      showMessage('❌ Fill all fields Correctly first', false);
      return;
    }

    // ===== SUCCESS =====
    showMessage('✅ Registration Successful', true);

    const interests = getInterests();
    const mode = getStudyMode() || '—';
    const dobVal = dob.value || '—';
    const courseVal = course.options[course.selectedIndex].text;

    resultDiv.innerHTML = `
      <strong>📋 Registration Summary</strong><br>
      👤 ${name.value.trim()} <br>
      📧 ${email.value.trim()} <br>
      📞 ${phone.value.trim()}<br>
      ⚥ ${gender.value} <br>
      🎂 ${dobVal} <br>
      📚 ${courseVal} <br>
      🏠 ${address.value.trim()}<br>
      🧩 ${interests}<br>
      ⏰ ${mode}
    `;

    resultDiv.style.display = 'block';
    
    // Optional: Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Welcome message
  window.addEventListener('load', () => {
    msgDiv.style.display = 'block';
    msgDiv.textContent = '✨ images move with cursor · hover right for kid';
    msgDiv.style.background = '#e3efff';
    setTimeout(() => { msgDiv.style.display = 'none'; }, 2800);
  });

})();