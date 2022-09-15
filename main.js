const paginationNumbers = document.getElementById('pagination-numbers');
const paginatedList = document.getElementById('paginated-list');
const listItems = paginatedList.querySelectorAll('li');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

// disable previous button if on page 1, disable next button if on last page
const disableButton = (button) => {
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
};
const enableButton = (button) => {
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

// remove active class from each button and add it for the page we are on
const handleActivePageNumber = () => {
  document.querySelectorAll('.pagination-number').forEach((button) => {
    button.classList.remove('active');
    const pageIndex = Number(button.getAttribute('page-index'));
    if (pageIndex == currentPage) {
      button.classList.add('active');
    }
  });
};

// Create button for page number and add buttons to container
const appendPageNumber = (index) => {
  const pageNumber = document.createElement('button');
  pageNumber.className = 'pagination-number';
  pageNumber.innerHTML = index;
  pageNumber.setAttribute('page-index', index);
  pageNumber.setAttribute('aria-label', 'Page ' + index);

  paginationNumbers.appendChild(pageNumber);
};

// call create buttons fn for amount of pages needed.
const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

// only display as many items as defined in paginationLimit
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  // call function to add active class on current Page
  handleActivePageNumber();
  // check navigation every time a new page is clicked
  handlePageButtonsStatus();

  // get range of list items shown on each page
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  // loop through the list and initially hide all items, only display those that are within range
  listItems.forEach((item, index) => {
    item.classList.add('hidden');
    if (index >= prevRange && index < currRange) {
      item.classList.remove('hidden');
    }
  });
};

window.addEventListener('load', () => {
  // set up the page navigation
  getPaginationNumbers();
  // set current Page to first on page load
  setCurrentPage(1);

  // eventListeners for buttons
  prevButton.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  });
  nextButton.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  });

  // event listener to change current page
  document.querySelectorAll('.pagination-number').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page-index'));

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
