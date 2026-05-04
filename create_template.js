const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Format Import');
worksheet.columns = [
    { header: 'nis', key: 'nis', width: 15 },
    { header: 'nisn', key: 'nisn', width: 15 },
    { header: 'name', key: 'name', width: 25 },
    { header: 'gender', key: 'gender', width: 10 },
    { header: 'birth_place', key: 'birth_place', width: 15 },
    { header: 'birth_date', key: 'birth_date', width: 15 },
    { header: 'parent_name', key: 'parent_name', width: 25 },
    { header: 'address', key: 'address', width: 30 },
    { header: 'phone', key: 'phone', width: 15 }
];
worksheet.addRow({
    nis: '1001',
    nisn: '0012345678',
    name: 'Budi Santoso',
    gender: 'L',
    birth_place: 'Jakarta',
    birth_date: '2005-01-01',
    parent_name: 'Santoso',
    address: 'Jl. Merdeka No 1',
    phone: '08123456789'
});
workbook.xlsx.writeFile('../frontend/public/format_import_siswa.xlsx').then(() => {
    console.log('Template created!');
});
