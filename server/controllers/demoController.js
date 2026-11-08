// Demo Controller - AWS First Cloud Journey participants data
const demoUsers = [
    {
        id: 1,
        first_name: 'Nguyễn',
        last_name: 'Văn An',
        email: 'nguyen.van.an@company.com',
        phone: '0901234567',
        comments: 'Software Developer interested in AWS cloud architecture',
        status: 'active'
    },
    {
        id: 2,
        first_name: 'Trần',
        last_name: 'Thị Bình',
        email: 'tran.thi.binh@startup.vn',
        phone: '0912345678',
        comments: 'DevOps Engineer looking to migrate infrastructure to AWS',
        status: 'active'
    },
    {
        id: 3,
        first_name: 'Lê',
        last_name: 'Minh Cường',
        email: 'le.minh.cuong@tech.com',
        phone: '0923456789',
        comments: 'System Administrator exploring AWS services',
        status: 'active'
    },
    {
        id: 4,
        first_name: 'Phạm',
        last_name: 'Thu Dung',
        email: 'pham.thu.dung@enterprise.vn',
        phone: '0934567890',
        comments: 'IT Manager planning cloud transformation strategy',
        status: 'active'
    },
    {
        id: 5,
        first_name: 'Hoàng',
        last_name: 'Văn Em',
        email: 'hoang.van.em@university.edu.vn',
        phone: '0945678901',
        comments: 'Computer Science student learning cloud computing',
        status: 'active'
    },
    {
        id: 6,
        first_name: 'Vũ',
        last_name: 'Thị Phương',
        email: 'vu.thi.phuong@consulting.com',
        phone: '0956789012',
        comments: 'Cloud Solutions Architect with 3 years experience',
        status: 'active'
    },
    {
        id: 7,
        first_name: 'Đặng',
        last_name: 'Quốc Giang',
        email: 'dang.quoc.giang@fintech.vn',
        phone: '0967890123',
        comments: 'Backend Developer interested in serverless architecture',
        status: 'active'
    },
    {
        id: 8,
        first_name: 'Bùi',
        last_name: 'Thị Hoa',
        email: 'bui.thi.hoa@healthcare.com',
        phone: '0978901234',
        comments: 'Data Engineer exploring AWS data analytics services',
        status: 'active'
    }
];

let nextId = 9;

// View users
exports.view = (req, res) => {
    console.log('Demo mode: Displaying sample users');
    let removeUser = req.query.removed;
    res.render('home', { rows: demoUsers, removeUser });
};

// Find user by search
exports.find = (req, res) => {
    console.log('Demo mode: Searching users');
    let searchTerm = req.body.search.toLowerCase();

    const filteredUsers = demoUsers.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.last_name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    res.render('home', { rows: filteredUsers });
};

// Show add user form
exports.form = (req, res) => {
    res.render('add-user');
};

// Add new user
exports.create = (req, res) => {
    console.log('Demo mode: Adding new user');
    const { first_name, last_name, email, phone, comments } = req.body;

    const newUser = {
        id: nextId++,
        first_name,
        last_name,
        email,
        phone,
        comments: comments || '',
        status: 'active'
    };

    demoUsers.unshift(newUser); // Add to beginning of array
    res.render('add-user', { alert: 'Participant added successfully! (Demo Mode)' });
};

// Edit user form
exports.edit = (req, res) => {
    console.log('Demo mode: Editing participant');
    const userId = parseInt(req.params.id);
    const user = demoUsers.find(u => u.id === userId);

    if (user) {
        res.render('edit-user', { rows: [user] });
    } else {
        res.redirect('/?error=Participant not found');
    }
};

// Update user
exports.update = (req, res) => {
    console.log('Demo mode: Updating participant');
    const userId = parseInt(req.params.id);
    const { first_name, last_name, email, phone, comments } = req.body;

    const userIndex = demoUsers.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        demoUsers[userIndex] = {
            ...demoUsers[userIndex],
            first_name,
            last_name,
            email,
            phone,
            comments: comments || ''
        };

        res.render('edit-user', {
            rows: [demoUsers[userIndex]],
            alert: `${first_name} has been updated! (Demo Mode)`
        });
    } else {
        res.redirect('/?error=Participant not found');
    }
};

// Delete user
exports.delete = (req, res) => {
    console.log('Demo mode: Deleting participant');
    const userId = parseInt(req.params.id);
    const userIndex = demoUsers.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        demoUsers.splice(userIndex, 1);
        let removeUser = encodeURIComponent('Participant successfully removed (Demo Mode)');
        res.redirect('/?removed=' + removeUser);
    } else {
        res.redirect('/?error=Participant not found');
    }
};

// View single user
exports.viewall = (req, res) => {
    console.log('Demo mode: Viewing participant details');
    const userId = parseInt(req.params.id);
    const user = demoUsers.find(u => u.id === userId);

    if (user) {
        res.render('view-user', { rows: [user] });
    } else {
        res.redirect('/?error=Participant not found');
    }
};