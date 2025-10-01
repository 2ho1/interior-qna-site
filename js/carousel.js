// ===== 캐러셀 JavaScript =====

let heroSwiper;

// 캐러셀 초기화
function initializeCarousel() {
    // 히어로 섹션 캐러셀 초기화
    heroSwiper = new Swiper('.hero-swiper', {
        // 기본 설정
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        // 페이지네이션
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        
        // 키보드 네비게이션
        keyboard: {
            enabled: true,
        },
        
        // 마우스 휠 비활성화 (페이지 스크롤 우선)
        mousewheel: false,
        
        // 터치 설정
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        
        // 페이지 스크롤 우선 설정
        allowTouchMove: true,
        simulateTouch: true,
        
        // 속도 설정
        speed: 1000,
        
        // 이벤트
        on: {
            init: function() {
                console.log('Hero carousel initialized');
                addCarouselControls();
            },
            slideChange: function() {
                updateSlideCounter();
            },
            autoplayTimeLeft: function(swiper, time, progress) {
                updateAutoplayProgress(progress);
            }
        }
    });
    
    // 캐러셀 컨트롤 추가
    addCarouselControls();
    
    // 키보드 이벤트 리스너
    setupKeyboardControls();
    
    // 터치 제스처 설정
    setupTouchGestures();
}

// 캐러셀 컨트롤 추가
function addCarouselControls() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection || heroSection.querySelector('.carousel-controls')) return;
    
    // 네비게이션 버튼 생성
    const controlsHTML = `
        <div class="carousel-controls">
            <button class="carousel-control carousel-control-prev" id="prevSlide">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="carousel-control carousel-control-next" id="nextSlide">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="carousel-info">
            <span class="slide-counter">
                <span id="currentSlide">1</span> / <span id="totalSlides">3</span>
            </span>
            <div class="autoplay-progress">
                <div class="autoplay-progress-bar"></div>
            </div>
        </div>
    `;
    
    heroSection.insertAdjacentHTML('beforeend', controlsHTML);
    
    // 컨트롤 버튼 이벤트 리스너
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            heroSwiper.slidePrev();
        });
        
        nextBtn.addEventListener('click', () => {
            heroSwiper.slideNext();
        });
    }
    
    // 컨트롤 스타일 추가
    addCarouselControlStyles();
}

// 캐러셀 컨트롤 스타일 추가
function addCarouselControlStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .carousel-controls {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 2rem;
            z-index: 10;
            pointer-events: none;
        }
        
        .carousel-control {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            pointer-events: all;
            backdrop-filter: blur(10px);
        }
        
        .carousel-control:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }
        
        .carousel-info {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10;
            background: rgba(0, 0, 0, 0.5);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            backdrop-filter: blur(10px);
        }
        
        .slide-counter {
            color: white;
            font-weight: 500;
            font-size: 0.9rem;
        }
        
        .autoplay-progress {
            width: 60px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .autoplay-progress-bar {
            height: 100%;
            background: #E74C3C;
            width: 0%;
            transition: width 0.1s linear;
        }
        
        @media (max-width: 767px) {
            .carousel-controls {
                padding: 0 1rem;
            }
            
            .carousel-control {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
            
            .carousel-info {
                bottom: 1rem;
                gap: 0.5rem;
                padding: 0.25rem 0.75rem;
            }
            
            .autoplay-progress {
                width: 40px;
            }
        }
    `;
    document.head.appendChild(style);
}

// 슬라이드 카운터 업데이트
function updateSlideCounter() {
    if (!heroSwiper) return;
    
    const currentSlide = document.getElementById('currentSlide');
    const totalSlides = document.getElementById('totalSlides');
    
    if (currentSlide) {
        currentSlide.textContent = heroSwiper.realIndex + 1;
    }
    
    if (totalSlides) {
        totalSlides.textContent = heroSwiper.slides.length;
    }
}

// 자동재생 진행률 업데이트
function updateAutoplayProgress(progress) {
    const progressBar = document.querySelector('.autoplay-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
    }
}

// 키보드 컨트롤 설정
function setupKeyboardControls() {
    document.addEventListener('keydown', function(e) {
        if (!heroSwiper) return;
        
        // 히어로 섹션이 화면에 보일 때만 키보드 컨트롤 활성화
        const heroSection = document.querySelector('.hero-section');
        const heroRect = heroSection.getBoundingClientRect();
        
        if (heroRect.top <= 0 && heroRect.bottom > window.innerHeight / 2) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    heroSwiper.slidePrev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    heroSwiper.slideNext();
                    break;
                case ' ':
                    e.preventDefault();
                    toggleAutoplay();
                    break;
            }
        }
    });
}

// 터치 제스처 설정
function setupTouchGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!heroSwiper) return;
        
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // 수평 스와이프가 수직 스와이프보다 클 때만 슬라이드 변경
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                heroSwiper.slidePrev();
            } else {
                heroSwiper.slideNext();
            }
        }
    }, { passive: true });
}

// 자동재생 토글
function toggleAutoplay() {
    if (!heroSwiper) return;
    
    if (heroSwiper.autoplay.running) {
        heroSwiper.autoplay.stop();
        showAutoplayStatus('일시정지됨');
    } else {
        heroSwiper.autoplay.start();
        showAutoplayStatus('재생중');
    }
}

// 자동재생 상태 표시
function showAutoplayStatus(status) {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'autoplay-status';
    statusDiv.textContent = `자동재생: ${status}`;
    statusDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 9999;
        font-size: 0.9rem;
        backdrop-filter: blur(10px);
        animation: fadeInOut 2s ease-in-out;
    `;
    
    // 애니메이션 스타일 추가
    if (!document.querySelector('#autoplay-status-style')) {
        const style = document.createElement('style');
        style.id = 'autoplay-status-style';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(statusDiv);
    
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.remove();
        }
    }, 2000);
}

// 캐러셀 일시정지 (마우스 호버 시)
function pauseCarouselOnHover() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && heroSwiper) {
        heroSection.addEventListener('mouseenter', function() {
            heroSwiper.autoplay.stop();
        });
        
        heroSection.addEventListener('mouseleave', function() {
            heroSwiper.autoplay.start();
        });
    }
}

// 캐러셀 초기화 함수 (외부에서 호출)
function initCarousel() {
    // DOM이 로드된 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCarousel);
    } else {
        initializeCarousel();
    }
}

// 페이지 가시성 변경 시 자동재생 제어
document.addEventListener('visibilitychange', function() {
    if (!heroSwiper) return;
    
    if (document.hidden) {
        heroSwiper.autoplay.stop();
    } else {
        heroSwiper.autoplay.start();
    }
});

// 윈도우 리사이즈 시 캐러셀 업데이트
window.addEventListener('resize', debounce(function() {
    if (heroSwiper) {
        heroSwiper.update();
    }
}, 250));

// 캐러셀 초기화 실행
initCarousel();
