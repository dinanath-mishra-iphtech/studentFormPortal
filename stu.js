
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
    for (let r of studyRadios) if (r.checked) return r.value;
    return 'fulltime';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!name.value.trim()) {
      showMessage('name required', false); name.focus(); return;
    }
    if (!email.value.includes('@')) {
      showMessage('valid email required', false); email.focus(); return;
    }
    if (!/^[0-9]{10}$/.test(phone.value.trim())) {
      showMessage('Enter valid 10 digit number', false);
      phone.focus();
      return;
    }

    if (!gender.value) {
      showMessage('gender required', false); gender.focus(); return;
    }


    showMessage('✅ registration', true);

    const interests = getInterests();
    const mode = getStudyMode();
    const dobVal = dob.value || '—';
    const courseVal = course.value ? course.options[course.selectedIndex].text : '—';

    resultDiv.innerHTML = `
                    <strong>📋 summary</strong><br>
                    👤 ${name.value.trim()} <br>
                    📧 ${email.value.trim()} <br>
                    📞 ${phone.value.trim() || '—'}<br>
                    ⚥ ${gender.value} <br>
                    🎂 ${dobVal} <br>
                    📚 ${courseVal} <br>
                    🏠 ${address.value.trim() || '—'}<br>
                    🧩 ${interests}<br>
                    ⏰ ${mode}
                `;
    resultDiv.style.display = 'block';

    // Fun bounce effect for moving images on submit
    if (window.lastDrift) {
      img1.style.transform = `rotate(-2deg) translate(${window.lastDrift.x1}px, -12px)`;
      img2.style.transform = `rotate(1deg) translate(${window.lastDrift.x2}px, -12px)`;
      img3.style.transform = `rotate(3deg) translate(${window.lastDrift.x3}px, -12px)`;
      setTimeout(() => {
        img1.style.transform = `rotate(-2deg) translate(${window.lastDrift.x1}px, ${window.lastDrift.y1}px)`;
        img2.style.transform = `rotate(1deg) translate(${window.lastDrift.x2}px, ${window.lastDrift.y2}px)`;
        img3.style.transform = `rotate(3deg) translate(${window.lastDrift.x3}px, ${window.lastDrift.y3}px)`;
      }, 180);
    }
  });

  // Welcome message
  window.addEventListener('load', () => {
    msgDiv.style.display = 'block';
    msgDiv.textContent = '✨ images move with cursor · hover right for kid';
    msgDiv.style.background = '#e3efff';
    setTimeout(() => { msgDiv.style.display = 'none'; }, 2800);
  });
})();
