document.addEventListener("DOMContentLoaded", function() {
  const timeSheetTable = document.querySelector("#time-sheet table tbody");
  const addEntryButton = document.querySelector("#add-entry");
  const salaryForm = document.querySelector("#salary-form");
  const salaryResult = document.querySelector("#salary-result");

  let timeSheetData = [];

  // Функция для добавления записи в табель
  function addEntryToTimeSheet(date, startTime, endTime) {
    const totalHours = calculateTotalHours(startTime, endTime);
    const entry = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      totalHours: totalHours
    };
    timeSheetData.push(entry);
    renderTimeSheet();
  }

  // Функция для рендеринга табеля
  function renderTimeSheet() {
    timeSheetTable.innerHTML = "";
    timeSheetData.forEach(function(entry) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.startTime}</td>
        <td>${entry.endTime}</td>
        <td>${entry.totalHours}</td>
      `;
      timeSheetTable.appendChild(row);
    });
  }

  // Функция для расчета общего времени
  function calculateTotalHours(startTime, endTime) {
    const start = new Date("1970-01-01 " + startTime);
    const end = new Date("1970-01-01 " + endTime);
    const diff = end - start;
    const hours = diff / 1000 / 60 / 60;
    return hours.toFixed(2);
  }

  // Обработчик кнопки "Добавить запись"
  addEntryButton.addEventListener("click", function() {
    const date = prompt("Введите дату (гггг-мм-дд):");
    const startTime = prompt("Введите время начала работы (чч:мм):");
    const endTime = prompt("Введите время окончания работы (чч:мм):");
    addEntryToTimeSheet(date, startTime, endTime);
  });

  // Обработчик отправки формы с данными о зарплате
  salaryForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const hourlyRate = parseFloat(document.querySelector("#hourly-rate").value);
    const totalHours = parseFloat(document.querySelector("#total-hours").value);
    const totalSalary = hourlyRate * totalHours;
    salaryResult.innerHTML = `Зарплата: ${totalSalary.toFixed(2)} руб.`;
  });
});
