// Инициализация AOS (опционально)
if (typeof AOS !== 'undefined') { AOS.init({ duration: 1000, once: true }); }

// Мобильное меню
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Темная тема
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Модальное окно галереи
let currentIndex = 0;
const galleryImages = [
  { src: 'static/img/gallery-hiking.jpg', title: 'Поход в Крымские горы', date: 'Май 2023', rating: '4.9' },
  { src: 'static/img/gallery-fishing.jpg', title: 'Рыбалка на озере', date: 'Июнь 2023', rating: '4.8' },
  { src: 'static/img/gallery-climbing.jpg', title: 'Скалолазание в Крыму', date: 'Июль 2023', rating: '5.0' },
  { src: 'static/img/gallery-skiing.jpg', title: 'Горные лыжи на Эльбрусе', date: 'Январь 2023', rating: '4.9' },
  { src: 'static/img/gallery-mountains.jpg', title: 'Горы Крыма', date: 'Август 2023', rating: '5.0' },
  { src: 'static/img/gallery-lake.jpg', title: 'Озеро в Крыму', date: 'Сентябрь 2023', rating: '4.9' },
  { src: 'static/img/gallery-forest.jpg', title: 'Лесной поход', date: 'Октябрь 2023', rating: '4.8' },
  { src: 'static/img/gallery-sea.jpg', title: 'Морской берег', date: 'Июль 2023', rating: '4.7' },
  { src: 'static/img/gallery-sunset.jpg', title: 'Закат в горах', date: 'Сентябрь 2023', rating: '4.9' },
  { src: 'static/img/gallery-stream.jpg', title: 'Лесной ручей', date: 'Июнь 2023', rating: '4.8' },
  { src: 'static/img/gallery-rocks.jpg', title: 'Скалы у моря', date: 'Июль 2023', rating: '5.0' },
];

function openModal(src, title, date, rating) {
  const modal = document.getElementById('myModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  modal.style.display = 'block';
  modal.classList.remove('hidden');
  modalImg.src = src;
  modalCaption.innerHTML = title + ' (' + date + ') &mdash; Оценка: ' + rating;
  currentIndex = galleryImages.findIndex(img => img.src === src);
}

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
  modal.classList.add('hidden');
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
  const img = galleryImages[currentIndex];
  document.getElementById('modalImage').src = img.src;
  document.getElementById('modalCaption').innerHTML = img.title + ' (' + img.date + ') &mdash; Оценка: ' + img.rating;
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('prevImage').addEventListener('click', () => changeImage(-1));
document.getElementById('nextImage').addEventListener('click', () => changeImage(1));

// Загрузка медиа (начинаем с 11 — все 11 элементов уже в HTML)
let mediaIndex = 11;
const mediaPerLoad = 4;

function loadMedia() {
  const mediaGrid = document.getElementById('mediaGrid');
  const nextMedia = galleryImages.slice(mediaIndex, mediaIndex + mediaPerLoad);
  if (nextMedia.length === 0) return;
  nextMedia.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item bg-white rounded-lg overflow-hidden shadow-md cursor-pointer';
    div.innerHTML =
      '<img alt="' + item.title + '" class="w-full h-48 object-cover" src="' + item.src + '" loading="lazy" />' +
      '<div class="p-4">' +
        '<h3 class="font-semibold text-gray-800">' + item.title + '</h3>' +
        '<p class="text-sm text-gray-600 mt-1">' + item.date + '</p>' +
        '<div class="flex justify-between items-center mt-3">' +
          '<div class="text-blue-500 flex items-center"><i class="fas fa-expand mr-1"></i> Увеличить</div>' +
          '<div class="flex space-x-2"><span class="text-yellow-500"><i class="fas fa-star"></i></span><span>' + item.rating + '</span></div>' +
        '</div>' +
      '</div>';
    div.addEventListener('click', () => openModal(item.src, item.title, item.date, item.rating));
    mediaGrid.appendChild(div);
  });
  mediaIndex += mediaPerLoad;
  if (mediaIndex >= galleryImages.length) {
    document.getElementById('loadMoreMedia').classList.add('hidden');
  }
}

document.getElementById('loadMoreMedia').addEventListener('click', loadMedia);
// Скрыть кнопку «Загрузить больше» — все 11 элементов уже показаны
document.getElementById('loadMoreMedia').classList.add('hidden');

// Фильтр туров
const trips = [
  { category: 'hiking', title: 'Походы по Крыму', description: 'Живописные маршруты с ночёвками, водопадами и рассветами в горах. Подходит для новичков и опытных.', image: 'static/img/gallery-mountains.jpg', price: 'Цена по запросу' },
  { category: 'climbing', title: 'Тур по скалолазанию', description: 'Тренировки и восхождения с опытными инструкторами. Оборудование предоставляется. Безопасность — приоритет.', image: 'static/img/gallery-climbing.jpg' },
  { category: 'skiing', title: 'Горнолыжные курорты России', description: 'Шерегеш, Эльбрус, Красная поляна. Катание, проживание и кайф от снежных склонов!', image: 'static/img/gallery-skiing.jpg' },
];

function loadTrips(filter) {
  if (filter === undefined) filter = 'all';
  const tripsGrid = document.getElementById('tripsGrid');
  tripsGrid.innerHTML = '';
  trips.forEach(function(trip, index) {
    if (filter === 'all' || trip.category === filter) {
      const div = document.createElement('div');
      div.className = 'trip-card bg-white rounded-lg overflow-hidden shadow-lg';
      div.setAttribute('data-category', trip.category);
      let priceHtml = trip.price ? '<p class="text-sm text-gray-500 mb-4 italic">' + trip.price + '</p>' : '';
      div.innerHTML =
        '<img alt="' + trip.title + '" class="w-full h-48 object-cover" src="' + trip.image + '" loading="lazy" />' +
        '<div class="p-6">' +
          '<h3 class="text-xl font-bold text-gray-800 mb-2">' + trip.title + '</h3>' +
          '<p class="text-gray-600 mb-4">' + trip.description + '</p>' +
          priceHtml +
          '<a class="booking-btn w-full block text-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg" href="https://t.me/+QLBVE3-mFOw5NGIy" target="_blank">Забронировать в Telegram</a>' +
        '</div>';
      tripsGrid.appendChild(div);
    }
  });
}

document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.remove('bg-green-600', 'text-white');
      b.classList.add('text-green-700');
    });
    btn.classList.add('bg-green-600', 'text-white');
    btn.classList.remove('text-green-700');
    loadTrips(btn.getAttribute('data-filter'));
  });
});
loadTrips();

// Календарь
var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();

function generateCalendar() {
  var calendarGrid = document.getElementById('calendarGrid');
  var monthYear = document.getElementById('monthYear');
  calendarGrid.innerHTML = '';

  var days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  var firstDay = new Date(currentYear, currentMonth, 1).getDay();
  var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  var today = new Date();

  monthYear.textContent = new Date(currentYear, currentMonth).toLocaleString('ru', { month: 'long', year: 'numeric' });

  days.forEach(function(day) {
    var div = document.createElement('div');
    div.className = 'font-bold text-gray-800';
    div.textContent = day;
    calendarGrid.appendChild(div);
  });

  var adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  for (var i = 0; i < adjustedFirstDay; i++) {
    var emptyDiv = document.createElement('div');
    calendarGrid.appendChild(emptyDiv);
  }

  for (var day = 1; day <= daysInMonth; day++) {
    var div = document.createElement('div');
    div.className = 'py-2 rounded-lg hover:bg-gray-200 transition';
    div.textContent = day;
    if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      div.className += ' bg-green-600 text-white';
    }
    calendarGrid.appendChild(div);
  }
}

document.getElementById('prevMonth').addEventListener('click', function() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', function() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar();
});

generateCalendar();

// Кнопка "Наверх"
var scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', function() {
  if (window.scrollY < 300) {
    scrollTopBtn.classList.add('opacity-0');
    scrollTopBtn.classList.remove('opacity-100');
  } else {
    scrollTopBtn.classList.remove('opacity-0');
    scrollTopBtn.classList.add('opacity-100');
  }
});
scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
