/**
 * Geosantara Frontend Interactions
 * Handles AOS initialization and other JS logic
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi AOS dengan pengaturan lambat (smooth) untuk orang tua
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000, // 1 detik (lambat dan halus)
            easing: 'ease-out-cubic', // kurva perlambatan yang natural
            once: true, // hanya dianimasikan sekali saat di-scroll
            offset: 50, // trigger lebih cepat sedikit
        });
    }
});
