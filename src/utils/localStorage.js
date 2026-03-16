// utils/localStorage.js
export const saveAlumniRecord = (record) => {
  const existingRecords = getAllAlumniRecords();
  existingRecords.push(record);
  localStorage.setItem('alumniRecords', JSON.stringify(existingRecords));
};

export const getAllAlumniRecords = () => {
  const records = localStorage.getItem('alumniRecords');
  return records ? JSON.parse(records) : [];
};

export const findAlumniByEmail = (email) => {
  const existingRecords = getAllAlumniRecords();
  return existingRecords.find(record => record.email === email);
};

export const updateAlumniStatus = (id, newStatus, additionalData = {}) => {
  const existingRecords = getAllAlumniRecords();
  const updatedRecords = existingRecords.map(record => 
    record.id === id 
      ? { 
          ...record, 
          status: newStatus, 
          ...additionalData,
          updatedAt: new Date().toISOString() 
        } 
      : record
  );
  localStorage.setItem('alumniRecords', JSON.stringify(updatedRecords));
  return updatedRecords.find(record => record.id === id);
};

export const getApprovedAlumni = () => {
  const allRecords = getAllAlumniRecords();
  return allRecords.filter(record => record.status === 'Approved');
};

export const getPendingAlumni = () => {
  const allRecords = getAllAlumniRecords();
  return allRecords.filter(record => record.status === 'Under Verification');
};

export const generateAlumniId = () => {
  const allRecords = getAllAlumniRecords();
  const approvedRecords = allRecords.filter(r => r.alumniId && r.alumniId.startsWith('ADLINK-'));
  
  let maxNumber = 0;
  approvedRecords.forEach(record => {
    const number = parseInt(record.alumniId.replace('ADLINK-', ''));
    if (!isNaN(number) && number > maxNumber) {
      maxNumber = number;
    }
  });
  
  const nextNumber = maxNumber + 1;
  return `ADLINK-${nextNumber.toString().padStart(5, '0')}`;
};

export const markPaymentLinkSent = (id) => {
  const existingRecords = getAllAlumniRecords();
  const updatedRecords = existingRecords.map(record => 
    record.id === id 
      ? { 
          ...record, 
          paymentLinkSent: true, 
          paymentLinkSentAt: new Date().toISOString() 
        } 
      : record
  );
  localStorage.setItem('alumniRecords', JSON.stringify(updatedRecords));
  return updatedRecords.find(record => record.id === id);
};

// utils/localStorage.js (add this function)

export const saveDonation = (donation) => {
  const existing = JSON.parse(localStorage.getItem("donations") || "[]");
  existing.push({ ...donation, status: "Success" });
  localStorage.setItem("donations", JSON.stringify(existing));
  return donation;
};

export const getAllDonations = () => {
  return JSON.parse(localStorage.getItem("donations") || "[]");
};