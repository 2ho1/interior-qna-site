// ===== 모달 JavaScript =====

let portfolioModal;

// 모달 초기화
function initializeModal() {
    portfolioModal = new bootstrap.Modal(document.getElementById('portfolioModal'), {
        backdrop: true,
        keyboard: true,
        focus: true
    });
    
    setupModalEvents();
}

// 모달 이벤트 설정
function setupModalEvents() {
    const modal = document.getElementById('portfolioModal');
    
    // 모달이 열릴 때
    modal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const portfolioId = button.getAttribute('data-portfolio-id') || button.getAttribute('onclick').match(/\d+/)[0];
        
        if (portfolioId) {
            loadPortfolioDetails(portfolioId);
        }
    });
    
    // 모달이 완전히 열린 후 가운데 정렬 강제 적용
    modal.addEventListener('shown.bs.modal', function() {
        const modalDialog = this.querySelector('.modal-dialog');
        if (modalDialog) {
            modalDialog.style.margin = '0';
            modalDialog.style.position = 'fixed';
            modalDialog.style.top = '50%';
            modalDialog.style.left = '50%';
            modalDialog.style.transform = 'translate(-50%, -50%)';
            modalDialog.style.zIndex = '1055';
        }
    });
    
    // 모달이 닫힐 때
    modal.addEventListener('hidden.bs.modal', function() {
        clearModalContent();
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal && document.querySelector('.modal.show')) {
            portfolioModal.hide();
        }
    });
    
    // 모달 외부 클릭 시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            portfolioModal.hide();
        }
    });
}

// 포트폴리오 상세 정보 로드
function loadPortfolioDetails(portfolioId) {
    const portfolio = window.portfolioData.find(item => item.id == portfolioId);
    
    if (!portfolio) {
        showModalError('포트폴리오 정보를 찾을 수 없습니다.');
        return;
    }
    
    const modalTitle = document.getElementById('portfolioModalTitle');
    const modalBody = document.getElementById('portfolioModalBody');
    
    // 제목 설정
    modalTitle.textContent = portfolio.title;
    
    // 상세 정보 생성
    modalBody.innerHTML = createPortfolioModalContent(portfolio);
    
    // 이미지 로드 확인
    checkImageLoad(portfolio.image);
}

// 포트폴리오 모달 콘텐츠 생성
function createPortfolioModalContent(portfolio) {
    const featuresHTML = portfolio.details.features.map(feature => 
        `<span class="badge badge-primary me-2 mb-2">${feature}</span>`
    ).join('');
    
    return `
        <div class="portfolio-modal-content">
            <div class="row">
                <div class="col-md-6">
                    <div class="portfolio-modal-image">
                        <img src="${portfolio.image}" alt="${portfolio.title}" class="img-fluid rounded" onerror="this.src='https://via.placeholder.com/500x400/f8f9fa/6c757d?text=이미지+준비중'">
                        <div class="image-overlay">
                            <div class="image-actions">
                                <button class="btn btn-outline-light btn-sm" onclick="zoomImage('${portfolio.image}')">
                                    <i class="fas fa-search-plus"></i> 확대보기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="portfolio-modal-info">
                        <h4 class="portfolio-modal-title">${portfolio.title}</h4>
                        <p class="portfolio-modal-description">${portfolio.description}</p>
                        
                        <div class="portfolio-details">
                            <div class="detail-item">
                                <i class="fas fa-home text-primary me-2"></i>
                                <strong>면적:</strong> ${portfolio.details.area}
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-clock text-primary me-2"></i>
                                <strong>시공기간:</strong> ${portfolio.details.duration}
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-won-sign text-primary me-2"></i>
                                <strong>예산:</strong> ${portfolio.details.budget}
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-palette text-primary me-2"></i>
                                <strong>스타일:</strong> ${portfolio.details.style}
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-user text-primary me-2"></i>
                                <strong>고객:</strong> ${portfolio.details.client}
                            </div>
                        </div>
                        
                        <div class="portfolio-features">
                            <h5 class="features-title">
                                <i class="fas fa-star text-warning me-2"></i>주요 특징
                            </h5>
                            <div class="features-list">
                                ${featuresHTML}
                            </div>
                        </div>
                        
                        <div class="portfolio-actions mt-4">
                            <button class="btn btn-primary me-2" onclick="requestSimilarQuote(${portfolio.id})">
                                <i class="fas fa-calculator me-2"></i>유사 견적 문의
                            </button>
                            <button class="btn btn-outline-primary" onclick="sharePortfolio(${portfolio.id})">
                                <i class="fas fa-share-alt me-2"></i>공유하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-12">
                    <div class="portfolio-gallery">
                        <h5 class="gallery-title">
                            <i class="fas fa-images text-primary me-2"></i>추가 이미지
                        </h5>
                        <div class="gallery-grid">
                            ${createGalleryImages(portfolio.id)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 갤러리 이미지 생성
function createGalleryImages(portfolioId) {
    // Unsplash에서 다양한 인테리어 이미지 사용
    const galleryImages = {
        1: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ],
        2: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ],
        3: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ],
        4: [
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ],
        5: [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ],
        6: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ]
    };
    
    const images = galleryImages[portfolioId] || galleryImages[1];
    
    return images.map((image, index) => `
        <div class="gallery-item" onclick="showGalleryModal('${image}', ${index})">
            <img src="${image}" alt="추가 이미지 ${index + 1}">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        </div>
    `).join('');
}

// 모달 에러 표시
function showModalError(message) {
    const modalBody = document.getElementById('portfolioModalBody');
    modalBody.innerHTML = `
        <div class="alert alert-danger">
            <i class="fas fa-exclamation-triangle me-2"></i>
            ${message}
        </div>
    `;
}

// 모달 콘텐츠 초기화
function clearModalContent() {
    const modalTitle = document.getElementById('portfolioModalTitle');
    const modalBody = document.getElementById('portfolioModalBody');
    
    modalTitle.textContent = '포트폴리오 상세';
    modalBody.innerHTML = '<div class="text-center"><div class="loading-spinner"></div></div>';
}

// 이미지 로드 확인
function checkImageLoad(imageSrc) {
    const img = new Image();
    img.onload = function() {
        console.log('Portfolio image loaded successfully');
    };
    img.onerror = function() {
        console.warn('Portfolio image failed to load:', imageSrc);
    };
    img.src = imageSrc;
}

// 이미지 확대보기
function zoomImage(imageSrc) {
    const zoomModal = createZoomModal(imageSrc);
    document.body.appendChild(zoomModal);
    
    const zoomBootstrapModal = new bootstrap.Modal(zoomModal);
    zoomBootstrapModal.show();
    
    zoomModal.addEventListener('hidden.bs.modal', function() {
        zoomModal.remove();
    });
}

// 확대 모달 생성
function createZoomModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content bg-transparent border-0">
                <div class="modal-header border-0 bg-transparent">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center p-0">
                    <img src="${imageSrc}" alt="확대 이미지" class="img-fluid rounded">
                </div>
            </div>
        </div>
    `;
    return modal;
}

// 갤러리 모달 표시
function showGalleryModal(imageSrc, index) {
    // 이미지 존재 확인
    const img = new Image();
    img.onload = function() {
        zoomImage(imageSrc);
    };
    img.onerror = function() {
        showAlert('이미지를 불러올 수 없습니다.', 'error');
    };
    img.src = imageSrc;
}

// 유사 견적 문의
function requestSimilarQuote(portfolioId) {
    const portfolio = window.portfolioData.find(item => item.id == portfolioId);
    
    if (portfolio) {
        // 견적 문의 섹션으로 스크롤
        const quoteSection = document.getElementById('quote');
        if (quoteSection) {
            quoteSection.scrollIntoView({ behavior: 'smooth' });
            
            // 폼에 포트폴리오 정보 미리 채우기
            setTimeout(() => {
                const detailsField = document.getElementById('details');
                if (detailsField) {
                    detailsField.value = `참고 포트폴리오: ${portfolio.title}\n스타일: ${portfolio.details.style}\n면적: ${portfolio.details.area}\n\n추가 요청사항: `;
                }
            }, 500);
        }
        
        // 모달 닫기
        portfolioModal.hide();
        
        showAlert('견적 문의 폼으로 이동했습니다. 참고 포트폴리오 정보가 자동으로 입력되었습니다.', 'info');
    }
}

// 포트폴리오 공유
function sharePortfolio(portfolioId) {
    const portfolio = window.portfolioData.find(item => item.id == portfolioId);
    
    if (!portfolio) return;
    
    const shareData = {
        title: portfolio.title,
        text: portfolio.description,
        url: window.location.href + `#portfolio-${portfolioId}`
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        // 클립보드에 복사
        const shareText = `${portfolio.title}\n${portfolio.description}\n${shareData.url}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                showAlert('포트폴리오 링크가 클립보드에 복사되었습니다.', 'success');
            }).catch(() => {
                fallbackCopyToClipboard(shareText);
            });
        } else {
            fallbackCopyToClipboard(shareText);
        }
    }
}

// 클립보드 복사 폴백
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showAlert('포트폴리오 링크가 클립보드에 복사되었습니다.', 'success');
    } catch (err) {
        showAlert('클립보드 복사에 실패했습니다.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// 모달 스타일 추가
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-modal-content {
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .portfolio-modal-image {
            position: relative;
            overflow: hidden;
            border-radius: 10px;
        }
        
        .portfolio-modal-image img {
            transition: transform 0.3s ease;
        }
        
        .portfolio-modal-image:hover img {
            transform: scale(1.05);
        }
        
        .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .portfolio-modal-image:hover .image-overlay {
            opacity: 1;
        }
        
        .detail-item {
            margin-bottom: 0.75rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }
        
        .detail-item:last-child {
            border-bottom: none;
        }
        
        .features-title {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .features-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .gallery-item {
            position: relative;
            aspect-ratio: 1;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover {
            transform: scale(1.05);
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
        
        .gallery-overlay i {
            color: white;
            font-size: 1.5rem;
        }
        
        @media (max-width: 767px) {
            .portfolio-modal-content {
                max-height: 90vh;
            }
            
            .gallery-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `;
    document.head.appendChild(style);
}

// 전역 함수로 모달 열기
window.openPortfolioModal = function(portfolioId) {
    if (portfolioModal) {
        loadPortfolioDetails(portfolioId);
        portfolioModal.show();
    }
};

// 모달 초기화 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeModal();
    addModalStyles();
});
