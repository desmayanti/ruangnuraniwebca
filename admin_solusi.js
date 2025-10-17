// js/admin_solusi.js

// Data dummy untuk solusi
let solutions = [
    { id: 'S001', judul: 'Perbaikan Jalan Rusak di Perumahan Indah', deskripsi: 'Solusi ini melibatkan pengaspalan ulang jalan yang berlubang dan retak di seluruh area perumahan Indah. Ditargetkan selesai dalam 2 minggu.', kategori: 'Infrastruktur', pic: 'Dinas Pekerjaan Umum' },
    { id: 'S002', judul: 'Sosialisasi Pelayanan Publik Cepat', deskripsi: 'Program sosialisasi untuk meningkatkan kualitas pelayanan publik di kantor kelurahan, fokus pada kecepatan dan transparansi.', kategori: 'Pelayanan', pic: 'Bagian Pelayanan Masyarakat' },
    { id: 'S003', judul: 'Program Bank Sampah Lingkungan Bersih', deskripsi: 'Pembentukan bank sampah di setiap RW untuk mengelola sampah rumah tangga dan mendaur ulang. Mengurangi penumpukan sampah liar.', kategori: 'Lingkungan', pic: 'Dinas Kebersihan dan Lingkungan Hidup' },
    { id: 'S004', judul: 'Patroli Keamanan Lingkungan Malam Hari', deskripsi: 'Peningkatan intensitas patroli oleh Satpol PP dan warga setempat di jam-jam rawan untuk mengurangi angka kejahatan.', kategori: 'Sosial', pic: 'Satpol PP & Warga' },
    { id: 'S005', judul: 'Perbaikan Drainase Utama Kota', deskripsi: 'Pembersihan dan pelebaran saluran drainase utama untuk mencegah banjir saat musim hujan.', kategori: 'Infrastruktur', pic: 'Dinas Sumber Daya Air' },
];

let currentMode = 'add'; // 'add' or 'edit'

function renderSolutions(data) {
    const solusiGrid = document.getElementById('solusiGrid');
    const noResults = document.getElementById('noSolusiResults');
    solusiGrid.innerHTML = '';

    if (data.length === 0) {
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }

    data.forEach(solusi => {
        const card = document.createElement('div');
        card.className = 'solusi-card';
        card.innerHTML = `
            <span class="kategori-badge">${solusi.kategori}</span>
            <h3>${solusi.judul}</h3>
            <p>${solusi.deskripsi}</p>
            <div class="pic-info"><i class="fas fa-user-tie"></i> Penanggung Jawab: ${solusi.pic}</div>
            <div class="solusi-actions">
                <button class="btn btn-edit" onclick="openSolutionModal('edit', '${solusi.id}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-delete" onclick="deleteSolution('${solusi.id}')"><i class="fas fa-trash-alt"></i> Hapus</button>
            </div>
        `;
        solusiGrid.appendChild(card);
    });
}

function filterSolusi() {
    const searchTerm = document.getElementById('searchSolusi').value.toLowerCase();
    const categoryFilter = document.getElementById('filterSolusiKategori').value;

    const filteredData = solutions.filter(solusi => {
        const matchesSearch = solusi.judul.toLowerCase().includes(searchTerm) || solusi.deskripsi.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || solusi.kategori === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    renderSolutions(filteredData);
}

function openSolutionModal(mode, id = null) {
    const modal = document.getElementById('solusiModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('solusiForm');
    
    form.reset(); // Reset form setiap kali dibuka

    currentMode = mode;
    modal.classList.remove('hidden');

    if (mode === 'add') {
        modalTitle.textContent = 'Tambah Solusi Baru';
        document.getElementById('solusiId').value = '';
    } else {
        modalTitle.textContent = 'Edit Solusi';
        const solution = solutions.find(s => s.id === id);
        if (solution) {
            document.getElementById('solusiId').value = solution.id;
            document.getElementById('judulSolusi').value = solution.judul;
            document.getElementById('deskripsiSolusi').value = solution.deskripsi;
            document.getElementById('kategoriSolusi').value = solution.kategori;
            document.getElementById('picSolusi').value = solution.pic;
        }
    }
}

function closeSolusiModal() {
    document.getElementById('solusiModal').classList.add('hidden');
}

document.getElementById('solusiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('solusiId').value || 'S' + (solutions.length + 1).toString().padStart(3, '0');
    const judul = document.getElementById('judulSolusi').value;
    const deskripsi = document.getElementById('deskripsiSolusi').value;
    const kategori = document.getElementById('kategoriSolusi').value;
    const pic = document.getElementById('picSolusi').value;

    const newSolusi = { id, judul, deskripsi, kategori, pic };

    if (currentMode === 'add') {
        solutions.push(newSolusi);
        alert('Solusi berhasil ditambahkan!');
    } else {
        const index = solutions.findIndex(s => s.id === id);
        if (index !== -1) {
            solutions[index] = newSolusi;
            alert('Solusi berhasil diperbarui!');
        }
    }
    
    renderSolutions(solutions);
    closeSolusiModal();
});

function deleteSolution(id) {
    if (confirm('Anda yakin ingin menghapus solusi ini?')) {
        solutions = solutions.filter(s => s.id !== id);
        renderSolutions(solutions);
        alert('Solusi berhasil dihapus!');
    }
}

// Inisialisasi: Render solusi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderSolutions(solutions);
});