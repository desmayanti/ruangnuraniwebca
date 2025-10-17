/* js/admin_keluhan.js */

// Data Dummy Keluhan
const complaints = [
    { id: '#RN25-015', judul: 'Pungli di Kantor Kelurahan Cepat Saji', pelapor: 'Asep', kategori: 'Pelayanan', tanggal: '14/10/2025', status: 'Baru' },
    { id: '#RN25-014', judul: 'Jalan Ambles di Dekat Jembatan Utara', pelapor: 'Rina', kategori: 'Infrastruktur', tanggal: '13/10/2025', status: 'Diproses' },
    { id: '#RN25-013', judul: 'Penumpukan Sampah Liar di Pinggir Tol', pelapor: 'Anonim', kategori: 'Lingkungan', tanggal: '12/10/2025', status: 'Verifikasi' },
    { id: '#RN25-012', judul: 'Lampu Jalan Mati di Kawasan Bisnis', pelapor: 'Budi', kategori: 'Infrastruktur', tanggal: '11/10/2025', status: 'Selesai' },
    { id: '#RN25-011', judul: 'Pembuatan KTP Sangat Lambat', pelapor: 'Citra', kategori: 'Pelayanan', tanggal: '10/10/2025', status: 'Diproses' },
    { id: '#RN25-010', judul: 'Bau Limbah Pabrik Mengganggu Warga', pelapor: 'Doni', kategori: 'Lingkungan', tanggal: '09/10/2025', status: 'Ditolak' },
    { id: '#RN25-009', judul: 'Trotoar Rusak Bahayakan Pejalan Kaki', pelapor: 'Eka', kategori: 'Infrastruktur', tanggal: '08/10/2025', status: 'Selesai' },
];

// Fungsi untuk mendapatkan kelas CSS berdasarkan status
function getStatusClass(status) {
    switch (status) {
        case 'Baru': return 'status-new';
        case 'Verifikasi': return 'status-verifikasi';
        case 'Diproses': return 'status-progress';
        case 'Selesai': return 'status-done';
        case 'Ditolak': return 'status-rejected';
        default: return '';
    }
}

// Fungsi untuk me-render tabel
function renderTable(data) {
    const tableBody = document.getElementById('complaintTableBody');
    const noResults = document.getElementById('noResults');
    tableBody.innerHTML = '';

    if (data.length === 0) {
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }

    data.forEach(complaint => {
        const row = tableBody.insertRow();
        const statusClass = getStatusClass(complaint.status);

        row.innerHTML = `
            <td>${complaint.id}</td>
            <td>${complaint.judul}</td>
            <td>${complaint.pelapor}</td>
            <td>${complaint.kategori}</td>
            <td>${complaint.tanggal}</td>
            <td><span class="status-badge ${statusClass}">${complaint.status}</span></td>
            <td>
                <button class="btn-detail" onclick="viewDetail('${complaint.id}')">Detail</button>
                <button class="btn-action" onclick="updateStatus('${complaint.id}', '${complaint.status}')"><i class="fas fa-check"></i> Proses</button>
            </td>
        `;
    });
}

// Fungsi untuk memfilter tabel
function filterTable() {
    const searchTerm = document.getElementById('searchKeluhan').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const categoryFilter = document.getElementById('filterKategori').value;

    const filteredData = complaints.filter(complaint => {
        // Filter Pencarian
        const matchesSearch = complaint.judul.toLowerCase().includes(searchTerm) || complaint.id.toLowerCase().includes(searchTerm);

        // Filter Status
        const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;

        // Filter Kategori
        const matchesCategory = categoryFilter === 'all' || complaint.kategori === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    renderTable(filteredData);
}

// Fungsi Aksi Simulasi
function viewDetail(id) {
    alert(`Membuka halaman detail untuk Keluhan ID: ${id}`);
}

function updateStatus(id, currentStatus) {
    alert(`Keluhan ID: ${id} (Status: ${currentStatus}) akan dipindahkan ke tahap selanjutnya.`);
    // Logika riil: Buka modal untuk mengubah status
}

// Inisialisasi: Render tabel saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderTable(complaints);
});