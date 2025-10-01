// ===== 메인 JavaScript 파일 =====

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
function initializeApp() {
    setupNavigation();
    setupScrollAnimations();
    setupScrollIndicator();
    loadPortfolioData();
    setupSmoothScrolling();
}

// ===== 네비게이션 설정 =====
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 스크롤 시 네비게이션 배경 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        }
    });
    
    // 활성 네비게이션 링크 설정
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 부드러운 스크롤 설정 =====
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 스크롤 애니메이션 =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 애니메이션할 요소들 관찰
    const animateElements = document.querySelectorAll('.portfolio-card, .advantage-card, .section-title, .section-subtitle');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== 스크롤 인디케이터 =====
function setupScrollIndicator() {
    // 스크롤 인디케이터 요소 생성
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
    document.body.appendChild(scrollIndicator);
    
    const scrollProgress = scrollIndicator.querySelector('.scroll-progress');
    
    // 스크롤 진행률 업데이트
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// ===== 포트폴리오 데이터 로드 =====
function loadPortfolioData() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (!portfolioGrid) {
        console.error('Portfolio grid not found');
        return;
    }
    
    // 샘플 포트폴리오 데이터
    const portfolioData = [
        {
            id: 1,
            title: "모던 라이프스타일 아파트",
            type: "리모델링 / 35평",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "젊은 커플을 위한 모던하고 깔끔한 인테리어",
            details: {
                area: "35평",
                duration: "2개월",
                budget: "1,500만원",
                style: "모던",
                features: ["오픈 키친", "워크인 옷장", "발코니 확장"],
                client: "김○○님"
            }
        },
        {
            id: 2,
            title: "클래식 감성 주택",
            type: "신축 / 45평",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "전통과 모던의 조화를 이룬 세련된 공간",
            details: {
                area: "45평",
                duration: "3개월",
                budget: "2,200만원",
                style: "클래식",
                features: ["한옥 요소", "원목 마감", "전통 정원"],
                client: "이○○님"
            }
        },
        {
            id: 3,
            title: "미니멀 오피스 공간",
            type: "사무실 / 25평",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "효율적인 업무 환경을 위한 깔끔한 디자인",
            details: {
                area: "25평",
                duration: "1.5개월",
                budget: "800만원",
                style: "미니멀",
                features: ["오픈 데스크", "회의실", "휴게공간"],
                client: "박○○님"
            }
        },
        {
            id: 4,
            title: "가족 중심 펜트하우스",
            type: "리모델링 / 60평",
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "넓은 공간을 활용한 가족 친화적 인테리어",
            details: {
                area: "60평",
                duration: "4개월",
                budget: "3,500만원",
                style: "컨템포러리",
                features: ["루프탑 테라스", "키즈룸", "홈시어터"],
                client: "최○○님"
            }
        },
        {
            id: 5,
            title: "인더스트리얼 카페",
            type: "상가 / 30평",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "독특한 분위기의 인더스트리얼 스타일 카페",
            details: {
                area: "30평",
                duration: "2개월",
                budget: "1,200만원",
                style: "인더스트리얼",
                features: ["노출 콘크리트", "메탈 디테일", "로프트 공간"],
                client: "정○○님"
            }
        },
        {
            id: 6,
            title: "스칸디나비안 원룸",
            type: "리모델링 / 20평",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "따뜻하고 아늑한 스칸디나비안 스타일 원룸",
            details: {
                area: "20평",
                duration: "1개월",
                budget: "600만원",
                style: "스칸디나비안",
                features: ["원목 마감", "화이트 톤", "다기능 수납"],
                client: "한○○님"
            }
        }
    ];
    
    // 포트폴리오 카드 생성
    portfolioData.forEach(item => {
        const portfolioCard = createPortfolioCard(item);
        portfolioGrid.appendChild(portfolioCard);
    });
    
    // 이미지 로딩 확인
    setTimeout(() => {
        const images = portfolioGrid.querySelectorAll('.portfolio-image');
        images.forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                console.warn('Image failed to load:', img.src);
                img.src = 'https://via.placeholder.com/400x250/f8f9fa/6c757d?text=이미지+로딩중';
            }
        });
    }, 2000);
}

// ===== 포트폴리오 카드 생성 =====
function createPortfolioCard(item) {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.setAttribute('data-portfolio-id', item.id);
    
    card.innerHTML = `
        <div class="portfolio-image-container">
            <img src="${item.image}" alt="${item.title}" class="portfolio-image" loading="lazy">
            <div class="portfolio-overlay">
                <button class="portfolio-btn" onclick="openPortfolioModal(${item.id})">
                    <i class="fas fa-eye me-2"></i>자세히 보기
                </button>
            </div>
        </div>
        <div class="portfolio-content">
            <h3 class="portfolio-title">${item.title}</h3>
            <p class="portfolio-type">${item.type}</p>
        </div>
    `;
    
    return card;
}

// ===== 전역 포트폴리오 데이터 =====
window.portfolioData = [
    {
        id: 1,
        title: "모던 라이프스타일 아파트",
        type: "리모델링 / 35평",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        description: "젊은 커플을 위한 모던하고 깔끔한 인테리어",
        details: {
            area: "35평",
            duration: "2개월",
            budget: "1,500만원",
            style: "모던",
            features: ["오픈 키친", "워크인 옷장", "발코니 확장"],
            client: "김○○님"
        }
    },
    {
        id: 2,
        title: "클래식 감성 주택",
        type: "신축 / 45평",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        description: "전통과 모던의 조화를 이룬 세련된 공간",
        details: {
            area: "45평",
            duration: "3개월",
            budget: "2,200만원",
            style: "클래식",
            features: ["한옥 요소", "원목 마감", "전통 정원"],
            client: "이○○님"
        }
    },
    {
        id: 3,
        title: "미니멀 오피스 공간",
        type: "사무실 / 25평",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        description: "효율적인 업무 환경을 위한 깔끔한 디자인",
        details: {
            area: "25평",
            duration: "1.5개월",
            budget: "800만원",
            style: "미니멀",
            features: ["오픈 데스크", "회의실", "휴게공간"],
            client: "박○○님"
        }
    },
    {
        id: 4,
        title: "가족 중심 펜트하우스",
        type: "리모델링 / 60평",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        description: "넓은 공간을 활용한 가족 친화적 인테리어",
        details: {
            area: "60평",
            duration: "4개월",
            budget: "3,500만원",
            style: "컨템포러리",
            features: ["루프탑 테라스", "키즈룸", "홈시어터"],
            client: "최○○님"
        }
    },
    {
        id: 5,
        title: "인더스트리얼 카페",
        type: "상가 / 30평",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "독특한 분위기의 인더스트리얼 스타일 카페",
        details: {
            area: "30평",
            duration: "2개월",
            budget: "1,200만원",
            style: "인더스트리얼",
            features: ["노출 콘크리트", "메탈 디테일", "로프트 공간"],
            client: "정○○님"
        }
    },
    {
        id: 6,
        title: "스칸디나비안 원룸",
        type: "리모델링 / 20평",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        description: "따뜻하고 아늑한 스칸디나비안 스타일 원룸",
        details: {
            area: "20평",
            duration: "1개월",
            budget: "600만원",
            style: "스칸디나비안",
            features: ["원목 마감", "화이트 톤", "다기능 수납"],
            client: "한○○님"
        }
    }
];

// ===== 유틸리티 함수 =====

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스로틀 함수
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 로딩 상태 표시
function showLoading(element) {
    element.innerHTML = '<span class="loading"></span> 처리중...';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// 알림 메시지 표시
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.quote-form');
    container.insertBefore(alertDiv, container.firstChild);
    
    // 5초 후 자동 제거
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// 전화번호 포맷팅
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
}

// 이메일 유효성 검사
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 전화번호 유효성 검사
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 11 && cleaned.startsWith('01');
}
