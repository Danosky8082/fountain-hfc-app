// src/controllers/fellowshipController.js
const prisma = require('../prisma');

// ─── Get Members ────────────────────────────────────────
exports.getMembers = async (req, res) => {
  try {
    const { fellowshipId: userFellowshipId, userId, role } = req.user;
    let targetFellowshipId = userFellowshipId;

    // If user is ADMIN or HOD, allow overriding with query param
    if ((role === 'ADMIN' || role === 'HOD') && req.query.fellowshipId) {
      targetFellowshipId = req.query.fellowshipId;
    }

    if (!targetFellowshipId) {
      return res.status(400).json({
        success: false,
        message: 'No fellowship selected. Please choose a fellowship.',
      });
    }

    // For non-Admin/HOD, verify they have access to that fellowship
    if (role !== 'ADMIN' && role !== 'HOD') {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { 
          leading: { select: { id: true } }, 
          assisting: { select: { id: true } } 
        },
      });
      const allowedFellowshipIds = [user?.leading?.id, user?.assisting?.id].filter(Boolean);
      if (!allowedFellowshipIds.includes(targetFellowshipId)) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to view members of this fellowship.',
        });
      }
    }

    const members = await prisma.member.findMany({
      where: { 
        fellowshipId: targetFellowshipId, 
        isActive: true 
      },
      orderBy: { fullName: 'asc' },
      select: { 
        id: true, 
        fullName: true, 
        phone: true, 
        email: true, 
        qrUniqueId: true, 
        memberNumber: true,
        createdAt: true,
        updatedAt: true
      },
    });

    res.status(200).json({ 
      success: true, 
      data: members,
      count: members.length 
    });
  } catch (error) {
    console.error('Get Members Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch members.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Get Fellowship Details ─────────────────────────────
exports.getFellowshipDetails = async (req, res) => {
  try {
    const { fellowshipId } = req.user;
    if (!fellowshipId) {
      return res.status(400).json({ 
        success: false, 
        message: 'No fellowship assigned.' 
      });
    }
    
    const fellowship = await prisma.fellowship.findUnique({
      where: { id: fellowshipId },
      select: { 
        id: true, 
        name: true, 
        location: true,
        leader: {
          select: { id: true, fullName: true, email: true }
        },
        associate: {
          select: { id: true, fullName: true, email: true }
        },
        _count: {
          select: { members: true }
        }
      },
    });
    
    if (!fellowship) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found'
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: fellowship 
    });
  } catch (error) {
    console.error('Get Fellowship Details Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ─── Get All Fellowships ────────────────────────────────
exports.getAllFellowships = async (req, res) => {
  try {
    const fellowships = await prisma.fellowship.findMany({
      select: { 
        id: true, 
        name: true,
        location: true,
        leader: {
          select: { id: true, fullName: true }
        },
        associate: {
          select: { id: true, fullName: true }
        },
        _count: {
          select: { members: true }
        }
      },
      orderBy: { name: 'asc' },
    });
    
    res.status(200).json({ 
      success: true, 
      data: fellowships,
      count: fellowships.length 
    });
  } catch (error) {
    console.error('Get All Fellowships Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ─── Create Fellowship ──────────────────────────────────
exports.createFellowship = async (req, res) => {
  try {
    const { name, location, leaderId, associateId } = req.body;

    // Validate required fields
    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: 'Name and location are required'
      });
    }

    // Check if fellowship name already exists
    const existingFellowship = await prisma.fellowship.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } }
    });

    if (existingFellowship) {
      return res.status(400).json({
        success: false,
        message: 'A fellowship with this name already exists'
      });
    }

    // Validate leader exists and has correct role
    if (leaderId) {
      const leader = await prisma.user.findUnique({
        where: { id: leaderId },
        select: { role: true }
      });
      
      if (!leader) {
        return res.status(400).json({
          success: false,
          message: 'Leader not found'
        });
      }
      
      // Check if leader is already leading another fellowship
      const existingLeadership = await prisma.fellowship.findFirst({
        where: { leaderId: leaderId }
      });
      
      if (existingLeadership) {
        return res.status(400).json({
          success: false,
          message: 'This user is already leading another fellowship'
        });
      }
    }

    // Validate associate exists
    if (associateId) {
      const associate = await prisma.user.findUnique({
        where: { id: associateId },
        select: { role: true }
      });
      
      if (!associate) {
        return res.status(400).json({
          success: false,
          message: 'Associate not found'
        });
      }
      
      // Check if associate is already assigned to another fellowship
      const existingFellowship = await prisma.fellowship.findFirst({
        where: { associateId: associateId }
      });
      
      if (existingFellowship) {
        return res.status(400).json({
          success: false,
          message: 'This associate is already assigned to another fellowship'
        });
      }
    }

    // Create fellowship
    const fellowship = await prisma.fellowship.create({
      data: {
        name: name.trim(),
        location: location.trim(),
        leaderId: leaderId || null,
        associateId: associateId || null,
      },
      include: {
        leader: {
          select: { id: true, fullName: true, email: true, role: true }
        },
        associate: {
          select: { id: true, fullName: true, email: true, role: true }
        }
      }
    });

    // Update user roles if needed
    if (leaderId) {
      await prisma.user.update({
        where: { id: leaderId },
        data: { role: 'FL' }
      });
    }

    if (associateId) {
      await prisma.user.update({
        where: { id: associateId },
        data: { role: 'ASSOCIATE' }
      });
    }

    res.status(201).json({
      success: true,
      data: fellowship,
      message: 'Fellowship created successfully'
    });

  } catch (error) {
    console.error('Create Fellowship Error:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: 'Invalid leaderId or associateId - User does not exist',
        error: error.message
      });
    }
    
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'This user is already assigned to another fellowship',
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create fellowship',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Update Fellowship ──────────────────────────────────
exports.updateFellowship = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, leaderId, associateId } = req.body;

    // Check if fellowship exists
    const existingFellowship = await prisma.fellowship.findUnique({
      where: { id }
    });

    if (!existingFellowship) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found'
      });
    }

    // Validate leader if provided
    if (leaderId) {
      const leader = await prisma.user.findUnique({
        where: { id: leaderId }
      });
      if (!leader) {
        return res.status(400).json({
          success: false,
          message: 'Leader not found'
        });
      }

      // Check if leader is already leading another fellowship (excluding this one)
      const existingLeadership = await prisma.fellowship.findFirst({
        where: {
          leaderId: leaderId,
          NOT: { id: id }
        }
      });
      
      if (existingLeadership) {
        return res.status(400).json({
          success: false,
          message: 'This user is already leading another fellowship'
        });
      }
    }

    // Validate associate if provided
    if (associateId) {
      const associate = await prisma.user.findUnique({
        where: { id: associateId }
      });
      if (!associate) {
        return res.status(400).json({
          success: false,
          message: `Associate with ID ${associateId} not found`
        });
      }

      // Check if associate is already assigned to another fellowship (excluding this one)
      const existingAssociate = await prisma.fellowship.findFirst({
        where: {
          associateId: associateId,
          NOT: { id: id }
        }
      });
      
      if (existingAssociate) {
        return res.status(400).json({
          success: false,
          message: 'This user is already assigned as associate to another fellowship'
        });
      }
    }

    // Build update data
    const updateData = {
      name: name?.trim(),
      location: location?.trim(),
    };

    // Handle leaderId - handle both setting and removing
    if (leaderId !== undefined) {
      // If leaderId is null or empty string, set to null; otherwise use the value
      updateData.leaderId = leaderId || null;
    }

    // Handle associateId - handle both setting and removing
    if (associateId !== undefined) {
      // If associateId is null or empty string, set to null; otherwise use the value
      updateData.associateId = associateId || null;
    }

    // Update user roles if needed
    if (leaderId) {
      await prisma.user.update({
        where: { id: leaderId },
        data: { role: 'FL' }
      });
    }

    if (associateId) {
      await prisma.user.update({
        where: { id: associateId },
        data: { role: 'ASSOCIATE' }
      });
    }

    const fellowship = await prisma.fellowship.update({
      where: { id },
      data: updateData,
      include: {
        leader: {
          select: { id: true, fullName: true, email: true, role: true }
        },
        associate: {
          select: { id: true, fullName: true, email: true, role: true }
        },
        _count: {
          select: { members: true, sessions: true, reports: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: fellowship,
      message: 'Fellowship updated successfully'
    });

  } catch (error) {
    console.error('Update Fellowship Error:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: 'Invalid leaderId or associateId - User does not exist',
        error: error.message
      });
    }
    
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'This user is already assigned to another fellowship',
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update fellowship',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Delete Fellowship ──────────────────────────────────
exports.deleteFellowship = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if fellowship exists and has no members/sessions
    const fellowship = await prisma.fellowship.findUnique({
      where: { id },
      include: {
        members: true,
        sessions: true,
        reports: true
      }
    });

    if (!fellowship) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found'
      });
    }

    // Check for dependent records
    if (fellowship.members.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete fellowship with ${fellowship.members.length} existing members. Remove members first.`
      });
    }

    if (fellowship.sessions.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete fellowship with ${fellowship.sessions.length} existing sessions. Delete sessions first.`
      });
    }

    if (fellowship.reports.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete fellowship with ${fellowship.reports.length} existing reports. Delete reports first.`
      });
    }

    // Delete the fellowship
    await prisma.fellowship.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Fellowship deleted successfully'
    });

  } catch (error) {
    console.error('Delete Fellowship Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete fellowship',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Get Fellowship Stats ───────────────────────────────
exports.getFellowshipStats = async (req, res) => {
  try {
    const { fellowshipId } = req.params;

    const stats = await prisma.fellowship.findUnique({
      where: { id: fellowshipId },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            members: true,
            sessions: true,
            reports: true
          }
        },
        members: {
          where: { isActive: true },
          select: {
            attendanceRecords: {
              select: {
                sessionId: true
              }
            }
          }
        }
      }
    });

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found'
      });
    }

    // Calculate attendance stats
    const totalMembers = stats._count.members;
    const totalSessions = stats._count.sessions;
    const totalAttendance = stats.members.reduce((acc, member) => {
      return acc + member.attendanceRecords.length;
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        id: stats.id,
        name: stats.name,
        totalMembers,
        totalSessions,
        totalAttendance,
        averageAttendance: totalSessions > 0 ? Math.round(totalAttendance / totalSessions) : 0
      }
    });

  } catch (error) {
    console.error('Get Fellowship Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fellowship stats',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};