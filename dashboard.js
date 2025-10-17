// js/dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Ruang Nurani Dashboard Admin aktif.");

    // Logika umum yang bisa ditambahkan di sini:
    
    // 1. Logika untuk Logout (hanya contoh, sudah ada di tombol logout)
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmLogout = confirm("Apakah Anda yakin ingin Logout?");
            if (confirmLogout) {
                window.location.href = '../index.html';
            }
        });
    }

    // 2. Logika untuk menandai item menu yang aktif
    const currentPath = window.location.href;
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Anda bisa menambahkan fungsi dashboard lain di sini,
    // seperti memuat data grafik atau notifikasi.

});