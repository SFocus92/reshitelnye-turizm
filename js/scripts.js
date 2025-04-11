// Инициализация AOS
AOS.init({ duration: 1000, once: true });

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
  { src: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=2065&q=80', title: 'Поход в Крымские горы', date: 'Май 2023', rating: '4.9' },
  { src: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=2070&q=80', title: 'Рыбалка на озере', date: 'Июнь 2023', rating: '4.8' },
  { src: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=2070&q=80', title: 'Скалолазание в Крыму', date: 'Июль 2023', rating: '5.0' },
  { src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2076&q=80', title: 'Горные лыжи на Эльбрусе', date: 'Январь 2023', rating: '4.9' },
  { src: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2070&q=80', title: 'Горы Крыма', date: 'Август 2023', rating: '5.0' },
  { src: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?auto=format&fit=crop&w=2070&q=80', title: 'Озеро в Крыму', date: 'Сентябрь 2023', rating: '4.9' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2074&q=80', title: 'Лесной поход', date: 'Октябрь 2023', rating: '4.8' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1925&q=80', title: 'Морской берег', date: 'Июль 2023', rating: '4.7' },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1948&q=80', title: 'Закат в горах', date: 'Сентябрь 2023', rating: '4.9' },
  { src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1974&q=80', title: 'Лесной ручей', date: 'Июнь 2023', rating: '4.8' },
  { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=2070&q=80', title: 'Скалы у моря', date: 'Июль 2023', rating: '5.0' },
];

function openModal(src, title, date, rating) {
  const modal = document.getElementById('myModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  modal.classList.remove('hidden');
  modalImg.src = src;
  modalCaption.innerHTML = `${title} (${date}) — Оценка: ${rating}`;
  currentIndex = galleryImages.findIndex(img => img.src === src);
}

function closeModal() {
  document.getElementById('myModal').classList.add('hidden');
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
  const img = galleryImages[currentIndex];
  document.getElementById('modalImage').src = img.src;
  document.getElementById('modalCaption').innerHTML = `${img.title} (${img.date}) — Оценка: ${img.rating}`;
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('prevImage').addEventListener('click', () => changeImage(-1));
document.getElementById('nextImage').addEventListener('click', () => changeImage(1));

// Загрузка медиа
let mediaIndex = 0;
const mediaPerLoad = 4;

function loadMedia() {
  const mediaGrid = document.getElementById('mediaGrid');
  const nextMedia = galleryImages.slice(mediaIndex, mediaIndex + mediaPerLoad);
  nextMedia.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item bg-white rounded-lg overflow-hidden shadow-md cursor-pointer';
    div.innerHTML = `
      <img alt="${item.title}" class="w-full h-48 object-cover" src="${item.src}" loading="lazy" />
      <div class="p-4">
        <h3 class="font-semibold text-gray-800">${item.title}</h3>
        <p class="text-sm text-gray-600 mt-1">${item.date}</p>
        <div class="flex justify-between items-center mt-3">
          <div class="text-blue-500 flex items-center">
            <i class="fas fa-expand mr-1"></i> Увеличить
          </div>
          <div class="flex space-x-2">
            <span class="text-yellow-500"><i class="fas fa-star"></i></span>
            <span>${item.rating}</span>
          </div>
        </div>
      </div>`;
    div.addEventListener('click', () => openModal(item.src, item.title, item.date, item.rating));
    mediaGrid.appendChild(div);
  });
  mediaIndex += mediaPerLoad;
  if (mediaIndex >= galleryImages.length) {
    document.getElementById('loadMoreMedia').classList.add('hidden');
  }
}

document.getElementById('loadMoreMedia').addEventListener('click', loadMedia);
loadMedia();

// Фильтр туров
const trips = [
  { category: 'hiking', title: 'Походы по Крыму', description: 'Живописные маршруты с ночёвками, водопадами и рассветами в горах. Подходит для новичков и опытных.', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2070&q=80', price: 'Цена по запросу' },
  { category: 'climbing', title: 'Тур по скалолазанию', description: 'Тренировки и восхождения с опытными инструкторами. Оборудование предоставляется. Безопасность — приоритет.', image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=2070&q=80' },
  { category: 'skiing', title: 'Горнолыжные курорты России', description: 'Шерегеш, Эльбрус, Красная поляна. Катание, проживание и кайф от снежных склонов!', image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2076&q=80' },
];

function loadTrips(filter = 'all') {
  const tripsGrid = document.getElementById('tripsGrid');
  tripsGrid.innerHTML = '';
  trips.forEach((trip, index) => {
    if (filter === 'all' || trip.category === filter) {
      const div = document.createElement('div');
      div.className = 'trip-card bg-white rounded-lg overflow-hidden shadow-lg';
      div.setAttribute('data-category', trip.category);
      div.setAttribute('data-aos', 'fade-up');
      div.setAttribute('data-aos-delay', (index * 100).toString());
      div.innerHTML = `
        <img alt="${trip.title}" class="w-full h-48 object-cover" src="${trip.image}" loading="lazy" />
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">${trip.title}</h3>
          <p class="text-gray-600 mb-4">${trip.description}</p>
          ${trip.price ? `<p class="text-sm text-gray-500 mb-4 italic">${trip.price}</p>` : ''}
          <a class="booking-btn w-full block text-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg" href="https://t.me/+QLBVE3-mFOw5NGIy" target="_blank">Забронировать в Telegram</a>
        </div>`;
      tripsGrid.appendChild(div);
    }
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-green-600', 'text-white'));
    btn.classList.add('bg-green-600', 'text-white');
    loadTrips(btn.getAttribute('data-filter'));
  });
});
loadTrips();

// Календарь
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  const monthYear = document.getElementById('monthYear');
  calendarGrid.innerHTML = '';
  
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();
  
  monthYear.textContent = new Date(currentYear, currentMonth).toLocaleString('ru', { month: 'long', year: 'numeric' });
  
  days.forEach(day => {
    const div = document.createElement('div');
    div.className = 'font-bold text-gray-800';
    div.textContent = day;
    calendarGrid.appendChild(div);
  });
  
  let adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < adjustedFirstDay; i++) {
    const div = document.createElement('div');
    calendarGrid.appendChild(div);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement('div');
    div.className = 'py-2 rounded-lg hover:bg-gray-200 transition';
    div.textContent = day;
    if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      div.className += ' bg-green-600 text-white';
    }
    calendarGrid.appendChild(div);
  }
}

document.getElementById('prevMonth').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar();
});

generateCalendar();

// Кнопка "Наверх"
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('opacity-0', window.scrollY < 300);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
