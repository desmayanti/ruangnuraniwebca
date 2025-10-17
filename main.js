// js/main.js (Kode yang Diperbaiki dan Lengkap)

document.addEventListener('DOMContentLoaded', function() {
    // 1. Inisialisasi Elemen Penting
    const showLoginBtn = document.getElementById('showLoginBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');
    const roleSelectionWrapper = document.getElementById('roleSelection');
    const adminRoleBtn = document.getElementById('adminRole');
    const userRoleBtn = document.getElementById('userRole');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    let userRole = null;

    // --- FUNGSI NOTIFIKASI KUSTOM (Tambahan) ---
    const showNotification = (message, type, redirectUrl) => {
        // Hapus notifikasi lama jika ada
        document.querySelectorAll('.custom-notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon"><i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}"></i></div>
            <div class="notification-content">
                <strong>${type === 'success' ? 'Berhasil!' : 'Gagal!'}</strong>
                <p>${message}</p>
            </div>
            <span class="close-notif" onclick="this.parentElement.remove()">&times;</span>
        `;
        document.body.appendChild(notification);
        
        // Atur agar notifikasi hilang otomatis dan redirect
        setTimeout(() => {
            notification.classList.add('fade-out');
            notification.addEventListener('transitionend', () => notification.remove());
            if (redirectUrl) {
                // Menunda redirect sedikit agar notifikasi terlihat
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 300); 
            }
        }, 2000); // Tampilkan selama 2 detik
    };

    // Tambahkan style untuk notifikasi ke <head> (cara cepat dan aman)
    const style = document.createElement('style');
    style.innerHTML = `
        .custom-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 30px 15px 20px;
            border-radius: 8px;
            color: white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            opacity: 1;
            transition: opacity 0.5s, transform 0.5s;
        }
        .custom-notification.fade-out {
            opacity: 0;
            transform: translateY(-50px);
        }
        .custom-notification.success {
            background-color: #4CAF50; /* Hijau Sukses */
        }
        .custom-notification.error {
            background-color: #f44336; /* Merah Error */
        }
        .notification-icon {
            font-size: 1.5em;
            margin-right: 15px;
        }
        .close-notif {
            position: absolute;
            top: 5px;
            right: 10px;
            font-size: 1.2em;
            cursor: pointer;
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
    // --- AKHIR FUNGSI NOTIFIKASI KUSTOM ---


    // 2. Event Listener untuk Tampilkan Modal (Ini yang harus dipastikan berfungsi!)
    if (showLoginBtn) {
        showLoginBtn.onclick = () => {
            modal.style.display = 'block';
            loginForm.classList.add('hidden');
            roleSelectionWrapper.classList.remove('hidden');
            loginMessage.textContent = '';
            userRole = null;
        };
    } else {
        console.error("Tombol 'showLoginBtn' tidak ditemukan.");
    }


    // 3. Event Listener untuk Tutup Modal
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };


    // 4. Fungsi & Event Listener Pemilihan Peran
    const showLoginForm = (role) => {
        userRole = role;
        roleSelectionWrapper.classList.add('hidden');
        loginForm.classList.remove('hidden');
        loginMessage.textContent = `Silakan masuk sebagai ${role === 'admin' ? 'Admin Pemerintah' : 'Warga Pelapor'}.`;
        loginMessage.style.color = '#333';
        document.getElementById('username').focus();
    };

    window.goBackToRole = () => {
        loginForm.classList.add('hidden');
        roleSelectionWrapper.classList.remove('hidden');
        userRole = null;
    };

    adminRoleBtn.onclick = () => showLoginForm('admin');
    userRoleBtn.onclick = () => showLoginForm('user');


    // 5. Event Listener untuk Submit Login (Menggunakan Notifikasi Kustom)
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Tutup modal sebelum notifikasi muncul
        modal.style.display = 'none';

        // Simulasi Login
        if (userRole === 'admin' && username === 'admin' && password === 'admin123') {
            showNotification('Login Admin berhasil! Selamat datang kembali.', 'success', 'pages/admin_dashboard.html');
        } else if (userRole === 'user' && username === 'warga' && password === 'warga123') {
            showNotification('Login Warga berhasil! Anda dapat mulai melapor.', 'success', 'pages/user_page.html');
        } else {
            // Login gagal
            showNotification('Login Gagal. Cek kembali kredensial Anda.', 'error', null); 
            
            // Opsional: Buka lagi modal setelah notifikasi hilang jika ingin user coba lagi
            setTimeout(() => {
                 // Hanya tampilkan form login yang sedang aktif
                 modal.style.display = 'block';
            }, 2500); 
        }
    };
});