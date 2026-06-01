// ===== EDUPLATFORM - ENHANCED VERSION =====
// Complete Online Learning System
// Version 3.0 - Improved Mobile & Admin Panel


// ===== STATE MANAGEMENT =====
let currentUser = null;
let selectedRating = 0;
let selectedCourse = null;
let selectedRole = null;
let currentDashTab = 'overview';
let currentPage = 1;
let itemsPerPage = 22;
let searchQuery = '';
let filteredCourses = [];
let notifications = [];

// ===== COURSES DATA =====
const courses = [
    { id: 1, title: "Python негиздери", cat: "Программалоо", time: "8 жума", price: 2500, desc: "Нөлдөн баштап Python үйрөнүү. Базалык синтаксис, функциялар, класстар.", teacher: "Азамат Токтогулов", lessons: 24, enrolled: 45, rating: 4.8, reviews: 32, img: "python.jpg", level: "Баштапкы" },
    { id: 2, title: "JavaScript Pro", cat: "Программалоо", time: "10 жума", price: 3200, desc: "Заманбап веб-интерфейстер. ES6+, DOM, Async/Await.", teacher: "Салтанат Кыдырбаева", lessons: 32, color: "#f7df1e", enrolled: 38, rating: 4.7, reviews: 28, img: "js.png", level: "Орто" },
    { id: 3, title: "UI/UX Дизайн", cat: "Дизайн", time: "6 жума", price: 2800, desc: "Figma жана Adobe XD менен профессионалдык дизайн.", teacher: "Гүлмира Асанова", lessons: 18, color: "#ff6b6b", enrolled: 52, rating: 4.9, reviews: 41, img: "dizain.jpg", level: "Баштапкы" },
    { id: 4, title: "Англис тили B1", cat: "Тилдер", time: "12 жума", price: 1900, desc: "Сүйлөшүү жана грамматика. Күнүмдүк диалогдор.", teacher: "Sarah Johnson", lessons: 36, color: "#0077b6", enrolled: 67, rating: 4.6, reviews: 55, img: "english.png", level: "Орто" },
    { id: 5, title: "SMM & Таргет", cat: "Маркетинг", time: "5 жума", price: 2200, desc: "Социалдык тармактарда маркетинг. Instagram, Facebook, TikTok.", teacher: "Бакыт Оrozов", lessons: 15, color: "#118ab2", enrolled: 41, rating: 4.5, reviews: 19, img: "smm.png", level: "Баштапкы" },
    { id: 6, title: "Flutter Мобилдик", cat: "Технология", time: "14 жума", price: 4500, desc: "iOS & Android тиркемелери. Dart тили, Widget'тер.", teacher: "Азамат Токтогулов", lessons: 42, color: "#00f5d4", enrolled: 29, rating: 4.8, reviews: 22, img: "flutter.png", level: "Өнүккөн" },
    { id: 7, title: "Киберкоопсуздук", cat: "Технология", time: "11 жума", price: 3900, desc: "Тармакты коргоо. Этикалык хакерлик, тестирлөө.", teacher: "Эрлан Жуманов", lessons: 33, color: "#7209b7", enrolled: 22, rating: 4.9, reviews: 15, img: "kiber.png", level: "Өнүккөн" },
    { id: 8, title: "Excel & Data Analysis", cat: "Бизнес", time: "6 жума", price: 1500, desc: "Маалыматтарды анализдөө. Pivot таблицалар, формулалар.", teacher: "Эрлан Жуманов", lessons: 18, color: "#219ebc", enrolled: 55, rating: 4.4, reviews: 38, img: "exsel.png", level: "Баштапкы" },
    { id: 9, title: "React.js Advanced", cat: "Программалоо", time: "11 жума", price: 3600, desc: "Заманбап фронтенд. Hooks, Redux, Next.js.", teacher: "Азамат Токтогулов", lessons: 30, color: "#61dafb", enrolled: 43, rating: 4.7, reviews: 31, img: "react.jpg", level: "Өнүккөн" },
    { id: 10, title: "3D Моделирование", cat: "Дизайн", time: "9 жума", price: 3400, desc: "Blender менен иштөө. Моделдөө, текстура, анимация.", teacher: "Гүлмира Асанова", lessons: 27, color: "#6a4c93", enrolled: 19, rating: 4.6, reviews: 12, img: "3d.jpeg", level: "Орто" },
    { id: 11, title: "Корей тили", cat: "Тилдер", time: "9 жума", price: 2100, desc: "Hangul жана сөздөр. K-pop маданияты менен үйрөнүү.", teacher: "Min-jun Kim", lessons: 27, color: "#ef476f", enrolled: 33, rating: 4.8, reviews: 25, img: "korei.png", level: "Баштапкы" },
    { id: 12, title: "SEO Оптимизация", cat: "Маркетинг", time: "4 жума", price: 1800, desc: "Google'do алдыга чыгуу. Ачкыч сөздөр, бекемдөө.", teacher: "Бакыт Оrozов", lessons: 12, color: "#06d6a0", enrolled: 28, rating: 4.3, reviews: 16, img: "seo.png", level: "Баштапкы" },
    { id: 13, title: "Python AI & ML", cat: "Программалоо", time: "12 жума", price: 4800, desc: "Машиналык үйрөнүү. TensorFlow, нейрондук тармактар.", teacher: "Салтанат Кыдырбаева", lessons: 36, color: "#ff9f1c", enrolled: 31, rating: 4.9, reviews: 27, img: "python ai.png", level: "Өнүккөн" },
    { id: 14, title: "Япон тили N5", cat: "Тилдер", time: "10 жума", price: 2300, desc: "Hiragana, Katakana, Kanji. JLPT N5 даярдоо.", teacher: "Yuki Tanaka", lessons: 30, color: "#e63946", enrolled: 26, rating: 4.7, reviews: 18, img: "japon.jpg", level: "Баштапкы" },
    { id: 15, title: "Бизнес Стратегия", cat: "Бизнес", time: "8 жума", price: 3100, desc: "Стартап жана башкаруу. MVP, инвестиция, масштабдоо.", teacher: "Эрлан Жуманов", lessons: 24, color: "#8ac926", enrolled: 37, rating: 4.5, reviews: 21, img: "biznes.png", level: "Орто" },
    { id: 16, title: "Digital Marketing Pro", cat: "Маркетинг", time: "7 жума", price: 2700, desc: "Реклама жана аналитика. Google Ads, Яндекс.Директ.", teacher: "Бакыт Оrozов", lessons: 21, color: "#2b2d42", enrolled: 44, rating: 4.6, reviews: 29, img: "digital.jpg", level: "Орто" },
    { id: 17, title: "Финансылык сабаттуулук", cat: "Бизнес", time: "5 жума", price: 1200, desc: "Бюджет, инвестиция, кредит. Жеке финансыңызды башкарыңыз.", teacher: "Эрлан Жуманов", lessons: 15, color: "#38b000", enrolled: 61, rating: 4.7, reviews: 43, img: "finans.jpg", level: "Баштапкы" },
    { id: 18, title: "Кыргыз тили адабияты", cat: "Тилдер", time: "6 жума", price: 1100, desc: "Грамматика жана чыгармачылык. Классикалык адабият.", teacher: "Айгүл Маматова", lessons: 18, color: "#9d0208", enrolled: 48, rating: 4.5, reviews: 35, img: "kyrgyz.png", level: "Баштапкы" },
    { id: 19, title: "Video Editing Pro", cat: "Дизайн", time: "7 жума", price: 2900, desc: "Premiere Pro & After Effects. Монтаж, VFX, түстү коррекциялоо.", teacher: "Гүлмира Асанова", lessons: 21, color: "#ffbe0b", enrolled: 35, rating: 4.6, reviews: 24, img: "video.jpg", level: "Орто" },
    { id: 20, title: "Графикалык Дизайн", cat: "Дизайн", time: "7 жума", price: 2400, desc: "Photoshop, Illustrator. Логотип, брендинг, печать.", teacher: "Гүлмира Асанова", lessons: 21, color: "#9c88ff", enrolled: 39, rating: 4.5, reviews: 26, img: "dizaingraf.jpg", level: "Баштапкы" }
];

// ===== ACHIEVEMENTS DATA =====
const achievementsData = [
    { id: 'first_course', icon: '🎯', title: 'Биринчи кадам', desc: 'Биринчи курска катталдыңыз', condition: (u) => (u && u.enrolledCourses || []).length >= 1 },
    { id: 'three_courses', icon: '📚', title: 'Китепканачы', desc: '3 курска катталдыңыз', condition: (u) => (u && u.enrolledCourses || []).length >= 3 },
    { id: 'five_courses', icon: '🏆', title: 'Билим сарайы', desc: '5 курска катталдыңыз', condition: (u) => (u && u.enrolledCourses || []).length >= 5 },
    { id: 'first_complete', icon: '✅', title: 'Бүтүрүүчү', desc: 'Биринчи курсту бүтүрдүңүз', condition: (u) => (u && u.enrolledCourses || []).some(e => e.progress === 100) },
    { id: 'perfect_student', icon: '⭐', title: 'Мыкты студент', desc: 'Бардык сабактарды 100% бүтүрдүңүз', condition: (u) => u && (u.enrolledCourses || []).length > 0 && (u.enrolledCourses || []).every(e => e.progress === 100) },
    { id: 'reviewer', icon: '💬', title: 'Пикирчи', desc: 'Биринчи пикириңизди калтырдыңыз', condition: (u) => false },
    { id: 'night_owl', icon: '🦉', title: 'Түнкү үкү', desc: 'Түнкү саат 12ден кийин кирдиңиз', condition: () => { const hours = new Date().getHours(); return hours >= 0 && hours < 6; } }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initAuth();
    initSearch();
    initPagination();
    initPasswordStrength();
    initEmailValidation();
    renderCourses();
    initReviews();
    setupEventListeners();
    checkAchievements();
    applySiteTexts();
});

// ===== THEME =====
function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon();
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    if (typeof showToast === 'function') {
        showToast(isDark ? '☀️ Жарык тема' : '🌙 Караңгы тема', 'info');
    }
}

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const dashToggle = document.getElementById('dashThemeToggle');
    if (dashToggle) dashToggle.textContent = isDark ? '☀️' : '🌙';
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('menuOverlay');
    const toggle = document.getElementById('mobileToggle');

    if (!navLinks || !overlay) return;

    if (navLinks.classList.contains('active')) {
        closeMobileMenu();
    } else {
        navLinks.classList.add('active');
        overlay.classList.add('active');
        if (toggle) toggle.textContent = '✕';
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('menuOverlay');
    const toggle = document.getElementById('mobileToggle');

    if (!navLinks || !overlay) return;

    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    if (toggle) toggle.textContent = '☰';
    document.body.style.overflow = '';
}

// ===== ОҢДОЛГОН ЖАНА КУРГАК КАЛЫПТАР (STUBS) =====
function initSearch() { console.log("Search initialized"); }
function initPagination() { console.log("Pagination initialized"); }
function initPasswordStrength() { console.log("Password strength checked"); }
function initEmailValidation() { console.log("Email validation initialized"); }
function initReviews() { console.log("Reviews initialized"); }
function setupEventListeners() { console.log("Event listeners setup completed"); }
function checkAchievements() { console.log("Achievements checked"); }
function applySiteTexts() { console.log("Site texts applied"); }

function renderCourses() {
    console.log("Courses rendered:", courses.length);
}

// ===== DASHBOARD SIDEBAR TOGGLE =====
// ===== DASHBOARD SIDEBAR TOGGLE =====
function toggleDashSidebar() {
    const sidebar = document.getElementById('dashSidebar');
    const overlay = document.getElementById('dashOverlay');
    
    if (!sidebar || !overlay) return;

    if (sidebar.classList.contains('active')) {
        // ЖАБУУ
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Скроллду кайтаруу
    } else {
        // АЧУУ
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Арткы сайтты скроллдоого тыюу салуу
    }
}

// ===== AUTH (Иштеген логикасы) =====
function initAuth() {
    try {
        const saved = localStorage.getItem('currentUser');
        if (saved) {
            currentUser = JSON.parse(saved);
            updateAuthUI();
            if (typeof checkAchievements === 'function') {
                checkAchievements();
            }
        }
    } catch (e) {
        console.error('Auth error:', e);
    }
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userBadge = document.getElementById('userBadge');
    const adminLink = document.getElementById('adminLink');

    if (!loginBtn || !registerBtn || !logoutBtn || !userBadge) return;

    if (currentUser && currentUser.name) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-flex';
        userBadge.style.display = 'inline-flex';
        userBadge.textContent = '👤 ' + currentUser.name;

        if (currentUser.role === 'admin' && adminLink) {
            adminLink.style.display = 'inline-flex';
        }
    } else {
        loginBtn.style.display = 'inline-flex';
        registerBtn.style.display = 'inline-flex';
        logoutBtn.style.display = 'none';
        userBadge.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
    }
}

// ===== SEARCH =====
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value.toLowerCase().trim();
        currentPage = 1;
        if (typeof renderCourses === 'function') renderCourses();
    });

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchQuery = searchInput.value.toLowerCase().trim();
            currentPage = 1;
            if (typeof renderCourses === 'function') renderCourses();
        });
    }
}

// ===== PASSWORD STRENGTH =====
function initPasswordStrength() {
    const passInputs = document.querySelectorAll('#sPass, #tPass, #newPassInput');
    passInputs.forEach(function(input) {
        if (!input) return;
        input.addEventListener('input', function() {
            const val = this.value;
            const parent = this.parentElement;
            if (!parent) return;
            
            const meter = parent.querySelector('.password-strength');
            if (!meter) return;

            let strength = 0;
            if (val.length >= 6) strength++;
            if (val.length >= 10) strength++;
            if (/[A-Z]/.test(val)) strength++;
            if (/[0-9]/.test(val)) strength++;
            if (/[^A-Za-z0-9]/.test(val)) strength++;

            // Түстөр массиви 0дөн 5ке чейинки күчкө ылайыкталды
            const colors = ['#ddd', '#ef476f', '#ff9f1c', '#ffd166', '#06d6a0', '#118ab2'];

            meter.style.width = (strength / 5 * 100) + '%';
            meter.style.background = colors[strength] || '#ddd';
        });
    });
}

// ===== EMAIL VALIDATION =====
function initEmailValidation() {
    const emailInputs = document.querySelectorAll('#sEmail, #tEmail, #loginEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailInputs.forEach(function(input) {
        if (!input) return;
        input.addEventListener('blur', function() {
            const isValid = emailRegex.test(this.value);
            this.style.borderColor = isValid || !this.value ? '' : '#ef476f';
        });
    });
}

// ===== MODALS =====
function openModal(modalId) {
    if (!modalId) return;
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Оңдоо: modalId келбей калса же ката болсо коргоо кошулду
function closeModal(modalId) {
    if (!modalId) return;
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchTab(tabName) {
    if (!tabName) return;
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(function(c) {
        c.classList.remove('active');
    });

    const targetBtn = document.querySelector('[data-tab="' + tabName + '"]');
    const targetContent = document.getElementById(tabName + 'Tab');

    if (targetBtn) targetBtn.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
}

// Close modal on overlay click
window.addEventListener('click', function(e) {
    if (e.target && e.target.classList && typeof e.target.classList.contains === 'function' && e.target.classList.contains('modal-overlay')) {
        if (e.target.id) {
            closeModal(e.target.id);
        }
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(function(m) {
            if (m && m.id) {
                closeModal(m.id);
            }
        });
    }
});
// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Role Selection
    document.querySelectorAll('.role-card').forEach(function(card) {
        if (!card) return;
        card.addEventListener('click', function() {
            if (typeof selectRole === 'function') {
                selectRole(this.dataset.role);
            } else {
                console.warn('selectRole функциясы табылган жок:', this.dataset.role);
            }
        });
    });

    // Stars
    const stars = document.querySelectorAll('#starInput span');
    if (stars.length > 0) {
        stars.forEach(function(star) {
            if (!star) return;
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.dataset.val) || 0;
                const rRatingInput = document.getElementById('rRating');
                if (rRatingInput) rRatingInput.value = selectedRating;
                highlightStars(selectedRating);
            });
            star.addEventListener('mouseenter', function() { 
                highlightStars(parseInt(this.dataset.val) || 0); 
            });
            star.addEventListener('mouseleave', function() { 
                highlightStars(selectedRating); 
            });
        });
    }
}

function highlightStars(val) {
    document.querySelectorAll('#starInput span').forEach(function(s) {
        if (!s) return;
        const sVal = parseInt(s.dataset.val) || 0;
        s.style.color = sVal <= val ? 'var(--warning, #ffd166)' : '#ddd';
        s.style.transform = sVal <= val ? 'scale(1.1)' : 'scale(1)';
    });
}

// Роль тандоо логикасы (Оңдолду: кайталанма код алынды жана коопсуздук текшерүүсү кошулду)
function selectRole(role) {
    if (!role) return;
    selectedRole = role;
    
    document.querySelectorAll('.role-card').forEach(function(c) { 
        if (c) c.classList.remove('selected'); 
    });
    
    const targetCard = document.querySelector('[data-role="' + role + '"]');
    if (targetCard) {
        targetCard.classList.add('selected');
    }
    
    const studentForm = document.getElementById('studentRegisterForm');
    const teacherForm = document.getElementById('teacherRegisterForm');
    
    if (studentForm) studentForm.style.display = role === 'student' ? 'block' : 'none';
    if (teacherForm) teacherForm.style.display = role === 'teacher' ? 'block' : 'none';
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== USER MANAGEMENT =====
function registerStudent() {
    const emailInput = document.getElementById('sEmail');
    const passInput = document.getElementById('sPass');
    
    if (!emailInput || !passInput) return;
    
    const email = emailInput.value.trim();
    const pass = passInput.value;
    
    if (!validateEmail(email)) { 
        if (typeof showToast === 'function') showToast('❌ Туура email киргизиңиз!', 'danger'); 
        return; 
    }
    if (pass.length < 6) { 
        if (typeof showToast === 'function') showToast('❌ Сырсөз 6 символдон узун болушу керек!', 'danger'); 
        return; 
    }

    const nameEl = document.getElementById('sName');
    const phoneEl = document.getElementById('sPhone');
    const birthEl = document.getElementById('sBirthdate');
    const eduEl = document.getElementById('sEducation');

    if (typeof registerUser === 'function') {
        registerUser({
            id: 'u' + Date.now(),
            name: nameEl ? nameEl.value : '',
            email: email,
            password: pass,
            phone: phoneEl ? phoneEl.value : '',
            birthdate: birthEl ? birthEl.value : '',
            education: eduEl ? eduEl.value : '',
            role: 'student',
            enrolledCourses: [],
            certificates: [],
            achievements: [],
            createdAt: new Date().toISOString()
        });
    } else {
        console.warn('registerUser функциясы аныкталган эмес.');
    }
}

function registerTeacher() {
    const emailInput = document.getElementById('tEmail');
    const passInput = document.getElementById('tPass');
    
    if (!emailInput || !passInput) return;
    
    const email = emailInput.value.trim();
    const pass = passInput.value;
    
    if (!validateEmail(email)) { 
        if (typeof showToast === 'function') showToast('❌ Туура email киргизиңиз!', 'danger'); 
        return; 
    }
    if (pass.length < 6) { 
        if (typeof showToast === 'function') showToast('❌ Сырсөз 6 символдон узун болушу керек!', 'danger'); 
        return; 
    }

    const nameEl = document.getElementById('tName');
    const specialtyEl = document.getElementById('tSpecialty');
    const expEl = document.getElementById('tExp');
    const eduEl = document.getElementById('tEducation');
    const bioEl = document.getElementById('tBio');

    if (typeof registerUser === 'function') {
        registerUser({
            id: 'u' + Date.now(),
            name: nameEl ? nameEl.value : '',
            email: email,
            password: pass,
            specialty: specialtyEl ? specialtyEl.value : '',
            experience: expEl ? expEl.value : '',
            education: eduEl ? eduEl.value : '',
            bio: bioEl ? bioEl.value : '',
            role: 'teacher',
            courses: [],
            rating: 0,
            totalStudents: 0,
            achievements: [],
            createdAt: new Date().toISOString()
        });
    } else {
        console.warn('registerUser функциясы аныкталган эмес.');
    }
}

function registerUser(userData) {
    try {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(function(u) { return u.email === userData.email; })) {
            if (typeof showToast === 'function') showToast('❌ Бул email мурун катталган!', 'danger');
            return;
        }
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        loginSuccess(userData);
        
        if (typeof closeModal === 'function') closeModal('authModal');
        if (typeof showToast === 'function') showToast('✅ Ийгиликтүү катталдыңыз! Кош келдиңиз, ' + userData.name + '!', 'success');

        const studentForm = document.getElementById('studentRegisterForm');
        const teacherForm = document.getElementById('teacherRegisterForm');

        if (studentForm) {
            studentForm.reset();
            studentForm.style.display = 'none';
        }
        if (teacherForm) {
            teacherForm.reset();
            teacherForm.style.display = 'none';
        }
        
        document.querySelectorAll('.role-card').forEach(function(c) { 
            if (c) c.classList.remove('selected'); 
        });

        if (typeof checkAchievements === 'function') checkAchievements();
    } catch (e) {
        if (typeof showToast === 'function') showToast('Ката кетти!', 'danger');
    }
}

function handleLogin() {
    try {
        const emailEl = document.getElementById('loginEmail');
        const passEl = document.getElementById('loginPass');
        
        const email = emailEl ? emailEl.value.trim() : '';
        const pass = passEl ? passEl.value : '';

        if (email === 'admin@edu.kg' && pass === '123456') {
            loginSuccess({ id: 'admin', name: 'Админ', email: email, role: 'admin', createdAt: new Date().toISOString() });
            if (typeof closeModal === 'function') closeModal('authModal');
            if (typeof showToast === 'function') showToast('✅ Admin катары кирдиңиз!', 'success');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(function(u) { return u.email === email && u.password === pass; });

        if (user) {
            loginSuccess(user);
            if (typeof closeModal === 'function') closeModal('authModal');
            if (typeof showToast === 'function') showToast('✅ Кош келдиңиз, ' + user.name + '! 👋', 'success');
            if (typeof checkAchievements === 'function') checkAchievements();
        } else {
            if (typeof showToast === 'function') showToast('❌ Email же сырсөз туура эмес!', 'danger');
        }
    } catch (e) {
        if (typeof showToast === 'function') showToast('Ката кетти!', 'danger');
    }
}

function loginSuccess(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (typeof updateAuthUI === 'function') updateAuthUI();
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    if (typeof updateAuthUI === 'function') updateAuthUI();
    if (typeof exitDashboard === 'function') exitDashboard();
    if (typeof showToast === 'function') showToast('🚪 Системадан чыктыңыз. Кайра көрүшкөнчө!', 'info');
    window.location.reload();
}

// ===== COURSES RENDERING =====
function renderCourses() {
    const grid = document.getElementById('coursesGrid');
    const filters = document.getElementById('categoryFilters');
    const pagination = document.getElementById('pagination');

    if (!grid) return;

    filteredCourses = courses.filter(function(c) {
        if (!searchQuery) return true;
        return c.title.toLowerCase().includes(searchQuery) ||
               c.cat.toLowerCase().includes(searchQuery) ||
               c.teacher.toLowerCase().includes(searchQuery) ||
               c.desc.toLowerCase().includes(searchQuery);
    });

    // Render filters
    if (filters) {
        const categories = ['Бардыгы'];
        courses.forEach(function(c) { 
            if (c && c.cat && !categories.includes(c.cat)) categories.push(c.cat); 
        });

        filters.innerHTML = categories.map(function(cat) {
            return '<button class="filter-btn' + (cat === 'Бардыгы' ? ' active' : '') + '" data-cat="' + cat + '" onclick="filterCourses(this)">' + cat + '</button>';
        }).join('');
    }
}

   // Жогорудагы мамлекетке кошумча (State)
let selectedCategory = 'Бардыгы'; 

// ===== COURSES RENDERING (Уландысы) =====
function renderCourses() {
    const grid = document.getElementById('coursesGrid');
    const filters = document.getElementById('categoryFilters');
    const pagination = document.getElementById('pagination');

    if (!grid) return;

    // Издөө жана категория боюнча чыпкалоону бириктирүү (Оңдолду)
    filteredCourses = courses.filter(function(c) {
        if (!c) return false;
        
        const matchesSearch = !searchQuery || 
               (c.title && c.title.toLowerCase().includes(searchQuery)) ||
               (c.cat && c.cat.toLowerCase().includes(searchQuery)) ||
               (c.teacher && c.teacher.toLowerCase().includes(searchQuery)) ||
               (c.desc && c.desc.toLowerCase().includes(searchQuery));
               
        const matchesCategory = selectedCategory === 'Бардыгы' || c.cat === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Фильтр баскычтарын чыгаруу
    if (filters) {
        const categories = ['Бардыгы'];
        courses.forEach(function(c) { 
            if (c && c.cat && !categories.includes(c.cat)) categories.push(c.cat); 
        });

        filters.innerHTML = categories.map(function(cat) {
            const isActive = cat === selectedCategory ? ' active' : '';
            return '<button class="filter-btn' + isActive + '" data-cat="' + cat + '" onclick="filterCourses(this)">' + cat + '</button>';
        }).join('');
    }

    // Пагинация эсептөөсү
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageCourses = filteredCourses.slice(start, end);

    // Курстардын карточкаларын чыгаруу
    if (pageCourses.length === 0) {
        grid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-state-icon">🔍</div><h3>Эч нерсе табылган жок</h3><p>Башка сөз менен издеп көрүңүз</p></div>';
    } else {
        grid.innerHTML = pageCourses.map(function(c) {
            if (!c) return '';
            return '<div class="course-card" data-cat="' + c.cat + '">' +
                   '<div class="course-img"><img src="' + (c.img || 'https://via.placeholder.com/300x150?text=' + encodeURIComponent(c.title || 'Course')) + '" alt="' + (c.title || 'Course') + '"></div>' +
                   '<div class="course-body">' +
                   '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
                   '<span class="course-tag" style="background:' + (c.color || '#ccc') + '25; color:' + (c.color || '#666') + '">' + c.cat + '</span>' +
                   '<span class="badge badge-primary" style="font-size:0.7rem;">' + c.level + '</span>' +
                   '</div>' +
                   '<h3 class="course-title">' + c.title + '</h3>' +
                   '<p class="course-desc">' + c.desc + '</p>' +
                   '<div class="course-meta">' +
                   '<span>⏱ ' + c.time + '</span>' +
                   '<span>👥 ' + c.enrolled + ' студент</span>' +
                   '<span>⭐ ' + c.rating + '</span>' +
                   '</div>' +
                   '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">' +
                   '<span class="course-price">' + (typeof c.price === 'number' ? c.price.toLocaleString() : c.price) + ' сом</span>' +
                   '<button class="btn btn-outline btn-sm" onclick="showCourseInfo(' + c.id + '); return false;">Маалымат</button>' +
                   '</div>' +
                   '</div></div>';
        }).join('');
    }

    // Пагинацияны чыгаруу
    if (pagination) {
        const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
        if (totalPages > 1) {
            let pagesHtml = '<button class="btn btn-sm" onclick="goToPage(' + (currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + '>←</button>';
            for (let i = 1; i <= totalPages; i++) {
                pagesHtml += '<button class="btn btn-sm ' + (i === currentPage ? 'btn-primary' : 'btn-outline') + '" onclick="goToPage(' + i + ')">' + i + '</button>';
            }
            pagesHtml += '<button class="btn btn-sm" onclick="goToPage(' + (currentPage + 1) + ')" ' + (currentPage === totalPages ? 'disabled' : '') + '>→</button>';
            pagination.innerHTML = pagesHtml;
            pagination.style.display = 'flex';
        } else {
            pagination.style.display = 'none';
        }
    }
}

// Категория фильтри (Оңдолду: пагинация бузулбашы үчүн renderCourses чакырылат)
function filterCourses(btn) {
    if (!btn) return;
    selectedCategory = btn.dataset.cat || 'Бардыгы';
    currentPage = 1; // Фильтр алмашканда биринчи бетке кайтаруу
    renderCourses();
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderCourses();
    
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function initPagination() {
    // Пагинация renderCourses ичинде башкарылат
}

// ===== COURSE INFO =====
function showCourseInfo(id) {
    selectedCourse = courses.find(function(c) { return c.id === id; });
    if (!selectedCourse) return;

    const titleEl = document.getElementById('cmTitle');
    const detailsEl = document.getElementById('cmDetails');

    if (titleEl) titleEl.textContent = selectedCourse.title;
    if (detailsEl) {
        detailsEl.innerHTML = 
            '<div class="detail-row"><span class="detail-label">Категория</span><span class="badge badge-primary">' + selectedCourse.cat + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">Деңгээл</span><span class="badge badge-success">' + selectedCourse.level + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">Мугалим</span><span>👨‍🏫 ' + selectedCourse.teacher + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">Узактыгы</span><span>⏱ ' + selectedCourse.time + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">Сабактар</span><span>📚 ' + selectedCourse.lessons + ' сабак</span></div>' +
            '<div class="detail-row"><span class="detail-label">Студенттер</span><span>👥 ' + selectedCourse.enrolled + ' адам катталган</span></div>' +
            '<div class="detail-row"><span class="detail-label">Рейтинг</span><span>⭐ ' + selectedCourse.rating + '/5 (' + selectedCourse.reviews + ' пикир)</span></div>' +
            '<div class="detail-row"><span class="detail-label">Баасы</span><span class="course-price" style="font-size:1.3rem;">' + (typeof selectedCourse.price === 'number' ? selectedCourse.price.toLocaleString() : selectedCourse.price) + ' сом</span></div>' +
            '<div class="detail-row"><span class="detail-label">Сүрөттөмө</span><span>' + selectedCourse.desc + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">Сертификат</span><span>✅ Бар</span></div>';
    }
    if (typeof openModal === 'function') openModal('courseModal');
}

// ===== ENROLLMENT =====
function enrollCourse() {
    if (!selectedCourse) return;
    
    if (!currentUser) {
        if (typeof showToast === 'function') showToast('Курска жазылуу үчүн кириңиз!', 'danger');
        if (typeof closeModal === 'function') closeModal('courseModal');
        if (typeof openModal === 'function') openModal('authModal');
        return;
    }
    if (currentUser.role !== 'student') {
        if (typeof showToast === 'function') showToast('Тек гана студенттер каттала алат!', 'danger');
        return;
    }
    if (!currentUser.enrolledCourses) currentUser.enrolledCourses = [];

    const alreadyEnrolled = currentUser.enrolledCourses.find(function(e) { 
        return e && e.courseId === selectedCourse.id; 
    });

    if (alreadyEnrolled) {
        if (typeof showToast === 'function') showToast('Сиз бу курга мурун катталгансыз!', 'danger');
        if (typeof closeModal === 'function') closeModal('courseModal');
        return;
    }

    showPaymentModal(selectedCourse);
}

function showPaymentModal(course) {
    if (!course) return;
    
    const pName = document.getElementById('paymentCourseName');
    const pAmount = document.getElementById('paymentAmount');
    const confirmBtn = document.getElementById('confirmPayment');
    
    if (pName) pName.textContent = course.title;
    if (pAmount) pAmount.textContent = (typeof course.price === 'number' ? course.price.toLocaleString() : course.price) + ' сом';
    
    if (typeof openModal === 'function') openModal('paymentModal');

    if (confirmBtn) {
        confirmBtn.onclick = function() {
            if (typeof closeModal === 'function') closeModal('paymentModal');
            if (typeof completeEnrollment === 'function') {
                completeEnrollment(course);
            } else {
                console.warn('completeEnrollment функциясы табылган жок.');
            }
        };
    }
}

function completeEnrollment(course) {
    if (!course || !currentUser) return;
    if (!currentUser.enrolledCourses) currentUser.enrolledCourses = [];

    const enrollment = {
        courseId: course.id,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        completedLessons: 0,
        lastAccessed: new Date().toISOString()
    };
    
    currentUser.enrolledCourses.push(enrollment);

    // Курстун өзүндөгү катталгандардын санын көбөйтүү
    const c = courses.find(function(x) { return x && x.id === course.id; });
    if (c) {
        c.enrolled = (c.enrolled || 0) + 1;
    }

    if (course.teacher) {
        updateTeacherStats(course.teacher);
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Жалпы колдонуучулардын базасын жаңыртуу
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(function(u) { return u && u.id === currentUser.id; });
    if (idx !== -1) { 
        users[idx] = currentUser; 
        localStorage.setItem('users', JSON.stringify(users)); 
    }

    if (typeof closeModal === 'function') closeModal('courseModal');
    if (typeof showToast === 'function') showToast('🎉 "' + (course.title || '') + '" курсуна катталдыңыз! Билимге жол ачык! 🚀', 'success');
    
    if (typeof renderCourses === 'function') renderCourses();
    if (typeof checkAchievements === 'function') checkAchievements();
}

function updateTeacherStats(teacherName) {
    if (!teacherName) return;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const teacher = users.find(function(u) { return u && u.role === 'teacher' && u.name === teacherName; });
    if (teacher) {
        teacher.totalStudents = (teacher.totalStudents || 0) + 1;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Эгер учурда кирген колдонуучу ушул мугалим болсо, анын абалын да жаңыртабыз
        if (currentUser && currentUser.id === teacher.id) {
            currentUser.totalStudents = teacher.totalStudents;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }
}

// ===== REVIEWS =====
function initReviews() {
    const track = document.getElementById('liveReviewTrack');
    if (!track) return;

    let reviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');
    if (reviews.length === 0) {
        reviews = [
            { name: "Айбек", role: "Студент", text: "Платформа абдан ыңгайлуу! Курстар сапаттуу жана практикалык.", rating: 5, date: "2026-04-15" },
            { name: "Гүлмира", role: "Мугалим", text: "Студенттер менен иштөө оңой. Интерфейс жакшы ойлонуп чыгарылган.", rating: 4, date: "2026-04-10" },
            { name: "Нурлан", role: "Студент", text: "Python курсу сонун! Азамат мугалим мыкты түшүндүрөт. Рекомендация кылам!", rating: 5, date: "2026-04-08" },
            { name: "Айгүл", role: "Студент", text: "Дизайн курстары практикалык. Ишке алып чыгып калдым.", rating: 5, date: "2026-04-05" },
            { name: "Бакыт", role: "Мугалим", text: "Курс кошуу функциясы жакшы иштейт. Студенттердин прогресстин көрүү керемет.", rating: 4, date: "2026-04-01" }
        ];
        localStorage.setItem('siteReviews', JSON.stringify(reviews));
    }
    
    renderReviewCards(reviews);
    
    if (typeof startReviewAnimation === 'function') {
        startReviewAnimation();
    }
}

function renderReviewCards(reviews) {
    const track = document.getElementById('liveReviewTrack');
    if (!track || !Array.isArray(reviews)) return;

    // Чекитсиз (бесконечный) скролл эффекти үчүн массивди эки эселейбиз
    const allReviews = reviews.concat(reviews);

    track.innerHTML = allReviews.map(function(r) {
        if (!r) return '';
        const name = r.name || 'Колдонуучу';
        const role = r.role || 'Студент';
        const text = r.text || '';
        const rating = parseInt(r.rating) || 5;
        
        let starsStr = '';
        for (let i = 0; i < 5; i++) {
            starsStr += (i < rating) ? '★' : '☆';
        }

        return '<div class="review-card">' +
               '<div class="review-header"><div class="review-avatar">' + name.charAt(0) + '</div>' +
               '<div><h4 style="margin:0; font-size:0.95rem;">' + name + '</h4>' +
               '<span style="font-size:0.8rem; color:var(--primary); font-weight:600;">' + role + '</span></div></div>' +
               '<p style="font-size:0.9rem; line-height:1.4; color:var(--text-muted); margin-bottom:10px;">"' + text + '"</p>' +
               '<div style="color:var(--warning); font-size:1.1rem;">' + starsStr + '</div></div>';
    }).join('');
}

function submitReview() {
    const nameInput = document.getElementById('rName');
    const roleInput = document.getElementById('rRole');
    const textInput = document.getElementById('rText');
    const ratingInput = document.getElementById('rRating');

    if (!nameInput || !roleInput || !textInput || !ratingInput) return;

    const name = nameInput.value.trim();
    const role = roleInput.value.trim();
    const text = textInput.value.trim();
    const rating = parseInt(ratingInput.value) || 0;

    if (!name || !role || !text || rating === 0) {
        if (typeof showToast === 'function') showToast('Бардык талааларды толтуруңуз!', 'danger');
        return;
    }

    const newReview = { 
        name: name, 
        role: role, 
        text: text, 
        rating: rating, 
        date: new Date().toISOString().split('T')[0] 
    };

    let reviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');
    reviews.push(newReview);
    localStorage.setItem('siteReviews', JSON.stringify(reviews));

    if (typeof renderReviewCards === 'function') renderReviewCards(reviews);
    
    const form = document.getElementById('newReviewForm');
    if (form) form.reset();
    
    selectedRating = 0;
    ratingInput.value = 0;
    if (typeof highlightStars === 'function') highlightStars(0);

    if (typeof showToast === 'function') showToast('✅ Пикириңиз кошулду! Рахмат!', 'success');

    // Колдонуучунун "Пикирчи" жетишкендигин текшерүү
    if (currentUser) {
        const ach = currentUser.achievements || [];
        if (!ach.includes('reviewer')) {
            ach.push('reviewer');
            currentUser.achievements = ach;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Базаны синхрондоштуруу
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            const idx = users.findIndex(function(u) { return u && u.id === currentUser.id; });
            if (idx !== -1) {
                users[idx] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            if (typeof showToast === 'function') showToast('🏆 Жаңы жетишкендик: Пикирчи!', 'success');
        }
    }
}

function startReviewAnimation() {
    const track = document.getElementById('liveReviewTrack');
    if (!track) return;

    let scrollAmount = 0;
    const speed = 0.5;
    let isPaused = false;

    // Иштеп жаткан эски окуяларды тазалоо жана жаңыларын кошуу
    track.onmouseenter = function() { isPaused = true; };
    track.onmouseleave = function() { isPaused = false; };

    function animate() {
        if (!track) return; // Эгер элемент DOMдон өчүп кетсе, анимацияны токтотуу
        if (!isPaused) {
            scrollAmount -= speed;
            const trackWidth = track.scrollWidth / 2;
            if (trackWidth > 0 && Math.abs(scrollAmount) >= trackWidth) {
                scrollAmount = 0;
            }
        }
        track.style.transform = 'translateX(' + scrollAmount + 'px)';
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== ACHIEVEMENTS =====
function checkAchievements() {
    if (!currentUser || typeof achievementsData === 'undefined') return;
    const userAchievements = currentUser.achievements || [];
    let newUnlocked = [];

    achievementsData.forEach(function(ach) {
        if (ach && !userAchievements.includes(ach.id) && typeof ach.condition === 'function' && ach.condition(currentUser)) {
            userAchievements.push(ach.id);
            newUnlocked.push(ach);
        }
    });

    if (newUnlocked.length > 0) {
        currentUser.achievements = userAchievements;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const idx = users.findIndex(function(u) { return u && u.id === currentUser.id; });
        if (idx !== -1) { 
            users[idx] = currentUser; 
            localStorage.setItem('users', JSON.stringify(users)); 
        }

        newUnlocked.forEach(function(ach) {
            if (typeof showToast === 'function') {
                showToast('🏆 Ачылды: ' + (ach.title || '') + '! ' + (ach.desc || ''), 'success');
            }
        });
    }
}

function renderAchievements() {
    if (!currentUser || typeof achievementsData === 'undefined') return '';
    const userAch = currentUser.achievements || [];
    
    return '<div class="achievements-grid">' + achievementsData.map(function(ach) {
        if (!ach) return '';
        const unlocked = userAch.includes(ach.id);
        return '<div class="achievement-card ' + (unlocked ? 'unlocked' : 'locked') + '">' +
               '<div class="achievement-icon">' + (unlocked ? (ach.icon || '🏆') : '🔒') + '</div>' +
               '<h4>' + (ach.title || '') + '</h4>' +
               '<p>' + (ach.desc || '') + '</p>' +
               '</div>';
    }).join('') + '</div>';
}

// ===== FULL DASHBOARD =====
function openDashboard() {
    if (!currentUser) {
        if (typeof showToast === 'function') showToast('Системага кириңиз!', 'danger');
        if (typeof openModal === 'function') openModal('authModal');
        return;
    }
    
    const mainSite = document.getElementById('mainSite');
    const dash = document.getElementById('fullDashboard');
    
    if (mainSite) mainSite.style.display = 'none';
    if (dash) dash.style.display = 'flex';

    const greeting = document.getElementById('dashGreeting');
    const avatar = document.getElementById('dashAvatar');
    const userName = document.getElementById('dashUserName');
    const roleBadge = document.getElementById('dashRoleBadge');

    const uName = currentUser.name || 'Колдонуучу';

    if (greeting) greeting.textContent = 'Салам, ' + uName + '! 👋';
    if (avatar) avatar.textContent = uName.charAt(0).toUpperCase();
    if (userName) userName.textContent = uName;

    if (roleBadge) {
        const roleText = currentUser.role === 'teacher' ? '👨‍🏫 Мугалим' :
                         currentUser.role === 'admin' ? '⚙️ Админ' : '👨‍🎓 Студент';
        roleBadge.textContent = roleText;
    }

    buildSidebarMenu();
    if (typeof switchDashTab === 'function') switchDashTab('overview');
} outdoors

function exitDashboard() {
    const mainSite = document.getElementById('mainSite');
    const dash = document.getElementById('fullDashboard');
    
    if (dash) dash.style.display = 'none';
    if (mainSite) mainSite.style.display = 'block';
    window.scrollTo(0, 0);
}

function buildSidebarMenu() {
    const nav = document.getElementById('dashNav');
    if (!nav || !currentUser) return;

    let menuItems = [];
    if (currentUser.role === 'student') {
        menuItems = [
            { id: 'overview', icon: 'fa-th-large', label: 'Обзор' },
            { id: 'profile', icon: 'fa-user', label: 'Профиль' },
            { id: 'my-courses', icon: 'fa-book', label: 'Менин курстарым' },
            { id: 'certificates', icon: 'fa-certificate', label: 'Сертификаттарым' },
            { id: 'progress', icon: 'fa-chart-line', label: 'Прогресс' },
            { id: 'achievements', icon: 'fa-trophy', label: 'Жетишкендиктер' }
        ];
    } else if (currentUser.role === 'teacher') {
        menuItems = [
            { id: 'overview', icon: 'fa-th-large', label: 'Обзор' },
            { id: 'profile', icon: 'fa-user', label: 'Профиль' },
            { id: 'my-courses', icon: 'fa-book', label: 'Менин курстарым' },
            { id: 'students', icon: 'fa-users', label: 'Студенттерим' },
            { id: 'analytics', icon: 'fa-chart-bar', label: 'Аналитика' },
            { id: 'add-course', icon: 'fa-plus-circle', label: 'Курс кошуу' }
        ];
    } else if (currentUser.role === 'admin') {
        menuItems = [
            { id: 'overview', icon: 'fa-th-large', label: 'Обзор' },
            { id: 'users', icon: 'fa-users', label: 'Колдонуучулар' },
            { id: 'all-courses', icon: 'fa-book', label: 'Бардык курстар' },
            { id: 'add-course', icon: 'fa-plus-circle', label: 'Курс кошуу' },
            { id: 'reviews', icon: 'fa-comments', label: 'Пикирлер' },
            { id: 'edit-texts', icon: 'fa-edit', label: 'Тексттер' },
            { id: 'analytics', icon: 'fa-chart-pie', label: 'Аналитика' }
        ];
    }

    // Түзөтүлдү: onclick окуясындагы ички тырмакчалар качырылды (\")
    nav.innerHTML = menuItems.map(function(item) {
        return '<a href="#" data-tab="' + item.id + '" onclick="switchDashTab(\'' + item.id + '\'); return false;"><i class="fas ' + item.icon + '"></i> ' + item.label + '</a>';
    }).join('');
}

function switchDashTab(tabId) {
    currentDashTab = tabId;
    document.querySelectorAll('.dash-nav a').forEach(function(a) {
        if (a) a.classList.toggle('active', a.dataset.tab === tabId);
    });

    // Мобилдик каптал менюну тандоодон кийин жабуу
    if (window.innerWidth <= 768 && typeof toggleDashSidebar === 'function') {
        toggleDashSidebar();
    }

    const statsGrid = document.getElementById('dashStats');
    const bodyArea = document.getElementById('dashBodyArea');

    if (!statsGrid || !bodyArea || !currentUser) return;

    if (currentUser.role === 'student') {
        renderStudentTab(tabId, statsGrid, bodyArea);
    } else if (currentUser.role === 'teacher') {
        if (typeof renderTeacherTab === 'function') renderTeacherTab(tabId, statsGrid, bodyArea);
    } else if (currentUser.role === 'admin') {
        if (typeof renderAdminTab === 'function') renderAdminTab(tabId, statsGrid, bodyArea);
    }
}

// ===== STUDENT DASHBOARD =====
function renderStudentTab(tabId, statsGrid, bodyArea) {
    if (!statsGrid || !bodyArea) return;
    
    const enrolled = currentUser.enrolledCourses || [];
    const certs = currentUser.certificates || [];

    switch(tabId) {
        case 'overview':
            const totalProgress = enrolled.length > 0 ? Math.round(enrolled.reduce(function(s, e) { return s + (parseInt(e.progress) || 0); }, 0) / enrolled.length) : 0;
            statsGrid.innerHTML = 
                '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + enrolled.length + '</h3><p>Курстарым</p></div>' +
                '<div class="stat-box"><div class="stat-icon">⏱️</div><h3>' + (enrolled.length * 8) + '</h3><p>Сааттар</p></div>' +
                '<div class="stat-box"><div class="stat-icon">📜</div><h3>' + certs.length + '</h3><p>Сертификаттар</p></div>' +
                '<div class="stat-box"><div class="stat-icon">✅</div><h3>' + totalProgress + '%</h3><p>Прогресс</p></div>';

            bodyArea.innerHTML = '<h3>📚 Акыркы курстарым</h3>';
            if (enrolled.length === 0) {
                // Түзөтүлдү: onclick ичиндеги тырмакчалар бири-бирине туура келгидей оңдолду
                bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📚</div><p>Сиз дагы курска каттала элексиз</p><button class="btn btn-primary" onclick="exitDashboard(); const el = document.getElementById(\'courses\'); if(el) el.scrollIntoView({behavior:\'smooth\'});">Курстарды карап чыгуу</button></div>';
            } else {
                bodyArea.innerHTML += '<div id="studentCoursesList"></div>';
                renderStudentCoursesList();
            }
            break;

        case 'profile':
            statsGrid.innerHTML = '';
            bodyArea.innerHTML = renderStudentProfile();
            break;

        case 'my-courses':
            const activeCourses = enrolled.filter(function(e) { return e && e.progress > 0 && e.progress < 100; }).length;
            const completedCourses = enrolled.filter(function(e) { return e && e.progress === 100; }).length;
            statsGrid.innerHTML = 
                '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + enrolled.length + '</h3><p>Бардыгы</p></div>' +
                '<div class="stat-box"><div class="stat-icon">▶️</div><h3>' + activeCourses + '</h3><p>Уланууда</p></div>' +
                '<div class="stat-box"><div class="stat-icon">✅</div><h3>' + completedCourses + '</h3><p>Бүтүрүлгөн</p></div>' +
                '<div class="stat-box"><div class="stat-icon">🏆</div><h3>' + (currentUser.achievements || []).length + '</h3><p>Жетишкендиктер</p></div>';

            bodyArea.innerHTML = '<h3>📚 Менин курстарым</h3><div id="studentCoursesList"></div>';
            renderStudentCoursesList();
            break;

        case 'certificates':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📜</div><h3>' + certs.length + '</h3><p>Сертификаттар</p></div>';
            bodyArea.innerHTML = '<h3>📜 Менин сертификаттарым</h3>';
            if (certs.length === 0) {
                bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📜</div><p>Сертификаттар жок. Курстарды бүтүрүңүз!</p></div>';
            } else {
                bodyArea.innerHTML += '<div class="cert-grid">' + certs.map(function(c) {
                    if (!c) return '';
                    return '<div class="cert-card"><h4>' + (c.courseName || '') + '</h4><p>' + (currentUser.name || 'Колдонуучу') + '</p><div class="cert-date">' + (c.date || '') + '</div></div>';
                }).join('') + '</div>';
            }
            break;

        // ==========================================
// 1. СТУДЕНТТИН КОШУМЧА ФУНКЦИЯЛАРЫ
// ==========================================

function renderStudentProfile() {
    if (!currentUser) return '';
    const uName = currentUser.name || 'Колдонуучу';
    
    // Катталган датаны текшерүү
    const regDate = currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('ky-KG') : 'Көрсөтүлгөн эмес';

    return '<div class="profile-section">' +
           '<div class="profile-card">' +
           '<div class="profile-avatar-large">' + uName.charAt(0).toUpperCase() + '</div>' +
           '<div class="profile-info"><h3>' + uName + '</h3><p>👨‍🎓 Студент</p></div>' +
           '<button class="btn btn-outline" style="margin-top:15px; width:100%;" onclick="openEditProfile()">✏️ Түзөтүү</button>' +
           '</div>' +
           '<div class="profile-details">' +
           '<h3 style="margin-bottom:20px;">Жеке маалыматтар</h3>' +
           '<div class="detail-row"><span class="detail-label">Аты-жөнү</span><span class="detail-value">' + uName + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">' + (currentUser.email || '') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Телефон</span><span class="detail-value">' + (currentUser.phone || 'Көрсөтүлгөн эмес') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Туулган күнү</span><span class="detail-value">' + (currentUser.birthdate || 'Көрсөтүлгөн эмес') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Билими</span><span class="detail-value">' + (currentUser.education || 'Көрсөтүлгөн эмес') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Катталган</span><span class="detail-value">' + regDate + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Рол</span><span class="badge badge-success">Студент</span></div>' +
           '</div></div>';
}

function renderStudentCoursesList() {
    const list = document.getElementById('studentCoursesList');
    if (!list || !currentUser || typeof courses === 'undefined') return;

    const enrolled = currentUser.enrolledCourses || [];
    if (enrolled.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📚</div><p>Курстар жок</p></div>';
        return;
    }

    list.innerHTML = enrolled.map(function(e) {
        if (!e) return '';
        const course = courses.find(function(c) { return c && c.id === e.courseId; });
        if (!course) return '';

        const prog = parseInt(e.progress) || 0;
        const statusBadge = prog === 100 ? '<span class="badge badge-success">Бүтүрүлдү</span>' :
                            prog > 0 ? '<span class="badge badge-primary">Уланууда</span>' :
                            '<span class="badge badge-warning">Жаңы</span>';

        const descText = course.desc ? (course.desc.substring(0, 80) + '...') : '';

        return '<div class="dash-card-item">' +
               '<div style="display:flex; justify-content:space-between; align-items:start;">' +
               '<h4>📚 ' + (course.title || '') + '</h4>' + statusBadge +
               '</div>' +
               '<p>' + descText + '</p>' +
               '<div class="meta">' +
               '<span>👨‍🏫 ' + (course.teacher || 'Көрсөтүлгөн эмес') + '</span>' +
               '<span>⏱ ' + (course.time || '') + '</span>' +
               '<span>📚 ' + (e.completedLessons || 0) + '/' + (course.lessons || 0) + ' сабак</span>' +
               '</div>' +
               '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">' +
               '<span class="badge badge-primary">' + prog + '%</span>' +
               '<button class="btn btn-primary btn-sm" onclick="continueCourse(' + course.id + ')">▶️ Улантуу</button>' +
               '</div>' +
               '<div class="progress-bar" style="margin-top:8px;"><div class="progress-fill" style="width:' + prog + '%"></div></div>' +
               '</div>';
    }).join('');
}


// ==========================================
// 2. МУГАЛИМДИН БАШКАРУУ ПАНЕЛИ (TEACHER DASHBOARD)
// ==========================================

function renderTeacherTab(tabId, statsGrid, bodyArea) {
    if (!statsGrid || !bodyArea || !currentUser || typeof courses === 'undefined') return;

    // Мугалимге тиешелүү курстарды чыпкалоо
    const myCourses = courses.filter(function(c) { return c && c.teacher === currentUser.name; });
    
    let myStudents = [];
    let uniqueStudentNames = new Set();
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Мугалимдин студенттерин чогултуу
    users.forEach(function(u) {
        if (u && u.role === 'student' && u.enrolledCourses) {
            u.enrolledCourses.forEach(function(e) {
                const course = courses.find(function(c) { return c && c.id === e.courseId; });
                if (course && course.teacher === currentUser.name) {
                    myStudents.push({ 
                        studentName: u.name, 
                        courseName: course.title, 
                        progress: e.progress, 
                        enrolledAt: e.enrolledAt || '' 
                    });
                    uniqueStudentNames.add(u.name);
                }
            });
        }
    });

    // Өтмөктөр боюнча мазмунду тандап чыгаруу
    switch(tabId) {
        case 'overview':
            // Жалпы кирешени коопсуз эсептөө
            const totalIncome = myCourses.reduce(function(s, c) { 
                return s + ((parseInt(c.price) || 0) * (parseInt(c.enrolled) || 0)); 
            }, 0);

            statsGrid.innerHTML = 
                '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + myCourses.length + '</h3><p>Курстарым</p></div>' +
                '<div class="stat-box"><div class="stat-icon">👥</div><h3>' + uniqueStudentNames.size + '</h3><p>Студенттер</p></div>' +
                '<div class="stat-box"><div class="stat-icon">⭐</div><h3>' + (currentUser.rating || 5) + '</h3><p>Рейтинг</p></div>' +
                '<div class="stat-box"><div class="stat-icon">💰</div><h3>' + totalIncome.toLocaleString() + ' сом</h3><p>Киреше</p></div>';

            bodyArea.innerHTML = '<h3>📊 Обзор</h3>' +
                '<div class="dash-card-item"><h4>📚 Акыркы курстарым</h4>' +
                (myCourses.length === 0 ? '<p>Курстар жок</p>' : myCourses.slice(0, 3).map(function(c) {
                    if (!c) return '';
                    const studentCount = parseInt(c.enrolled) || 0;
                    return '<p style="margin: 8px 0;">📚 ' + (c.title || '') + ' - <strong>' + studentCount + '</strong> студент</p>';
                }).join('')) + '</div>';
            break;

        case 'profile':
            statsGrid.innerHTML = '';
            if (typeof renderTeacherProfile === 'function') {
                bodyArea.innerHTML = renderTeacherProfile();
            } else {
                bodyArea.innerHTML = '<h3>👨‍🏫 Профиль</h3><p>Профиль көрсөтүү функциясы табылган жок.</p>';
            }
            break;

        case 'my-courses':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + myCourses.length + '</h3><p>Бардыгы</p></div>';
            bodyArea.innerHTML = '<h3>📚 Менин курстарым</h3>';
            if (myCourses.length === 0) {
                bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📚</div><p>Курстар жок</p></div>';
            } else {
                bodyArea.innerHTML += myCourses.map(function(c) {
                    if (!c) return '';
                    const studentCount = parseInt(c.enrolled) || 0;
                    const coursePrice = parseInt(c.price) || 0;
                    const courseRating = c.rating || '5';
                    const descText = c.desc ? c.desc : 'Кыскача маалымат берилген эмес.';

                    return '<div class="dash-card-item"><h4>📚 ' + (c.title || '') + '</h4>' +
                           '<p>' + descText + '</p>' +
                           '<div class="meta">' +
                               '<span>👥 ' + studentCount + ' студент</span> ' +
                               '<span>💰 ' + coursePrice.toLocaleString() + ' сом</span> ' +
                               '<span>⭐ ' + courseRating + '</span>' +
                           '</div>' +
                           '<div style="margin-top:10px;">' +
                               '<button class="btn btn-outline btn-sm" onclick="viewCourseStudents(' + c.id + ')">👥 Студенттерди көрүү</button>' +
                           '</div></div>';
                }).join('');
            }
            break;
            
        default:
            bodyArea.innerHTML = '<h3>Маалымат азырынча даяр элек</h3>';
            break;
    }
}
       // ========================================================
// 1. МУГАЛИМДИН SWITCH-CASE ШАРТТАРЫ (renderTeacherTab ичинде болот)
// ========================================================

        case 'students':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">👥</div><h3>' + myStudents.length + '</h3><p>Бардык студенттер</p></div>';
            bodyArea.innerHTML = '<h3>👥 Менин студенттерим</h3>';
            if (myStudents.length === 0) {
                bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">👥</div><p>Студенттер жок</p></div>';
            } else {
                bodyArea.innerHTML += '<div class="table-responsive"><table class="data-table"><thead><tr><th>Аты</th><th>Курс</th><th>Прогресс</th><th>Катталган күндү</th></tr></thead><tbody>' +
                myStudents.map(function(s) {
                    if (!s) return '';
                    const progressVal = parseInt(s.progress) || 0;
                    
                    // Датаны коопсуз форматтоо
                    let formattedDate = 'Көрсөтүлгөн эмес';
                    if (s.enrolledAt) {
                        const d = new Date(s.enrolledAt);
                        if (!isNaN(d.getTime())) {
                            formattedDate = d.toLocaleDateString('ky-KG');
                        }
                    }

                    return '<tr>' +
                               '<td><strong>' + (s.studentName || '') + '</strong></td>' +
                               '<td>' + (s.courseName || '') + '</td>' +
                               '<td>' +
                                   '<div class="progress-bar" style="width:100px; display:inline-block; vertical-align:middle; margin-right:8px;">' +
                                       '<div class="progress-fill" style="width:' + progressVal + '%"></div>' +
                                   '</div> ' + progressVal + '%' +
                               '</td>' +
                               '<td>' + formattedDate + '</td>' +
                           '</tr>';
                }).join('') + '</tbody></table></div>';
            }
            break;

        case 'analytics':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📊</div><h3>' + myStudents.length + '</h3><p>Бардык студенттер</p></div>';
            bodyArea.innerHTML = '<h3>📊 Аналитика</h3>';
            if (myCourses.length === 0) {
                bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📊</div><p>Аналитика үчүн курстар керек</p></div>';
            } else {
                bodyArea.innerHTML += '<div class="dash-card-item"><h4>📚 Курстар боюнча статистика</h4>' +
                myCourses.map(function(c) {
                    if (!c) return '';
                    const enrolledCount = parseInt(c.enrolled) || 0;
                    const priceVal = parseInt(c.price) || 0;
                    const ratingVal = c.rating || '5';
                    return '<p style="margin: 8px 0;">📚 ' + (c.title || '') + ': <strong>' + enrolledCount + '</strong> студент, ⭐ ' + ratingVal + ', 💰 ' + (priceVal * enrolledCount).toLocaleString() + ' сом</p>';
                }).join('') + '</div>' +
                '<div class="dash-card-item"><h4>👥 Студенттердин активдүүлүгү</h4>' +
                '<p style="margin: 6px 0;">Активдүү студенттер: <strong>' + myStudents.filter(function(s) { return s && parseInt(s.progress) > 0 && parseInt(s.progress) < 100; }).length + '</strong></p>' +
                '<p style="margin: 6px 0;">Бүтүргөн студенттер: <strong>' + myStudents.filter(function(s) { return s && parseInt(s.progress) === 100; }).length + '</strong></p>' +
                '<p style="margin: 6px 0;">Жаңы катталгандар (Акыркы 7 күн): <strong>' + myStudents.filter(function(s) { return s && s.enrolledAt && new Date(s.enrolledAt) > new Date(Date.now() - 7 * 86400000); }).length + '</strong></p></div>';
            }
            break;


// ========================================================
// 2. ЖАРДАМЧЫ ФУНКЦИЯЛАР (Сыртта, өзүнчө турушу керек)
// ========================================================

function renderTeacherProfile() {
    if (!currentUser) return '';
    const uName = currentUser.name || 'Мугалим';
    const regDate = currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('ky-KG') : 'Көрсөтүлгөн эмес';

    return '<div class="profile-section">' +
           '<div class="profile-card">' +
           '<div class="profile-avatar-large" style="background:#4a90e2; color:#fff;">' + uName.charAt(0).toUpperCase() + '</div>' +
           '<div class="profile-info"><h3>' + uName + '</h3><p>👨‍🏫 Мугалим</p></div>' +
           '<button class="btn btn-outline" style="margin-top:15px; width:100%;" onclick="openEditProfile()">✏️ Профилди оңдоо</button>' +
           '</div>' +
           '<div class="profile-details">' +
           '<h3 style="margin-bottom:20px;">Мугалимдин маалыматы</h3>' +
           '<div class="detail-row"><span class="detail-label">Аты-жөнү</span><span class="detail-value">' + uName + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">' + (currentUser.email || '') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Телефон</span><span class="detail-value">' + (currentUser.phone || 'Көрсөтүлгөн эмес') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Адистиги</span><span class="detail-value">' + (currentUser.specialty || 'Көрсөтүлгөн эмес') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Катталган күндү</span><span class="detail-value">' + regDate + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Статус</span><span class="badge badge-success">Активдүү</span></div>' +
           '</div></div>';
}
       // ========================================================
// 1. МУГАЛИМДИН КАЛГАН SWITCH-CASE ШАРТТАРЫ (renderTeacherTab ичинде)
// ========================================================

        case 'my-courses':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + myCourses.length + '</h3><p>Бардыгы</p></div>';
            bodyArea.innerHTML = '<h3>📚 Менин курстарым</h3>';
            if (myCourses.length === 0) {
                bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📚</div><p>Курстар жок</p></div>';
            } else {
                bodyArea.innerHTML += myCourses.map(function(c) {
                    if (!c) return '';
                    return '<div class="dash-card-item"><h4>📚 ' + (c.title || '') + '</h4>' +
                           '<p>' + (c.desc || '') + '</p>' +
                           '<div class="meta">' +
                               '<span>👥 ' + (c.enrolled || 0) + ' студент</span> ' +
                               '<span>💰 ' + (parseInt(c.price) || 0).toLocaleString() + ' сом</span> ' +
                               '<span>⭐ ' + (c.rating || 5) + '</span>' +
                           '</div>' +
                           '<div style="margin-top:10px;">' +
                               '<button class="btn btn-outline btn-sm" onclick="viewCourseStudents(' + c.id + ')">👥 Студенттерди көрүү</button>' +
                           '</div></div>';
                }).join('');
            }
            break;

        case 'students':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">👥</div><h3>' + myStudents.length + '</h3><p>Бардык студенттер</p></div>';
            bodyArea.innerHTML = '<h3>👥 Менин студенттерим</h3>';
            if (myStudents.length === 0) {
                bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">👥</div><p>Студенттер жок</p></div>';
            } else {
                bodyArea.innerHTML += '<div class="table-responsive"><table class="data-table"><thead><tr><th>Аты</th><th>Курс</th><th>Прогресс</th><th>Катталган</th></tr></thead><tbody>' +
                myStudents.map(function(s) {
                    if (!s) return '';
                    const prog = parseInt(s.progress) || 0;
                    const dateStr = s.enrolledAt ? new Date(s.enrolledAt).toLocaleDateString('ky-KG') : 'Көрсөтүлгөн эмес';
                    return '<tr>' +
                               '<td>' + (s.studentName || '') + '</td>' +
                               '<td>' + (s.courseName || '') + '</td>' +
                               '<td><div class="progress-bar" style="width:100px; display:inline-block; vertical-align:middle; margin-right:5px;"><div class="progress-fill" style="width:' + prog + '%"></div></div> ' + prog + '%</td>' +
                               '<td>' + dateStr + '</td>' +
                           '</tr>';
                }).join('') + '</tbody></table></div>';
            }
            break;

        case 'analytics':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📊</div><h3>' + myStudents.length + '</h3><p>Бардык студенттер</p></div>';
            bodyArea.innerHTML = '<h3>📊 Аналитика</h3>';
            if (myCourses.length === 0) {
                bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📊</div><p>Аналитика үчүн курстар керек</p></div>';
            } else {
                bodyArea.innerHTML += '<div class="dash-card-item"><h4>📚 Курстар боюнча статистика</h4>' +
                myCourses.map(function(c) {
                    if (!c) return '';
                    const eCount = parseInt(c.enrolled) || 0;
                    const pVal = parseInt(c.price) || 0;
                    return '<p style="margin:6px 0;">📚 ' + c.title + ': ' + eCount + ' студент, ⭐ ' + (c.rating || 5) + ', 💰 ' + (pVal * eCount).toLocaleString() + ' сом</p>';
                }).join('') + '</div>' +
                '<div class="dash-card-item"><h4>👥 Студенттердин активдүүлүгү</h4>' +
                '<p style="margin:6px 0;">Активдүү студенттер: <strong>' + myStudents.filter(function(s) { return s && parseInt(s.progress) > 0 && parseInt(s.progress) < 100; }).length + '</strong></p>' +
                '<p style="margin:6px 0;">Бүтүргөн студенттер: <strong>' + myStudents.filter(function(s) { return s && parseInt(s.progress) === 100; }).length + '</strong></p>' +
                '<p style="margin:6px 0;">Жаңы катталгандар: <strong>' + myStudents.filter(function(s) { return s && s.enrolledAt && new Date(s.enrolledAt) > new Date(Date.now() - 7 * 86400000); }).length + '</strong></p></div>';
            }
            break;

        case 'add-course':
            statsGrid.innerHTML = '';
            bodyArea.innerHTML = '<h3>➕ Жаңы курс кошуу</h3>' +
            '<form id="dashAddCourseForm" style="max-width:600px;">' +
            '<div class="form-group"><label>Курс аталышы *</label><input type="text" id="dashNewTitle" required></div>' +
            '<div class="form-group"><label>Категория *</label><select id="dashNewCat" required><option value="">Тандаңыз</option><option>Программалоо</option><option>Дизайн</option><option>Тилдер</option><option>Маркетинг</option><option>Технология</option><option>Бизнес</option></select></div>' +
            '<div class="form-group"><label>Деңгээл *</label><select id="dashNewLevel" required><option value="">Тандаңыз</option><option value="Баштапкы">Баштапкы</option><option value="Орто">Орто</option><option value="Өнүккөн">Өнүккөн</option></select></div>' +
            '<div class="form-group"><label>Узактыгы *</label><input type="text" id="dashNewTime" placeholder="Мисалы: 8 жума" required></div>' +
            '<div class="form-group"><label>Сабактар *</label><input type="number" id="dashNewLessons" min="1" value="20" required></div>' +
            '<div class="form-group"><label>Баасы (сом) *</label><input type="number" id="dashNewPrice" min="0" required></div>' +
            '<div class="form-group"><label>Сүрөттөмө *</label><textarea id="dashNewDesc" rows="3" required></textarea></div>' +
            '<button type="submit" class="btn btn-primary">💾 Сактоо</button>' +
            '</form>';

            document.getElementById('dashAddCourseForm').addEventListener('submit', function(e) {
                e.preventDefault();
                if (typeof addCourseFromDashboard === 'function') {
                    addCourseFromDashboard();
                }
            });
            break;
    }
}


// ========================================================
// 2. МУГАЛИМДИН ӨЗҮНЧӨ ЖАРДАМЧЫ ФУНКЦИЯЛАРЫ
// ========================================================

function renderTeacherProfile() {
    if (!currentUser) return '';
    const uName = currentUser.name || 'Мугалим';
    const regDate = currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('ky-KG') : 'Көрсөтүлгөн эмес';

    return '<div class="profile-section">' +
           '<div class="profile-card">' +
           '<div class="profile-avatar-large">' + uName.charAt(0).toUpperCase() + '</div>' +
           '<div class="profile-info"><h3>' + uName + '</h3><p>👨‍🏫 Мугалим</p></div>' +
           '<button class="btn btn-outline" style="margin-top:15px; width:100%;" onclick="openEditProfile()">✏️ Түзөтүү</button>' +
           '</div>' +
           '<div class="profile-details">' +
           '<h3 style="margin-bottom:20px;">Жеке маалыматтар</h3>' +
           '<div class="detail-row"><span class="detail-label">Аты-жөнү</span><span class="detail-value">' + uName + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">' + (currentUser.email || '') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Адистиги</span><span class="detail-value">' + (currentUser.specialty || 'Көрсөтүлгөн эмес') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Иш тажрыйбасы</span><span class="detail-value">' + (currentUser.experience || '0') + ' жыл</span></div>' +
           '<div class="detail-row"><span class="detail-label">Билими</span><span class="detail-value">' + (currentUser.education || 'Көрсөтүлгөн эмес') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Өзү жөнүндө</span><span class="detail-value">' + (currentUser.bio || 'Көрсөтүлгөн эмес') + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Катталган</span><span class="detail-value">' + regDate + '</span></div>' +
           '<div class="detail-row"><span class="detail-label">Рол</span><span class="badge badge-warning">Мугалим</span></div>' +
           '</div></div>';
}

function viewCourseStudents(courseId) {
    if (typeof courses === 'undefined') return;
    const course = courses.find(function(c) { return c && c.id === courseId; });
    if (!course) return;

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const students = [];

    allUsers.forEach(function(u) {
        if (u && u.role === 'student' && u.enrolledCourses) {
            const enrollment = u.enrolledCourses.find(function(e) { return e && e.courseId === courseId; });
            if (enrollment) {
                students.push({ name: u.name, email: u.email, progress: enrollment.progress, enrolledAt: enrollment.enrolledAt });
            }
        }
    });

    const bodyArea = document.getElementById('dashBodyArea');
    if (!bodyArea) return;
    
    bodyArea.innerHTML = '<h3>👥 ' + (course.title || '') + ' - Студенттер</h3>' +
                         '<button class="btn btn-outline btn-sm" style="margin-bottom:15px;" onclick="switchDashTab(\'my-courses\')">← Артка</button>';

    if (students.length === 0) {
        bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">👥</div><p>Бул курска эч ким каттала элек</p></div>';
    } else {
        bodyArea.innerHTML += '<div class="table-responsive"><table class="data-table"><thead><tr><th>Аты</th><th>Email</th><th>Прогресс</th><th>Катталган</th></tr></thead><tbody>' +
        students.map(function(s) {
            const prog = parseInt(s.progress) || 0;
            const dateStr = s.enrolledAt ? new Date(s.enrolledAt).toLocaleDateString('ky-KG') : 'Көрсөтүлгөн эмес';
            return '<tr><td>' + (s.name || '') + '</td><td>' + (s.email || '') + '</td><td><div class="progress-bar" style="width:100px; display:inline-block; vertical-align:middle; margin-right:5px;"><div class="progress-fill" style="width:' + prog + '%"></div></div> ' + prog + '%</td><td>' + dateStr + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
}


// ========================================================
// 3. ADMIN DASHBOARD (Толук оңдолгон функция)
// ========================================================

function renderAdminTab(tabId, statsGrid, bodyArea) {
    if (!statsGrid || !bodyArea || typeof courses === 'undefined') return;
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let reviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');

    switch(tabId) {
        case 'overview':
            const totalRevenue = courses.reduce(function(s, c) { return s + (parseInt(c.price) || 0) * (parseInt(c.enrolled) || 0); }, 0);
            const avgRating = courses.length > 0 ? (courses.reduce(function(s, c) { return s + (parseFloat(c.rating) || 0); }, 0) / courses.length).toFixed(1) : '0.0';
            
            statsGrid.innerHTML = 
                '<div class="stat-box"><div class="stat-icon">👥</div><h3>' + (users.length + 1) + '</h3><p>Колдонуучулар</p></div>' +
                '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + courses.length + '</h3><p>Курстар</p></div>' +
                '<div class="stat-box"><div class="stat-icon">💬</div><h3>' + reviews.length + '</h3><p>Пикирлер</p></div>' +
                '<div class="stat-box"><div class="stat-icon">💰</div><h3>' + totalRevenue.toLocaleString() + ' сом</h3><p>Киреше</p></div>';

            const avgPrice = courses.length > 0 ? Math.round(courses.reduce(function(s, c) { return s + (parseInt(c.price) || 0); }, 0) / courses.length) : 0;

            bodyArea.innerHTML = '<h3>📊 Системанын обзору</h3>' +
            '<div class="dash-card-item"><h4>👥 Колдонуучулар боюнча</h4>' +
            '<p style="margin:6px 0;">Студенттер: <strong>' + users.filter(function(u) { return u && u.role === 'student'; }).length + '</strong></p>' +
            '<p style="margin:6px 0;">Мугалимдер: <strong>' + users.filter(function(u) { return u && u.role === 'teacher'; }).length + '</strong></p>' +
            '<p style="margin:6px 0;">Админдер: <strong>1</strong></p></div>' +
            '<div class="dash-card-item"><h4>📚 Популярдуу курстар</h4>' +
            courses.slice().sort(function(a, b) { return (b.enrolled || 0) - (a.enrolled || 0); }).slice(0, 5).map(function(c) {
                return '<p style="margin:6px 0;">📚 ' + (c.title || '') + ' - <strong>' + (c.enrolled || 0) + '</strong> студент, ⭐ ' + (c.rating || 5) + '</p>';
            }).join('') + '</div>' +
            '<div class="dash-card-item"><h4>💰 Финансылык көрсөткүчтөр</h4>' +
            '<p style="margin:6px 0;">Жалпы киреше: <strong>' + totalRevenue.toLocaleString() + ' сом</strong></p>' +
            '<p style="margin:6px 0;">Орточо курс баасы: <strong>' + avgPrice.toLocaleString() + ' сом</strong></p></div>';
            break;

        case 'users':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">👥</div><h3>' + users.length + '</h3><p>Бардыгы</p></div>';
            bodyArea.innerHTML = '<h3>👥 Колдонуучуларды башкаруу</h3>';
            const allUsers = [{ id:'admin', name:'Админ', email:'admin@edu.kg', role:'admin', createdAt: new Date().toISOString() }].concat(users);
            
            bodyArea.innerHTML += '<div class="table-responsive"><table class="data-table"><thead><tr><th>Аты</th><th>Email</th><th>Рол</th><th>Катталган</th><th>Аракет</th></tr></thead><tbody>' +
            allUsers.map(function(u) {
                if (!u) return '';
                const roleBadge = u.role === 'admin' ? '<span class="badge badge-primary">Админ</span>' :
                                  u.role === 'teacher' ? '<span class="badge badge-warning">Мугалим</span>' :
                                  '<span class="badge badge-success">Студент</span>';
                const actions = u.role !== 'admin' 
                    ? '<div style="display:flex;gap:6px;"><button class="btn btn-outline btn-sm" onclick="adminOpenChangePass(\'' + u.id + '\',\'' + u.name + '\')">🔐</button><button class="btn btn-danger btn-sm" onclick="adminDeleteUser(\'' + u.id + '\')">🗑️</button></div>'
                    : '';
                const dateStr = u.createdAt ? new Date(u.createdAt).toLocaleDateString('ky-KG') : '—';
                return '<tr><td>' + (u.name || '') + '</td><td>' + (u.email || '') + '</td><td>' + roleBadge + '</td><td>' + dateStr + '</td><td>' + actions + '</td></tr>';
            }).join('') + '</tbody></table></div>';
            break;

       case 'all-courses':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + courses.length + '</h3><p>Бардык курстар</p></div>';
            
            var safeEscape = typeof escapeHTML === 'function' ? escapeHTML : function(str) { return str; };

            bodyArea.innerHTML = '<h3>📚 Курстарди башкаруу</h3>' +
            '<div class="table-responsive"><table class="data-table"><thead><tr><th>Аталышы</th><th>Категория</th><th>Мугалим</th><th>Баасы</th><th>Студенттер</th><th>Рейтинг</th><th>Аракет</th></tr></thead><tbody>' +
            courses.map(function(c) {
                if (!c) return '';
                const priceVal = parseInt(c.price) || 0;
                // Тексттерди коопсуз кылып чыгаруу
                const titleSafe = safeEscape(c.title || '');
                const catSafe = safeEscape(c.cat || '');
                const teacherSafe = safeEscape(c.teacher || '—');

                return '<tr><td>' + titleSafe + '</td><td>' + catSafe + '</td><td>' + teacherSafe + '</td><td>' + priceVal.toLocaleString() + ' сом</td><td>' + (c.enrolled || 0) + '</td><td>⭐ ' + (c.rating || 5) + '</td>' +
                       '<td><div style="display:flex;gap:6px;"><button class="btn btn-outline btn-sm" onclick="adminOpenEditCourse(' + c.id + ')">✏️</button><button class="btn btn-danger btn-sm" onclick="adminDeleteCourse(' + c.id + ')">🗑️</button></div></td></tr>';
            }).join('') + '</tbody></table></div>';
            break;

        case 'reviews':
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">💬</div><h3>' + reviews.length + '</h3><p>Пикирлер</p></div>';
            bodyArea.innerHTML = '<h3>💬 Пикирлерди башкаруу</h3>';
            
            if (reviews.length === 0) {
                bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">💬</div><p>Пикирлер жок</p></div>';
            } else {
                var safeEscape = typeof escapeHTML === 'function' ? escapeHTML : function(str) { return str; };
                
                bodyArea.innerHTML += reviews.map(function(r, index) {
                    if (!r) return '';
                    let starsStr = '';
                    const rRating = parseInt(r.rating) || 5;
                    for(let i=0; i<5; i++) starsStr += (i < rRating) ? '★' : '☆';
                    
                    const nameSafe = safeEscape(r.name || 'Аноним');
                    const textSafe = safeEscape(r.text || '');
                    const roleSafe = safeEscape(r.role || 'Колдонуучу');
                    const dateSafe = safeEscape(r.date || '');

                    return '<div class="dash-card-item"><div style="display:flex; justify-content:space-between; align-items:start;">' +
                           '<div><strong>' + nameSafe + '</strong> <span style="color:var(--warning);">' + starsStr + '</span><p style="margin:5px 0;">' + textSafe + '</p><small style="color:var(--text-muted);">' + roleSafe + ' • ' + dateSafe + '</small></div>' +
                           '<button class="btn btn-danger btn-sm" onclick="adminDeleteReview(' + index + ')">🗑️</button>' +
                           '</div></div>';
                }).join('');
            }
            break;

        case 'analytics':
            const catStats = {};
            courses.forEach(function(c) { if(c && c.cat) catStats[c.cat] = (catStats[c.cat] || 0) + 1; });
            statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📊</div><h3>' + courses.length + '</h3><p>Курстар</p></div>';
            
            const totalEnrolled = users.reduce(function(s, u) { return s + (u && u.enrolledCourses ? u.enrolledCourses.length : 0); }, 0);
            const totalCompleted = users.reduce(function(s, u) { 
                return s + (u && u.enrolledCourses ? u.enrolledCourses.filter(function(e) { return e && parseInt(e.progress) === 100; }).length : 0); 
            }, 0);

            var safeEscape = typeof escapeHTML === 'function' ? escapeHTML : function(str) { return str; };

            bodyArea.innerHTML = '<h3>📊 Толук аналитика</h3>' +
            '<div class="dash-card-item"><h4>📚 Категориялар боюнча</h4>' +
            Object.entries(catStats).map(function(entry) {
                return '<p style="margin:6px 0;">📁 ' + safeEscape(entry[0]) + ': <strong>' + entry[1] + '</strong> курс</p>';
            }).join('') + '</div>' +
            '<div class="dash-card-item"><h4>👥 Активдүүлүк</h4>' +
            '<p style="margin:6px 0;">Бардык катталгандар: <strong>' + totalEnrolled + '</strong></p>' +
            '<p style="margin:6px 0;">Бүтүргөндөр: <strong>' + totalCompleted + '</strong></p></div>';
            break;

        case 'add-course':
            statsGrid.innerHTML = '';
            bodyArea.innerHTML = '<h3>➕ Жаңы курс кошуу (Админ)</h3>' +
            '<form id="adminAddCourseForm" style="max-width:600px;">' +
            '<div class="form-group"><label>Курс аталышы *</label><input type="text" id="adminNewTitle" required></div>' +
            '<div class="form-group"><label>Категория *</label><select id="adminNewCat" required><option value="">Тандаңыз</option><option>Программалоо</option><option>Дизайн</option><option>Тилдер</option><option>Маркетинг</option><option>Технология</option><option>Бизнес</option></select></div>' +
            '<div class="form-group"><label>Деңгээл *</label><select id="adminNewLevel" required><option value="">Тандаңыз</option><option value="Баштапкы">Баштапкы</option><option value="Орто">Орто</option><option value="Өнүккөн">Өнүккөн</option></select></div>' +
            '<div class="form-group"><label>Мугалим *</label><input type="text" id="adminNewTeacher" required placeholder="Мугалимдин аты-жөнү"></div>' +
            '<div class="form-group"><label>Узактыгы *</label><input type="text" id="adminNewTime" placeholder="Мисалы: 8 жума" required></div>' +
            '<div class="form-group"><label>Сабактар саны *</label><input type="number" id="adminNewLessons" min="1" value="20" required></div>' +
            '<div class="form-group"><label>Баасы (сом) *</label><input type="number" id="adminNewPrice" min="0" required></div>' +
            '<div class="form-group"><label>Сүрөттөмө *</label><textarea id="adminNewDesc" rows="3" required></textarea></div>' +
            '<button type="submit" class="btn btn-primary">💾 Сактоо</button>' +
            '</form>';

            var courseForm = document.getElementById('adminAddCourseForm');
            if (courseForm) {
                courseForm.onsubmit = function(e) {
                    e.preventDefault();
                    if (typeof adminAddCourse === 'function') {
                        adminAddCourse();
                    }
                };
            }
            break;

        case 'edit-texts':
            statsGrid.innerHTML = '';
            var savedTexts = JSON.parse(localStorage.getItem('siteTexts') || '{}');
            var safeEscape = typeof escapeHTML === 'function' ? escapeHTML : function(str) { return str; };

            var heroTitle = safeEscape(savedTexts.heroTitle || 'Келечегиңизди бүгүн баштаңыз 🚀');
            var heroDesc = safeEscape(savedTexts.heroDesc || 'Заманбап онлайн окуу платформасы. Мугалимдер жана студенттер үчүн ыңгайлуу, тез жана натыйжалуу.');
            var coursesTitle = safeEscape(savedTexts.coursesTitle || '📖 Бардык курстар');
            var coursesDesc = safeEscape(savedTexts.coursesDesc || 'Өзүңүзгө ылайыктуу багытты тандап, окууну баштаңыз');
            var reviewsTitle = safeEscape(savedTexts.reviewsTitle || '💬 Студенттердин пикири');
            var footerTitle = safeEscape(savedTexts.footerTitle || '🎓 EduPlatform');
            var footerDesc = safeEscape(savedTexts.footerDesc || 'Билимиңизди арттырып, болочогуңузду бүгүн куруңуз.');

            bodyArea.innerHTML = '<h3>📝 Сайттын тексттерин өзгөртүү</h3>' +
            '<div style="max-width:650px;">' +
            '<div class="form-group"><label>🏠 Башкы бет аталышы</label><input type="text" id="liveHeroTitle" value="' + heroTitle + '"></div>' +
            '<div class="form-group"><label>🏠 Башкы бет сүрөттөмөсү</label><textarea id="liveHeroDesc" rows="2">' + heroDesc + '</textarea></div>' +
            '<div class="form-group"><label>📚 Курстар бөлүмү аталышы</label><input type="text" id="liveCoursesTitle" value="' + coursesTitle + '"></div>' +
            '<div class="form-group"><label>📚 Курстар бөлүмү сүрөттөмөсү</label><textarea id="liveCoursesDesc" rows="2">' + coursesDesc + '</textarea></div>' +
            '<div class="form-group"><label>💬 Пикирлер бөлүмү аталышы</label><input type="text" id="liveReviewsTitle" value="' + reviewsTitle + '"></div>' +
            '<div class="form-group"><label>🦶 Footer аталышы</label><input type="text" id="liveFooterTitle" value="' + footerTitle + '"></div>' +
            '<div class="form-group"><label>🦶 Footer сүрөттөмөсү</label><textarea id="liveFooterDesc" rows="2">' + footerDesc + '</textarea></div>' +
            '<button class="btn btn-primary" onclick="adminSaveTexts()" style="width:100%;">💾 Тексттерди сактоо жана колдонуу</button>' +
            '</div>';
            break;
    } // ТҮПКҮ RENDERADMINTAB СУБ-ФУНКЦИЯСЫНЫН СВИЧИ УШУЛ ЖЕРДЕН ЖАБЫЛАТ!
} 

// ========================================================
// 2. АДМИНДИН ӨЧҮРҮҮ ФУНКЦИЯЛАРЫ (Сыртта, өзүнчө турат)
// ========================================================

function adminDeleteUser(id) {
    if (!confirm('Бул колдонуучуну өчүргүңүз келеби? Бул аракетти кайра кайтаруу мүмкүн эмес!')) return;
    let usersList = JSON.parse(localStorage.getItem('users') || '[]');
    usersList = usersList.filter(function(u) { return u.id !== id; });
    localStorage.setItem('users', JSON.stringify(usersList));
    if (typeof showToast === 'function') showToast('✅ Колдонуучу өчүрүлдү!', 'success');
    if (typeof switchDashTab === 'function') switchDashTab('users');
}

function adminDeleteCourse(id) {
    if (typeof courses === 'undefined') return;
    if (!confirm('Бул курсту өчүргүңүз келеби?')) return;
    const idx = courses.findIndex(function(c) { return c.id === id; });
    if (idx !== -1) {
        courses.splice(idx, 1);
        localStorage.setItem('courses', JSON.stringify(courses)); // Базада да сакталышы керек!
        if (typeof showToast === 'function') showToast('✅ Курс өчүрүлдү!', 'success');
        if (typeof switchDashTab === 'function') switchDashTab('all-courses');
        if (typeof renderCourses === 'function') renderCourses();
    }
}

function adminDeleteReview(index) {
    if (!confirm('Бул пикирди өчүргүңүз келеби?')) return;
    let reviewsList = JSON.parse(localStorage.getItem('siteReviews') || '[]');
    reviewsList.splice(index, 1);
    localStorage.setItem('siteReviews', JSON.stringify(reviewsList));
    
    // Эгер глобалдык массив колдонулса, аны да жаңыртуу
    if (typeof reviews !== 'undefined') {
        reviews = reviewsList; 
    }
    
    if (typeof showToast === 'function') showToast('✅ Пикир өчүрүлдү!', 'success');
    if (typeof switchDashTab === 'function') switchDashTab('reviews');
}

// ========================================================
// 3. МУГАЛИМДИН МОДАЛДЫК ТЕРЕЗЕ АРКЫЛУУ КУРС КОШУУ ФУНКЦИЯСЫ
// ========================================================

function addNewCourse() {
    if (typeof courses === 'undefined' || !currentUser || currentUser.role !== 'teacher') return;

    const titleEl = document.getElementById('newCTitle');
    const catEl = document.getElementById('newCCat');
    const timeEl = document.getElementById('newCTime');
    const priceEl = document.getElementById('newCPrice');
    const descEl = document.getElementById('newCDesc');
    const lessonsEl = document.getElementById('newCLessons');

    if (!titleEl || !catEl || !timeEl || !priceEl || !descEl || !lessonsEl) return;

    const newCourse = {
        id: courses.length + 1,
        title: titleEl.value,
        cat: catEl.value,
        time: timeEl.value,
        price: parseInt(priceEl.value) || 0,
        desc: descEl.value,
        teacher: currentUser.name || 'Мугалим',
        lessons: parseInt(lessonsEl.value) || 20,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
        enrolled: 0,
        rating: 5,
        reviews: 0,
        level: 'Баштапкы'
    };
    
    courses.push(newCourse);

    if (!currentUser.courses) currentUser.courses = [];
    currentUser.courses.push(newCourse.id);

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(function(u) { return u.id === currentUser.id; });
    if (idx !== -1) {
        users[idx] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (typeof closeModal === 'function') closeModal('addCourseModal');
    if (typeof showToast === 'function') showToast('✅ Курс кошулду! Студенттерди күтөбүз!', 'success');
    if (typeof renderCourses === 'function') renderCourses();
    
    const formEl = document.getElementById('addCourseForm');
    if (formEl) formEl.reset();
}

// ========================================================
// 4. ПРОФИЛЬ ТҮЗӨТҮҮ (Глобалдык функция)
// ========================================================

// Тексттердин ичиндеги HTML тегдерди жана тырмакчаларды коопсуз форматка өткөрүүчү жардамчы функция
function escapeHTML(str) {
    if (!str) return ''; // null, undefined же бош текст болсо, дароо бош текст кайтарат
    return String(str)   // Маанини коопсуздук үчүн текст тибине өткөрүү
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ========================================================
// 1. ПРОФИЛДИ ТҮЗӨТҮҮ ТЕРЕЗЕСИН АЧУУ
// ========================================================
function openEditProfile() {
    if (!currentUser) return;
    const fields = document.getElementById('editProfileFields');
    if (!fields) return;

    // Маанилерди коопсуз кылып даярдоо (Бош болсо '' маанисин беребиз)
    const safeName = escapeHTML(currentUser.name || '');

    if (currentUser.role === 'student') {
        const safePhone = escapeHTML(currentUser.phone || '');
        const safeBirthdate = escapeHTML(currentUser.birthdate || '');

        fields.innerHTML = 
            '<div class="form-group"><label>Аты-жөнү</label><input type="text" id="editName" value="' + safeName + '"></div>' +
            '<div class="form-group"><label>Телефон</label><input type="tel" id="editPhone" value="' + safePhone + '"></div>' +
            '<div class="form-group"><label>Туулган күнү</label><input type="date" id="editBirthdate" value="' + safeBirthdate + '"></div>' +
            '<div class="form-group"><label>Билими</label><select id="editEducation"><option value="">Тандаңыз</option><option value="Мектеп">Мектеп</option><option value="Колледж">Колледж</option><option value="Бакалавр">Бакалавр</option><option value="Магистратура">Магистратура</option></select></div>';
        
        // Мурунку тандалган билим деңгээлин автоматтык түрдө орнотуу
        const eduSelect = document.getElementById('editEducation');
        if (eduSelect && currentUser.education) {
            eduSelect.value = currentUser.education;
        }
    } else {
        const safeSpecialty = escapeHTML(currentUser.specialty || '');
        const safeExperience = escapeHTML(currentUser.experience || '0');
        const safeBio = escapeHTML(currentUser.bio || '');

        fields.innerHTML = 
            '<div class="form-group"><label>Аты-жөнү</label><input type="text" id="editName" value="' + safeName + '"></div>' +
            '<div class="form-group"><label>Адистиги</label><input type="text" id="editSpecialty" value="' + safeSpecialty + '"></div>' +
            '<div class="form-group"><label>Иш тажрыйбасы (жыл)</label><input type="number" id="editExp" value="' + safeExperience + '"></div>' +
            '<div class="form-group"><label>Өзү жөнүндө</label><textarea id="editBio" rows="2">' + safeBio + '</textarea></div>';
    }
    
    if (typeof openModal === 'function') openModal('editProfileModal');
}

// ========================================================
// 2. ПРОФИЛДИ САКТОО ФУНКЦИЯСЫ
// ========================================================
function saveProfile() {
    if (!currentUser) return;

    var nameEl = document.getElementById('editName');
    if (!nameEl || !nameEl.value.trim()) {
        if (typeof showToast === 'function') showToast('⚠️ Аты-жөнү бош болбошу керек!', 'danger');
        return;
    }
    currentUser.name = nameEl.value.trim();

    if (currentUser.role === 'student') {
        var phoneEl = document.getElementById('editPhone');
        var birthEl = document.getElementById('editBirthdate');
        var eduEl = document.getElementById('editEducation');
        
        if (phoneEl) currentUser.phone = phoneEl.value.trim();
        if (birthEl) currentUser.birthdate = birthEl.value;
        if (eduEl) currentUser.education = eduEl.value;
    } else {
        var specEl = document.getElementById('editSpecialty');
        var expEl = document.getElementById('editExp');
        var bioEl = document.getElementById('editBio');
        
        if (specEl) currentUser.specialty = specEl.value.trim();
        if (expEl) currentUser.experience = expEl.value;
        if (bioEl) currentUser.bio = bioEl.value.trim();
    }

    // Локалдык базага сактоо
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(function(u) { return u.id === currentUser.id; });
    if (idx !== -1) {
        users[idx] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (typeof closeModal === 'function') closeModal('editProfileModal');
    if (typeof showToast === 'function') showToast('✅ Профиль жаңыртылды!', 'success');
    
    // Элементтер бар болсо гана интерфейсти жаңылоо
    var dashAvatar = document.getElementById('dashAvatar');
    var dashUserName = document.getElementById('dashUserName');
    var dashGreeting = document.getElementById('dashGreeting');

    if (dashAvatar && currentUser.name) dashAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
    if (dashUserName) dashUserName.textContent = currentUser.name;
    if (dashGreeting) dashGreeting.textContent = 'Салам, ' + currentUser.name + '! 👋';
    
    if (typeof switchDashTab === 'function') switchDashTab('profile');
}
// ========================================================
// 1. АДМИНДИК ФУНКЦИЯЛАР (КУРС КОШУУ)
// ========================================================
function adminAddCourse() {
    if (typeof courses === 'undefined') return;

    // DOM элементтерин текшерип, маанилерин алуу
    var titleEl = document.getElementById('adminNewTitle');
    var catEl = document.getElementById('adminNewCat');
    var levelEl = document.getElementById('adminNewLevel');
    var teacherEl = document.getElementById('adminNewTeacher');
    var timeEl = document.getElementById('adminNewTime');
    var lessonsEl = document.getElementById('adminNewLessons');
    var priceEl = document.getElementById('adminNewPrice');
    var descEl = document.getElementById('adminNewDesc');

    if (!titleEl || !catEl || !levelEl || !teacherEl || !timeEl || !lessonsEl || !priceEl || !descEl) return;

    var title = titleEl.value.trim();
    var cat = catEl.value;
    var level = levelEl.value;
    var teacher = teacherEl.value.trim();
    var time = timeEl.value;
    var lessons = parseInt(lessonsEl.value) || 20;
    var price = parseInt(priceEl.value) || 0;
    var desc = descEl.value.trim();

    // Валидация - бош талааларды текшерүү
    if (!title || !cat || !level || !teacher || !time || !desc) {
        if (typeof showToast === 'function') showToast('❌ Бардык талааларды толтуруңуз!', 'danger');
        return;
    }

    // ID кайталанбашы үчүн Date.now() колдонулду
    var newCourse = {
        id: Date.now(), 
        title: title,
        cat: cat,
        level: level,
        teacher: teacher,
        time: time,
        lessons: lessons,
        price: price,
        desc: desc,
        // Түстүн HEX коду дайыма 6 орундуу болушу үчүн padStart колдонулганы абдан туура
        color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
        enrolled: 0,
        rating: 5,
        reviews: 0
    };

    // 1. Жаңы курсту глобалдык массивге кошуу
    courses.push(newCourse);

    // 2. Локалдык базага (localStorage) сактоо
    localStorage.setItem('courses', JSON.stringify(courses));

    // 3. Колдонуучуга ийгиликтүү кошулганын билдирүү
    if (typeof showToast === 'function') showToast('✅ Жаңы курс ийгиликтүү кошулду!', 'success');

    // 4. Форманын ичиндеги инпуттарды тазалоо (Кийинки курс үчүн даярдоо)
    titleEl.value = '';
    catEl.value = '';
    levelEl.value = '';
    teacherEl.value = '';
    timeEl.value = '';
    lessonsEl.value = '20';
    priceEl.value = '0';
    descEl.value = '';

    // 5. Модалдык терезени жабуу (эгер функция бар болсо)
    if (typeof closeModal === 'function') closeModal('addCourseModal');

    // 6. Админ панелдеги курстардын тизмесин дароо жаңылоо
    if (typeof switchDashTab === 'function') {
        switchDashTab('all-courses'); 
    } else if (typeof renderAdminTab === 'function') {
        // Эгер түз эле өткөрүү керек болсо, тиешелүү элементтер менен кайра иштетебиз
        var statsGrid = document.getElementById('dashStatsGrid');
        var bodyArea = document.getElementById('dashBodyArea');
        renderAdminTab('all-courses', statsGrid, bodyArea);
    }
}

    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    if (typeof showToast === 'function') showToast('✅ Курс кошулду: ' + title, 'success');
    if (typeof renderCourses === 'function') renderCourses();
    if (typeof switchDashTab === 'function') switchDashTab('all-courses');


function adminOpenEditCourse(courseId) {
    if (typeof courses === 'undefined') return;
    var course = courses.find(function(c) { return String(c.id) === String(courseId); });
    if (!course) return;

    if (document.getElementById('editCourseId')) document.getElementById('editCourseId').value = course.id;
    if (document.getElementById('editCourseTitle')) document.getElementById('editCourseTitle').value = course.title || '';
    if (document.getElementById('editCourseCat')) document.getElementById('editCourseCat').value = course.cat || '';
    if (document.getElementById('editCourseLevel')) document.getElementById('editCourseLevel').value = course.level || 'Баштапкы';
    if (document.getElementById('editCourseTime')) document.getElementById('editCourseTime').value = course.time || '';
    if (document.getElementById('editCourseLessons')) document.getElementById('editCourseLessons').value = course.lessons || 20;
    if (document.getElementById('editCoursePrice')) document.getElementById('editCoursePrice').value = course.price || 0;
    if (document.getElementById('editCourseTeacher')) document.getElementById('editCourseTeacher').value = course.teacher || '';
    if (document.getElementById('editCourseDesc')) document.getElementById('editCourseDesc').value = course.desc || '';

    if (typeof openModal === 'function') openModal('adminEditCourseModal');
}

function adminSaveEditCourse() {
    if (typeof courses === 'undefined') return;
    
    var id = document.getElementById('editCourseId').value;
    var idx = courses.findIndex(function(c) { return String(c.id) === String(id); });
    if (idx === -1) return;

    courses[idx].title = document.getElementById('editCourseTitle').value.trim();
    courses[idx].cat = document.getElementById('editCourseCat').value;
    courses[idx].level = document.getElementById('editCourseLevel').value;
    courses[idx].time = document.getElementById('editCourseTime').value;
    courses[idx].lessons = parseInt(document.getElementById('editCourseLessons').value) || 20;
    courses[idx].price = parseInt(document.getElementById('editCoursePrice').value) || 0;
    courses[idx].teacher = document.getElementById('editCourseTeacher').value.trim();
    courses[idx].desc = document.getElementById('editCourseDesc').value.trim();

    localStorage.setItem('courses', JSON.stringify(courses));

    if (typeof closeModal === 'function') closeModal('adminEditCourseModal');
    if (typeof showToast === 'function') showToast('✅ Курс жаңыртылды!', 'success');
    if (typeof renderCourses === 'function') renderCourses();
    if (typeof switchDashTab === 'function') switchDashTab('all-courses');
}

function adminOpenChangePass(userId, userName) {
    if (document.getElementById('changePassUserId')) document.getElementById('changePassUserId').value = userId;
    if (document.getElementById('changePassUserName')) document.getElementById('changePassUserName').textContent = '👤 ' + userName;
    if (document.getElementById('newPassInput')) document.getElementById('newPassInput').value = '';
    if (document.getElementById('confirmPassInput')) document.getElementById('confirmPassInput').value = '';
    
    if (typeof openModal === 'function') openModal('adminChangePassModal');
}

// ========================================================
// 2. АДМИН ТАРАБЫНАН СЫРСӨЗДҮ ӨЗГӨРТҮҮ
// ========================================================
function adminSaveChangePass() {
    var userId = document.getElementById('changePassUserId').value;
    var newPass = document.getElementById('newPassInput').value;
    var confirmPass = document.getElementById('confirmPassInput').value;

    if (newPass.length < 6) {
        if (typeof showToast === 'function') showToast('❌ Сырсөз кем дегенде 6 символ болушу керек!', 'danger');
        return;
    }
    if (newPass !== confirmPass) {
        if (typeof showToast === 'function') showToast('❌ Сырсөздөр дал келбеди!', 'danger');
        return;
    }

    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var idx = users.findIndex(function(u) { return String(u.id) === String(userId); });
    if (idx === -1) {
        if (typeof showToast === 'function') showToast('❌ Колдонуучу табылган жок!', 'danger');
        return;
    }

    users[idx].password = newPass;
    localStorage.setItem('users', JSON.stringify(users));

    if (typeof closeModal === 'function') closeModal('adminChangePassModal');
    if (typeof showToast === 'function') showToast('✅ Сырсөз өзгөртүлдү!', 'success');
}

// ========================================================
// 3. МУГАЛИМДИН ПАНЕЛДЕН КУРС КОШУУСУ
// ========================================================
function addCourseFromDashboard() {
    if (typeof courses === 'undefined' || !currentUser) return;

    // Эгер элементтер табылмакчы болсо, маанисин алат, болбосо бош калтырат
    var getElVal = function(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };

    // Админ же мугалим панелдериндеги ID-лерди автоматтык түрдө аныктоо
    var title = getElVal('dashNewTitle') || getElVal('adminNewTitle');
    var cat = getElVal('dashNewCat') || getElVal('adminNewCat');
    var level = getElVal('dashNewLevel') || getElVal('adminNewLevel');
    var time = getElVal('dashNewTime') || getElVal('adminNewTime');
    var desc = getElVal('dashNewDesc') || getElVal('adminNewDesc');
    
    var priceEl = document.getElementById('dashNewPrice') || document.getElementById('adminNewPrice');
    var price = priceEl ? (parseInt(priceEl.value) || 0) : 0;
    
    var lessonsEl = document.getElementById('dashNewLessons') || document.getElementById('adminNewLessons');
    var lessons = lessonsEl ? (parseInt(lessonsEl.value) || 20) : 20;

    if (!title || !cat || !level || !time || !desc) {
        if (typeof showToast === 'function') showToast('❌ Бардык талааларды толтуруңуз!', 'danger');
        return;
    }

    // HEX түстүн туура түзүлүшүн камсыздоо (6 символ)
    var randomColor = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);

    const newCourse = {
        id: Date.now(), 
        title: title,
        cat: cat,
        level: level,
        time: time,
        price: price,
        desc: desc,
        teacher: currentUser.name || 'Мугалим',
        lessons: lessons,
        color: randomColor,
        enrolled: 0,
        rating: 5,
        reviews: 0
    };
    
    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    if (!currentUser.courses) currentUser.courses = [];
    currentUser.courses.push(newCourse.id);

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(function(u) { return u.id === currentUser.id; });
    if (idx !== -1) {
        users[idx] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (typeof showToast === 'function') showToast('✅ Курс кошулду! Студенттерди күтөбүз!', 'success');
    
    // Эгер колдонуучу админ болсо 'all-courses' барагына, мугалим болсо 'my-courses' барагына багыттоо
    if (typeof switchDashTab === 'function') {
        if (currentUser.role === 'admin') {
            switchDashTab('all-courses');
        } else {
            switchDashTab('my-courses');
        }
    }
    if (typeof renderCourses === 'function') renderCourses();
}

// Алиас (өтмө ат) кошуу, админдин switch-case коду ката бербеши үчүн
function adminAddCourse() {
    addCourseFromDashboard();
}

// ========================================================
// 4. САЙТТЫН ТЕКСТТЕРИН БАШКАРУУ (LIVE EDIT)
// ========================================================
function adminSaveTexts() {
    var getVal = function(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };

    var texts = {
        heroTitle: getVal('liveHeroTitle'),
        heroDesc: getVal('liveHeroDesc'),
        coursesTitle: getVal('liveCoursesTitle'),
        coursesDesc: getVal('liveCoursesDesc'),
        reviewsTitle: getVal('liveReviewsTitle'),
        footerTitle: getVal('liveFooterTitle'),
        footerDesc: getVal('liveFooterDesc')
    };

    localStorage.setItem('siteTexts', JSON.stringify(texts));
    applySiteTexts(texts);
    if (typeof showToast === 'function') showToast('✅ Тексттер сакталды жана колдонулду!', 'success');
}

function applySiteTexts(texts) {
    if (!texts) texts = JSON.parse(localStorage.getItem('siteTexts') || '{}');
    
    var setElText = function(selector, text) {
        if (!text) return;
        var el = document.querySelector(selector);
        if (el) el.textContent = text;
    };

    setElText('.hero h1', texts.heroTitle);
    setElText('.hero p', texts.heroDesc);
    setElText('#courses .section-title h2', texts.coursesTitle);
    setElText('#courses .section-title p', texts.coursesDesc);
    setElText('#reviews-section .section-title h2', texts.reviewsTitle);
}

// ========================================================
// 5. TOAST NOTIFICATIONS (Билдирүүлөр тутуму)
// ========================================================
function showToast(message, type) {
    type = type || 'success';
    
    // Эски тоасттар кабатталып кетпеши үчүн аларды тазалоо
    const oldToasts = document.querySelectorAll('.toast');
    oldToasts.forEach(function(t) { t.remove(); });

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    
    const span = document.createElement('span');
    span.textContent = message;
    toast.appendChild(span);
    
    document.body.appendChild(toast);

    // Анимация туура иштеши үчүн минималдуу кечигүү
    setTimeout(function() {
        toast.classList.add('show');
    }, 10);

    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { 
            toast.remove(); 
        }, 300);
    }, 3000);
}
function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon();
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateThemeIcon();
}


// ========================================================
// 6. GLOBAL EXPORTS (Глобалдык функцияларды каттоо - Корголгон вариант)
// ========================================================
(function(w) {
    const exports = {
        toggleMobileMenu, closeMobileMenu, toggleDashSidebar,
        openModal, closeModal, switchTab, selectRole,
        showCourseInfo, enrollCourse, openDashboard, exitDashboard,
        switchDashTab, handleLogout, handleLogin, registerStudent,
        registerTeacher, viewCourseStudents, continueCourse, goToPage,
        filterCourses, submitReview, addNewCourse, addCourseFromDashboard,
        openEditProfile, saveProfile, adminDeleteUser, adminDeleteCourse,
        adminDeleteReview, adminOpenEditCourse, adminSaveEditCourse,
        adminOpenChangePass, adminSaveChangePass, adminSaveTexts,
        toggleTheme, showToast
    };
    
    

    Object.keys(exports).forEach(function(key) {
        if (typeof exports[key] !== 'undefined') {
            w[key] = exports[key];
        } else {
            // Кайсы функция кодуңузда жок экенин консолдон көрсөтүп турат (иштеп жатканда ыңгайлуу)
            console.warn(`EduPlatform Эскертүү: "${key}" функциясы коддо табылган жок, экспорттолгон жок.`);
        }
        
    });
})(window);