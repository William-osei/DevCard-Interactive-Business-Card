// Debug version of flipCard function with extensive logging
function debugFlipCard() {
    console.log('🐛 DEBUG: flipCard() called');
    
    // Prevent multiple rapid flips
    if (window.flipInProgress) {
        console.log('🐛 DEBUG: Flip already in progress, exiting');
        return;
    }
    console.log('🐛 DEBUG: Setting flip in progress...');
    window.flipInProgress = true;
    
    const card = document.querySelector('.dev-card');
    const cardContainer = document.querySelector('.card-container');
    
    console.log('🐛 DEBUG: Card element:', card);
    console.log('🐛 DEBUG: Card container:', cardContainer);
    
    // Check if required elements exist
    if (!card || !cardContainer) {
        console.error('🐛 DEBUG: Required elements not found');
        console.log('🐛 DEBUG: Card exists:', !!card);
        console.log('🐛 DEBUG: Card container exists:', !!cardContainer);
        window.flipInProgress = false;
        return;
    }
    
    // Ensure devCardInstance exists
    console.log('🐛 DEBUG: devCardInstance:', devCardInstance);
    if (!devCardInstance) {
        console.error('🐛 DEBUG: DevCard instance not found');
        window.flipInProgress = false;
        return;
    }
    
    // Check animation completion
    const animationComplete = card.getAttribute('data-animation-complete');
    console.log('🐛 DEBUG: Animation complete attribute:', animationComplete);
    
    // Check if card is still in initial GSAP animation
    if (typeof gsap !== 'undefined' && !card.getAttribute('data-animation-complete')) {
        console.warn('🐛 DEBUG: Waiting for initial animation to complete');
        window.flipInProgress = false;
        if (devCardInstance) {
            devCardInstance.showNotification('⏳ Loading animation in progress...', 'info');
        }
        return;
    }
    
    // Stop any ongoing GSAP animations on the card
    if (typeof gsap !== 'undefined') {
        console.log('🐛 DEBUG: Killing existing GSAP tweens');
        gsap.killTweensOf(card);
        gsap.killTweensOf(cardContainer);
        // Ensure the card is at its final state
        gsap.set(card, { scale: 1, opacity: 1 });
    }
    
    // Add flipping class for animation state
    console.log('🐛 DEBUG: Adding flipping class');
    card.classList.add('flipping');
    
    // Check current flip state
    const wasFlipped = devCardInstance.isFlipped;
    console.log('🐛 DEBUG: Was flipped:', wasFlipped);
    
    // Add flip animation effect with enhanced visual feedback
    card.classList.toggle('flipped');
    devCardInstance.isFlipped = !devCardInstance.isFlipped;
    
    console.log('🐛 DEBUG: Now flipped:', devCardInstance.isFlipped);
    console.log('🐛 DEBUG: Card has flipped class:', card.classList.contains('flipped'));
    
    // Remove flipping class after animation
    setTimeout(() => {
        console.log('🐛 DEBUG: Removing flipping class');
        card.classList.remove('flipping');
    }, 650);
    
    // Add enhanced visual feedback with smooth scaling
    if (typeof gsap !== 'undefined') {
        console.log('🐛 DEBUG: Using GSAP for scale animation');
        // Use GSAP for smoother animations with better conflict handling
        gsap.to(cardContainer, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(cardContainer, {
                    scale: 1,
                    duration: 0.2,
                    ease: "back.out(1.7)"
                });
            }
        });
    } else {
        console.log('🐛 DEBUG: Using CSS fallback for scale animation');
        // Fallback to CSS transitions
        cardContainer.style.transition = 'transform 0.15s ease-out';
        cardContainer.style.transform = 'scale(0.95)';
        setTimeout(() => {
            cardContainer.style.transform = 'scale(1)';
            setTimeout(() => {
                cardContainer.style.transition = '';
            }, 200);
        }, 150);
    }
    
    // Update button text and accessibility attributes (simplified for debug)
    console.log('🐛 DEBUG: Updating button text and accessibility');
    
    // Allow next flip after animation completes
    setTimeout(() => {
        console.log('🐛 DEBUG: Flip complete, allowing next flip');
        window.flipInProgress = false;
    }, 650);
    
    console.log('🐛 DEBUG: flipCard() function completed successfully');
}

// Override the global flipCard function for debugging
if (window.location.href.includes('debug') || localStorage.getItem('debugFlip') === 'true') {
    console.log('🐛 DEBUG MODE ENABLED: Using debug flip function');
    window.flipCard = debugFlipCard;
}
