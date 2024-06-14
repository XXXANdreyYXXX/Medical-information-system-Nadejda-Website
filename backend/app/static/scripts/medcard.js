document.addEventListener("DOMContentLoaded", function() {
  var reanimationElement = document.querySelector('.reanimation');

  if (!reanimationElement.innerText.trim()) {
      reanimationElement.style.display = 'none';
  } else {
      reanimationElement.style.display = 'flex';
  }
});
function gotodep() {
    window.location.href = "department.html";
  }
  function hospitalization_information(id) {
    window.location.href = id+"/hospitalization_info";
  }
  function archive_medcards(id) {
    window.location.href = id+"/archive_medcards";
  }
  function analyzes(id) {
window.location.href = "analysis/" + id;
}
  function inspections(id) {
    window.location.href = "initial_examination/" + id;
  }
  function diaries(id) {
    window.location.href = "diary/" + id;
  }
  function diagnoses(id) {
    window.location.href = "diagnoses/" + id;
  }
function Exit() {
window.location.href = "/index.html";
}

  function showContent(contentId) {
    document.querySelectorAll(".content1, .content2").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(contentId).classList.add("active");

    document.querySelectorAll(".btn_block2").forEach((button) => {
      button.classList.remove("active");
    });
    document
      .querySelector(`[onclick="showContent('${contentId}')"]`)
      .classList.add("active");
  }

  const buttons = document.querySelectorAll(".btn_block2");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });
  function toggleDropdown1(id) {
    var dropdown = document.getElementById(id);
    dropdown.style.display =
      dropdown.style.display === "flex" ? "none" : "flex";
  }

  function showContent(contentId) {
    document.querySelectorAll(".content1, .content2").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(contentId).classList.add("active");

    document.querySelectorAll(".btn_block2").forEach((button) => {
      button.classList.remove("active");
    });
    document
      .querySelector(`[onclick="showContent('${contentId}')"]`)
      .classList.add("active");
  }

  function showContent2(option) {
    document.getElementById("content11").style.display =
      option == 1 ? "block" : "none";
    document.getElementById("content12").style.display =
      option == 2 ? "block" : "none";
  }
    // Функция для открытия модального окна
function openPopup(id) {
var popup = document.getElementById(id);
if (popup) {
  popup.style.display = "block";
}
}

// Функция для закрытия модального окна
function closePopup(id) {
var popup = document.getElementById(id);
if (popup) {
  popup.style.display = "none";
}
}

document.addEventListener('DOMContentLoaded', function() {
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const doctorIcon = document.querySelector('.doctor');

dropdownToggle.addEventListener('click', function(event) {
    event.preventDefault();
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function(event) {
    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});
});
document.getElementById('editBtn').addEventListener('click', function() {
  const editBtn = document.getElementById('editBtn');
  if (editBtn.textContent === 'Редактировать') {
    // Переключение на режим редактирования
    enableEditing();
    editBtn.textContent = 'Сохранить';
  } else {
    // Сохранение данных
    if (validateForm()) {
      saveChanges();
      editBtn.textContent = 'Редактировать';
    } else {
      console.error('Пожалуйста, введите корректные данные для всех полей.');
    }
  }
});

function enableEditing() {
  const elements = [
    { id: 'dob', type: 'date', value: '2001-05-17', placeholder: 'ГГГГ-ММ-ДД' },
    { id: 'iin', type: 'number', placeholder: 'Ровно 12 цифр' },
    { id: 'gender', type: 'select', options: ['М', 'Ж'] },
    { id: 'height', type: 'number', suffix: ' см', placeholder: 'Введите число' },
    { id: 'weight', type: 'number', suffix: ' кг', placeholder: 'Введите число' },
    { id: 'temperature', type: 'number', placeholder: 'Формат: xxx.x' },
    { id: 'bp', type: 'text', placeholder: 'Формат: xxx/xxx' },
    { id: 'pulse', type: 'number', placeholder: 'Не более 4 цифр' },
    { id: 'saturation', type: 'number', placeholder: 'Формат: ххх.х' },
    { id: 'rr', type: 'number', placeholder: 'Не более 3 цифр' }
  ];

  elements.forEach(el => {
    const element = document.getElementById(el.id);
    const value = element.textContent.trim().replace(el.suffix || '', '').trim();
    let inputHTML;
    if (el.type === 'select') {
      inputHTML = `<select id="${el.id}Input">`;
      el.options.forEach(option => {
        inputHTML += `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`;
      });
      inputHTML += `</select>`;
    } else {
      inputHTML = `<input type="${el.type}" id="${el.id}Input" value="${value}" placeholder="${el.placeholder || ''}">${el.suffix || ''}`;
    }
    element.innerHTML = inputHTML;
  });
}


function saveChanges() {
  const elements = [
    'dob', 'iin', 'gender', 'height', 'weight',
    'temperature', 'bp', 'pulse', 'saturation', 'rr'
  ];

  const patientData = {};
  elements.forEach(id => {
    const inputElement = document.getElementById(`${id}Input`);
    let value = inputElement.value;
    if (id === 'dob') {
      value = new Date(value).toISOString().split('T')[0];
    }
    const suffix = inputElement.nextSibling?.textContent || '';
    document.getElementById(id).textContent = value + (suffix ? ` ${suffix}` : '');
    patientData[id] = value;
  });

  fetch('/updatePatientData/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify(patientData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Данные успешно обновлены!');
    } else {
      alert('Ошибка при обновлении данных.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function validateForm() {
  let isValid = true;

  isValid = isValid && validateBP();
  isValid = isValid && validateTemperature();
  isValid = isValid && validatePulse();
  isValid = isValid && validateSaturation();
  isValid = isValid && validateRR();
  isValid = isValid && validateIIN();
  isValid = isValid && validateWeight();
  isValid = isValid && validateHeight();

  return isValid;
}

function highlightField(inputId, isValid, formatHint) {
  const inputElement = document.getElementById(inputId + 'Input');
  if (isValid) {
    inputElement.style.border = '1px solid #ccc';
    inputElement.placeholder = formatHint;
  } else {
    inputElement.style.border = '2px solid red';
    inputElement.placeholder = formatHint;
  }
}


function validateBP() {
  const bpInput = document.getElementById('bpInput');
  const bpValue = bpInput.value;
  
  // Проверяем, что давление содержит только цифры и не более одного слеша
  // Также проверяем, что точек не более одной
  // И не более 3 цифр с каждой стороны относительно слеша
  const isValid = /^\d{1,3}(\.\d{1,3})?\/\d{1,3}(\.\d{1,3})?$/.test(bpValue);
  highlightField('bp', isValid, 'Формат: xxx/xxx');
  return isValid;
}


function validateMKNumber() {
  const mkNumberInput = document.getElementById('mk_numberInput');
  const mkNumberValue = mkNumberInput.value;
  // Проверяем, что номер медкарты содержит не более 4 символов
  const isValid = /^.{1,4}$/.test(mkNumberValue);
  highlightField('mk_number', isValid, 'Не более 4 символов');
  return isValid;
}

function validateTemperature() {
  const temperatureInput = document.getElementById('temperatureInput');
  const temperatureValue = temperatureInput.value;
  // Проверяем, что температура содержит не более 4 цифр включая точку
  const isValid = /^\d{1,4}(\.\d)?$/.test(temperatureValue);
  highlightField('temperature', isValid, 'Формат: xxx.x');
  return isValid;
}

function validatePulse() {
  const pulseInput = document.getElementById('pulseInput');
  const pulseValue = pulseInput.value;
  // Проверяем, что пульс содержит не более 4 цифр
  const isValid = /^\d{1,4}$/.test(pulseValue);
  highlightField('pulse', isValid, 'Не более 4 цифр');
  return isValid;
}

function validateSaturation() {
  const saturationInput = document.getElementById('saturationInput');
  const saturationValue = saturationInput.value;
  // Проверяем, что насыщение содержит не более 4 символов
  const isValid = /^.{1,4}$/.test(saturationValue);
  highlightField('saturation', isValid, 'Не более 4 символов');
  return isValid;
}

function validateRR() {
  const rrInput = document.getElementById('rrInput');
  const rrValue = rrInput.value;
  // Проверяем, что ЧДД содержит не более 3 цифр
  const isValid = /^\d{1,3}$/.test(rrValue);
  highlightField('rr', isValid, 'Не более 3 цифр');
  return isValid;
}

function validateWeight() {
  const weightInput = document.getElementById('weightInput');
  const weightValue = weightInput.value;
  // Проверяем, что вес содержит только цифры
  const isValid = /^\d+$/.test(weightValue);
  highlightField('weight', isValid, 'Только цифры');
  return isValid;
}

function validateHeight() {
  const heightInput = document.getElementById('heightInput');
  const heightValue = heightInput.value;
  // Проверяем, что рост содержит только цифры
  const isValid = /^\d+$/.test(heightValue);
  highlightField('height', isValid, 'Только цифры');
  return isValid;
}

function validateIIN() {
  const iinInput = document.getElementById('iinInput');
  const iinValue = iinInput.value;
  // Проверяем, что ИИН состоит из 12 цифр
  const isValid = /^\d{12}$/.test(iinValue);
  highlightField('iin', isValid, 'Ровно 12 цифр');
  return isValid;
}
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
// модальное окно 
document.getElementById("new_diaries").addEventListener("click", function() {
  document.getElementById("custom-modal").style.display = "block";
  const currentDate = new Date().toISOString().split('T')[0];
  document.getElementById("diary-date").value = currentDate;
});

function closeModal() {
  document.getElementById("custom-modal").style.display = "none";
}

window.onclick = function(event) {
  if (event.target == document.getElementById("custom-modal")) {
      document.getElementById("custom-modal").style.display = "none";
  }
}
// отправка данных модального окна на сервер
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('/add-diary/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') // Add CSRF token for security
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        closeModal();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Function to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}