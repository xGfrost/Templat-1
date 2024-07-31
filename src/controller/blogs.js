const blogsModel = require('../models/blogs')

const getBlogs = async (req, res) => {
    const {search} = req.query;
    try {
        if (search){
            const rows = await blogsModel.getallsearch(search);
            res.status(200).json({
                message:'Success',
                data: rows
            })

        } else {
            const [data] = await blogsModel.getAll();
            res.status(200).json({
                message:'Success',
                data:data
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[,]
        });
    }
}

const getbyid = async (req, res) => {
    const { id } = req.params;
    const {userId} = req.query;

    // const { userID } = req.body; // Mendapatkan userID dari body request

    try {
        const rows = await blogsModel.getbyid(id);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Mengorganisir data agar komentar dikelompokkan berdasarkan blog
        const blogData = {
            id: rows[0].blogID,
            title: rows[0].title,
            description: rows[0].description,
            image: rows[0].image,
            status: rows[0].status,
            type: rows[0].type,
            video_url: rows[0].video_url,
            comments: []
        };

        rows.forEach(row => {
            if (row.commentID) {
                blogData.comments.push({
                    id: row.commentID,
                    user_id: row.user_id,
                    blog_id: row.blog_id,
                    content: row.content,
                    isMyComment: row.user_id === userId, // Menandai apakah ini komentar pengguna
                    user: {
                        id: row.userID,
                        name: row.name,
                        email: row.email,
                        photo_url: row.photo_url
                    }
                });
            }
        });

        res.json(blogData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const update = async (req, res) => {
    const {id} = req.params;
    const {body, file} = req;
    const image = file.filename;
    try {
        await blogsModel.update(id,body,image);
        body.image = 'http://localhost:4000/assets/' + image;
    } catch (error) {
        
    }
}

module.exports = {
    getbyid,
    update,
    getBlogs,
    
}