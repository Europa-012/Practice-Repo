const day = createInputObject('day');
const month = createInputObject('month');
const year = createInputObject('year');
// a reusable function that takes a prefix and generates an object for each field
function createInputObject(prefix) {
  return {
    label: document.getElementById(`js-${prefix}-label`),
    input: document.getElementById(`js-${prefix}-input`),
    errorMsg: document.getElementById(`js-${prefix}-message`),
    output: document.getElementById(`js-${prefix}-output`)
  };
}

// submit
const submitButtonElement = document.getElementById('js-submit-button');
submitButtonElement.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  validateInput(day, month, year);
});

function validateInput(day, month, year) {
  if (!isAnyEmpty(day, month, year)) {
    const inputDate = new Date(`${year.input.value}-${month.input.value}-${day.input.value}`);
    if (isValidDate(inputDate)) {
      getDateDifference(inputDate, new Date());
    }
  }
}

function isAnyEmpty(day, month, year) {
  let isAnyEmpty = false;

  [day, month, year].forEach(element => {
    if (element.input.value === '') {
      setStyles(element, true, 'This field is required.');
      isAnyEmpty = true;
    }
  });
  return isAnyEmpty;
}

function isValidDate(inputDate) {
  
  // Check if the entered date is a valid date and is in the past
   if (!isNaN(inputDate) && inputDate < new Date()) {
    [day, month, year].forEach(element => setStyles(element, false, ''));
    return true;
   } else {
    [day, month, year].forEach(element => setStyles(element, true, 'Invalid date.'));
    return false;
   }
}

function setStyles(element, isError, message) {
  element.label.style.color = isError ? "hsl(0, 100%, 67%)" : "";
  element.input.style.borderColor = isError ? "hsl(0, 100%, 67%)" : "";
  element.errorMsg.innerHTML = message;
}

function getDateDifference(startDate, endDate) {
  // Calculate the time difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Calculate the number of milliseconds in a day, month, and year
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const oneMonth = 30.44 * oneDay; // approximate milliseconds in a month
  const oneYear = 365.25 * oneDay; // approximate milliseconds in a year

  // Calculate the difference in years, months, and days
  const yearsDifference = Math.floor(timeDifference / oneYear);
  const monthsDifference = Math.floor((timeDifference % oneYear) / oneMonth);
  const daysDifference = Math.floor(((timeDifference % oneYear) % oneMonth) / oneDay);

  day.output.innerHTML = daysDifference;
  month.output.innerHTML = monthsDifference;
  year.output.innerHTML = yearsDifference;
}