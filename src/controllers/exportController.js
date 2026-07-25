const prisma = require('../prisma');
const AdmZip = require('adm-zip');

// ─── Helper: Convert array of objects to CSV ──────────────
const toCSV = (data, headers) => {
  if (!data || data.length === 0) return '';
  const headerRow = headers.join(',');
  const rows = data.map(item => 
    headers.map(h => {
      const val = item[h] ?? '';
      return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
    }).join(',')
  );
  return [headerRow, ...rows].join('\n');
};

// ─── Export all data as ZIP ────────────────────────────────────
exports.exportAllData = async (req, res) => {
  try {
    const [
      users,
      fellowships,
      members,
      attendanceSessions,
      attendanceRecords,
      monthlyReports,
      otps,
    ] = await Promise.all([
      prisma.user.findMany({ select: { id: true, churchId: true, email: true, fullName: true, role: true, createdAt: true } }),
      prisma.fellowship.findMany({ include: { leader: true, associate: true } }),
      prisma.member.findMany({ include: { fellowship: true } }),
      prisma.attendanceSession.findMany(),
      prisma.attendanceRecord.findMany({ include: { member: true, session: true } }),
      prisma.monthlyReport.findMany({ include: { fellowship: true } }),
      prisma.oTP.findMany(),
    ]);

    const zip = new AdmZip();

    // Helper to add CSV file to ZIP
    const addCSV = (name, data, headers) => {
      const csv = toCSV(data, headers);
      zip.addFile(`${name}.csv`, Buffer.from(csv, 'utf-8'));
    };

    // Users
    addCSV('users', users, ['id', 'churchId', 'email', 'fullName', 'role', 'createdAt']);

    // Fellowships
    const fellowshipData = fellowships.map(f => ({
      id: f.id,
      name: f.name,
      location: f.location,
      leader: f.leader?.fullName || '',
      associate: f.associate?.fullName || '',
      createdAt: f.createdAt,
    }));
    addCSV('fellowships', fellowshipData, ['id', 'name', 'location', 'leader', 'associate', 'createdAt']);

    // Members
    const memberData = members.map(m => ({
      id: m.id,
      fullName: m.fullName,
      phone: m.phone,
      email: m.email,
      memberNumber: m.memberNumber,
      fellowship: m.fellowship?.name || '',
      isActive: m.isActive,
      createdAt: m.createdAt,
    }));
    addCSV('members', memberData, ['id', 'fullName', 'phone', 'email', 'memberNumber', 'fellowship', 'isActive', 'createdAt']);

    // Attendance Sessions
    addCSV('attendance_sessions', attendanceSessions, ['id', 'fellowshipId', 'weekNumber', 'monthYear', 'meetingDate', 'isSubmitted', 'submittedAt', 'createdAt']);

    // Attendance Records
    const recordData = attendanceRecords.map(r => ({
      id: r.id,
      sessionId: r.sessionId,
      memberId: r.memberId,
      memberName: r.member?.fullName || '',
      checkInMethod: r.checkInMethod,
      checkedInBy: r.checkedInBy,
      checkedInAt: r.checkedInAt,
    }));
    addCSV('attendance_records', recordData, ['id', 'sessionId', 'memberId', 'memberName', 'checkInMethod', 'checkedInBy', 'checkedInAt']);

    // Monthly Reports
    const reportData = monthlyReports.map(r => ({
      id: r.id,
      fellowship: r.fellowship?.name || '',
      monthYear: r.monthYear,
      week1Date: r.week1Date,
      week2Date: r.week2Date,
      week3Date: r.week3Date,
      week4Date: r.week4Date,
      week5Date: r.week5Date,
      week1Count: r.week1Count,
      week2Count: r.week2Count,
      week3Count: r.week3Count,
      week4Count: r.week4Count,
      week5Count: r.week5Count,
      prayerFlag: r.prayerFlag,
      firstTimers: r.firstTimers,
      newMembers: r.newMembers,
      followUps: r.followUps,
      escalations: r.escalations,
      comments: r.comments,
      status: r.status,
      createdAt: r.createdAt,
    }));
    addCSV('monthly_reports', reportData, ['id', 'fellowship', 'monthYear', 'week1Date', 'week2Date', 'week3Date', 'week4Date', 'week5Date', 'week1Count', 'week2Count', 'week3Count', 'week4Count', 'week5Count', 'prayerFlag', 'firstTimers', 'newMembers', 'followUps', 'escalations', 'comments', 'status', 'createdAt']);

    // OTPs
    addCSV('otps', otps, ['id', 'userId', 'otp', 'expiresAt', 'used', 'createdAt']);

    // Generate ZIP buffer
    const zipBuffer = zip.toBuffer();

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=fountain_hfc_export.zip');
    res.send(zipBuffer);
  } catch (error) {
    console.error('Export error:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Export failed.' });
    }
  }
};